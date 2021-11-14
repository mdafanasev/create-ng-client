const fs = require('fs');
const path = require('path');

function processTemplate(templateRoot, targetRoot, options) {
  fs.cpSync(templateRoot, targetRoot, { recursive: true });
  const packagePath = path.join(targetRoot, 'api', 'package.json');
  substituteData(packagePath, options);
}

function substituteData(file, data) {
  const content = fs.readFileSync(file, 'utf-8');
  const result = content.replace(/\{%(.+)%\}/gu, (_, key) => data[key.trim()]);
  fs.writeFileSync(file, result);
}

module.exports = { processTemplate };
