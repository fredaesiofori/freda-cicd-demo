const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'content/data.json'), 'utf8'));
let template = fs.readFileSync(path.join(__dirname, 'templates/template.html'), 'utf8');

for (const key in data) {
  const placeholder = new RegExp(`{{${key}}}`, 'g');
  template = template.replace(placeholder, data[key]);
}

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

fs.writeFileSync(path.join(__dirname, 'dist/index.html'), template);
console.log('Build complete: dist/index.html generated.');