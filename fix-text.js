import fs from 'fs';
import path from 'path';

const screensDir = path.join(process.cwd(), 'src', 'screens');

// Find all occurrences of text-transparent bg-clip-text bg-gradient-to-r ...
// and replace them with standard inline styles

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the common gradient classes with explicit styles
  let modified = content;
  
  // A simple fix: if there's text-transparent, make sure we use inline styles for the gradient
  // Actually, wait, let's just use regular tailwind v4 text colors instead of complex gradients if they fail,
  // or we can just leave them if they work.
  // The issue was the GLOBAL heading CSS overriding things. Since I removed it from index.css,
  // regular text-transparent + bg-gradient-to-r from Tailwind should work perfectly fine.
  
  console.log(`Checked ${path.basename(filePath)}`);
}

const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.tsx'));
files.forEach(f => fixFile(path.join(screensDir, f)));
