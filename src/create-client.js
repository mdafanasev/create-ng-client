const path = require('path');
const process = require('process');
const fs = require('fs');
const { processTemplate } = require('./process-template');
const { generateCode } = require('./generate-code');
const { build } = require('./build');

function createClient(options) {
  const workDir = process.cwd();
  const tmpDir = path.join(workDir, 'tmp');
  fs.mkdirSync(tmpDir);
  const templatePath = path.join(__dirname, '..', 'template');
  processTemplate(templatePath, tmpDir, {
    version: options.version,
    name: options.name,
  });
  const specPath = path.join(workDir, options.specPath);
  const generatorTargetPath = path.join(tmpDir, 'api', 'src', 'lib');
  console.log('SPEC:', specPath);
  generateCode(generatorTargetPath, specPath);
  build(tmpDir);
  const distPath = path.join(tmpDir, 'dist');
  fs.cpSync(distPath, workDir, { recursive: true });
  fs.rmdirSync(tmpDir, { recursive: true });
}

module.exports = { createClient };
