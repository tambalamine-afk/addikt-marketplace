import fs from 'fs';
import path from 'path';

const srcPages = './src/pages';
const srcViews = './src/views';

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  if (!fs.existsSync(srcViews)) {
    copyRecursiveSync(srcPages, srcViews);
    console.log('Copied successfully');
  }
  fs.rmSync(srcPages, { recursive: true, force: true });
  console.log('Removed old pages successfully');
} catch (err) {
  console.error('Error:', err);
}
