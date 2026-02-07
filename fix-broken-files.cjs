// remove-bom.js
const fs = require('fs').promises;
const path = require('path');

async function removeBomFromFile(filePath) {
  try {
    const buffer = await fs.readFile(filePath);

    // Проверяем, начинается ли с BOM (EF BB BF)
    if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
      console.log(`BOM найден и будет удалён: ${filePath}`);
      const withoutBom = buffer.slice(3);
      await fs.writeFile(filePath, withoutBom);
    }
    // Если BOM нет — ничего не делаем, файл остаётся как есть
  } catch (err) {
    console.error(`Ошибка при обработке ${filePath}:`, err.message);
  }
}

async function processDirectory(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Рекурсивно заходим в подпапки
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx|mjs|cjs|json|css|scss|sass|md|html|svg|txt)$/.test(entry.name)) {
      await removeBomFromFile(fullPath);
    }
  }
}

(async () => {
  const targetDir = process.argv[2] || '.';

  console.log(`Обрабатываем папку: ${path.resolve(targetDir)}\n`);

  await processDirectory(targetDir);

  console.log('\nГотово. BOM удалён там, где он был.');
})().catch((err) => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});
