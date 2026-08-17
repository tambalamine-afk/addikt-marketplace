import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else results.push(file);
  });
  return results;
}

const files = walk('./src/components').filter(f => f.endsWith('.jsx'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.trim().startsWith('"use client"')) {
    fs.writeFileSync(f, '"use client";\n' + content);
    console.log('Added use client to', f);
  }
});
