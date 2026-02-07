const fs = require('fs').promises;
const path = require('path');

async function findBom(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let found = 0;

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(entry.name)) {
        found += await findBom(full);
      }
    } else if (/\.(ts|tsx|js|jsx|json|css|scss|md|html|svg|yaml|yml)$/.test(entry.name)) {
      const buf = await fs.readFile(full);
      if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
        console.log('BOM найден →', full);
        found++;
      }
    }
  }
  return found;
}

(async () => {
  const total = await findBom(process.argv[2] || '.');
  console.log(total ? `\nНайдено файлов с BOM: ${total}` : '\nBOM нигде не найден. Всё чисто.');
})();
