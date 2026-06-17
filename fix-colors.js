import fs from 'fs';
import path from 'path';

const replacements = {
  'B79DFF': '9D4EDD', // Electric Purple
  'FFB7D5': 'FF0A54', // Hot Pink
  '9ED8FF': '00F5D4', // Neon Cyan
  'FFD98A': 'FFB703', // Vibrant Gold
  '0F172A': '0B001A', // Rich Dark Violet
  '0A0E1A': '05000D', // Darker Violet
  '050811': '000000', // Black
  
  // Lowercase variants just in case
  'b79dff': '9D4EDD',
  'ffb7d5': 'FF0A54',
  '9ed8ff': '00F5D4',
  'ffd98a': 'FFB703',
  '0f172a': '0B001A',
  '0a0e1a': '05000D',
  '050811': '000000',
};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walkDir(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css')) {
      let content = fs.readFileSync(p, 'utf8');
      let original = content;
      
      for (const [oldHex, newHex] of Object.entries(replacements)) {
        const regex = new RegExp(oldHex, 'gi');
        content = content.replace(regex, newHex);
      }
      
      if (content !== original) {
        fs.writeFileSync(p, content);
        console.log('Fixed colors in', p);
      }
    }
  });
}

walkDir('./src');
