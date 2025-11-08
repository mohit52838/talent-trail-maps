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

// Write a simple version file so clients can detect new deploys.
try {
  const version = process.env.COMMIT_REF || new Date().toISOString();
  const versionPath = path.resolve(__dirname, '..', 'dist', 'version.json');
  fs.writeFileSync(versionPath, JSON.stringify({ version }), 'utf8');
  console.log('Wrote dist/version.json with version:', version);
} catch (err) {
  console.error('Could not write dist/version.json:', err.message);
}
