import fs from 'fs/promises';
import path from 'path';

const SCREENS_FILE = 'C:/Users/tamba/.gemini/antigravity-ide/brain/3feec80d-6b3f-420c-806a-2e0ed4f880ef/.system_generated/steps/18/output.txt';
const OUTPUT_DIR = './src/stitch-refs';

async function fetchScreens() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const content = await fs.readFile(SCREENS_FILE, 'utf-8');
  let jsonStr = content.trim();
  // Strip "Created At..." header if present
  if (jsonStr.startsWith('Created At:')) {
    const lines = jsonStr.split('\n');
    let startIdx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('{')) {
        startIdx = i;
        break;
      }
    }
    jsonStr = lines.slice(startIdx).join('\n');
  }

  const data = JSON.parse(jsonStr);

  for (const screen of data.screens) {
    if (screen.htmlCode && screen.htmlCode.downloadUrl && screen.htmlCode.mimeType === 'text/html') {
      console.log(`Downloading: ${screen.title}`);
      try {
        const response = await fetch(screen.htmlCode.downloadUrl);
        const html = await response.text();
        const safeTitle = screen.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        await fs.writeFile(path.join(OUTPUT_DIR, `${safeTitle}.html`), html);
        console.log(`Saved ${safeTitle}.html`);
      } catch (e) {
        console.error(`Failed to download ${screen.title}:`, e);
      }
    }
  }
}

fetchScreens().catch(console.error);
