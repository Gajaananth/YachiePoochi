import fs from 'fs';
import path from 'path';
const dir = './src/screens';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  let original = content;
  
  // Find the first main container (assumed to be the first one with h-full)
  content = content.replace(/className=\"([^\"]*)\bh-full\b([^\"]*)\"/, function(match, p1, p2) {
    let classes = (p1 + ' flex-grow ' + p2).replace(/\boverflow-hidden\b/g, '').replace(/\s+/g, ' ').trim();
    return 'className=\"' + classes + '\"';
  });

  if(content !== original) {
    fs.writeFileSync(p, content);
    console.log('Fixed', file);
  }
});
