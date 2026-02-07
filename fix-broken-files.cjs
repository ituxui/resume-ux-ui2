#!/usr/bin/env node
/**
 * repair-missing-first-char.js
 *
 * Usage:
 *   node repair-missing-first-char.js            # dry-run, will only report
 *   node repair-missing-first-char.js --apply    # apply fixes in-place (makes .bak backups)
 *   node repair-missing-first-char.js --paths src public
 *
 * Make a git commit / backup before running if you care about safety.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const commonStarts = [
  'import',
  'export',
  'function',
  'const ',
  'let ',
  'var ',
  'class ',
  'interface ',
  'type ',
  'enum ',
  'namespace ',
  '<!DOCTYPE',
  '<html',
  '<?xml',
  '{',
  '[',
  '/',
  '*',
  '.',
  '@import',
  '@use',
  '@forward',
  '@mixin',
  '@function',
];

// Normalize candidates: prefer longer slice(1) to disambiguate
const candidates = commonStarts
  .map((s) => ({ full: s, missingVariant: s.slice(1), firstChar: s[0] }))
  .sort((a, b) => b.missingVariant.length - a.missingVariant.length);

const DEFAULT_ROOTS = ['src', 'public', '.vscode'];
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.scss', '.json', '.md', '.html', '.svg', '.txt']);

function collectFiles(roots) {
  const out = [];
  for (const root of roots) {
    const fullRoot = path.resolve(root);
    if (!fs.existsSync(fullRoot)) continue;
    (function walk(dir) {
      for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, name.name);
        if (name.isDirectory()) {
          // skip node_modules, .git, dist, build
          if (['node_modules', '.git', 'dist', 'build'].includes(name.name)) continue;
          walk(full);
        } else if (name.isFile()) {
          const ext = path.extname(name.name).toLowerCase();
          if (EXTS.has(ext)) out.push(full);
        }
      }
    })(fullRoot);
  }
  return out;
}

function firstNonWhitespaceIndex(s) {
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch !== ' ' && ch !== '\t' && ch !== '\r' && ch !== '\n' && ch !== '\f' && ch !== '\v') return i;
  }
  return -1;
}

function findCandidateAt(text, pos) {
  // returns { candidate, reason } or null
  const tail = text.slice(pos);
  if (!tail) return null;

  // Try strict (case-sensitive) matches first, then case-insensitive
  for (const mode of ['strict', 'insensitive']) {
    for (const c of candidates) {
      const mv = c.missingVariant;
      if (mv.length === 0) continue;
      const substr = tail.slice(0, mv.length);
      if (mode === 'strict') {
        if (substr === mv) return { candidate: c, match: mv, mode };
      } else {
        if (substr.toLowerCase() === mv.toLowerCase()) return { candidate: c, match: mv, mode };
      }
    }
  }
  return null;
}

function backupFile(file) {
  const bak = file + '.bak';
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    return bak;
  }
  return null;
}

async function main() {
  const argv = process.argv.slice(2);
  const apply = argv.includes('--apply');
  const pathsArgIndex = argv.indexOf('--paths');
  let roots = DEFAULT_ROOTS.slice();
  if (pathsArgIndex >= 0) {
    const rest = argv.slice(pathsArgIndex + 1);
    if (rest.length) roots = rest;
  } else {
    // also allow passing paths without flag
    const direct = argv.filter((a) => !a.startsWith('--'));
    if (direct.length) {
      // ignore 'apply' if included already filtered out
      roots = direct;
    }
  }

  const files = collectFiles(roots);
  if (files.length === 0) {
    console.log('No files found in roots:', roots.join(', '));
    return;
  }

  let fixedCount = 0;
  const candidatesFound = [];

  for (const file of files) {
    try {
      const raw = fs.readFileSync(file);
      // read as utf8 ignoring BOM (if present)
      let text = raw.toString('utf8');
      // If file starts with replacement char � it may indicate wrong decoding; but we proceed.
      const pos = firstNonWhitespaceIndex(text);
      if (pos === -1) continue;

      // If already looks correct (starts with any candidate full), skip
      const tail = text.slice(pos);
      let alreadyOk = false;
      for (const c of commonStarts) {
        if (tail.startsWith(c) || tail.toLowerCase().startsWith(c.toLowerCase())) {
          alreadyOk = true;
          break;
        }
      }
      if (alreadyOk) continue;

      // Try to detect missing-first-char pattern
      const found = findCandidateAt(text, pos);
      if (!found) continue;

      const { candidate } = found;
      const insertChar = candidate.firstChar;
      const repaired = text.slice(0, pos) + insertChar + text.slice(pos);

      // Validate: after insertion, tail should now start with candidate.full
      const newTail = repaired.slice(pos);
      if (!newTail.startsWith(candidate.full) && !newTail.toLowerCase().startsWith(candidate.full.toLowerCase())) {
        // If still not matching, skip
        continue;
      }

      // Report
      console.log(`${apply ? 'Fixing' : 'Would fix'}: ${file}`);
      console.log(`  Detected missing first character for "${candidate.full}" (inserting "${insertChar}")`);
      // show small diff preview
      const previewBefore = text.slice(pos, pos + 60).replace(/\n/g, '\\n');
      const previewAfter = repaired.slice(pos, pos + 60).replace(/\n/g, '\\n');
      console.log(`  Before: ${previewBefore}`);
      console.log(`  After : ${previewAfter}`);

      if (apply) {
        const bak = backupFile(file);
        if (bak) console.log(`  Backup created: ${bak}`);
        fs.writeFileSync(file, repaired, { encoding: 'utf8' });
        fixedCount++;
      } else {
        candidatesFound.push({ file, candidate: candidate.full, insertChar });
      }
    } catch (err) {
      console.warn('Error processing file:', file, err && err.message ? err.message : err);
    }
  }

  if (!apply) {
    console.log('');
    console.log(`Dry run complete. Files that would be changed: ${candidatesFound.length}`);
    for (const item of candidatesFound) {
      console.log(`  ${item.file}  -> insert "${item.insertChar}" for "${item.candidate}"`);
    }
    console.log('Run with "--apply" to make fixes (script will create .bak files).');
  } else {
    console.log(`\nApplied fixes: ${fixedCount}`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
