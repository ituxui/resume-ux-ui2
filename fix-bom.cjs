const fs = require('fs');
const path = require('path');

function cleanBOM(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules') cleanBOM(fullPath);
    } else {
      if (fullPath.match(/\.(scss|tsx|ts|js|css)$/)) {
        const buffer = fs.readFileSync(fullPath);
        if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
          fs.writeFileSync(fullPath, buffer.subarray(3));
          console.log('Fixed:', fullPath);
        }
      }
    }
  });
}

cleanBOM('./');
