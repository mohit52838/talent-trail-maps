const fs = require('fs');
const path = require('path');
const indexPath = path.resolve(__dirname, '..', 'dist', 'index.html');

try {
  let html = fs.readFileSync(indexPath, 'utf8');
  const before = html;
  // Remove crossorigin attributes from script and link tags
  html = html.replace(/\s+crossorigin(=("[^"]*"|'[^']*'|\w+))?/gi, '');

  if (html !== before) {
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('Removed crossorigin attributes from dist/index.html');
  } else {
    console.log('No crossorigin attributes found in dist/index.html');
  }
} catch (err) {
  console.error('Could not modify dist/index.html:', err.message);
  process.exitCode = 1;
}
