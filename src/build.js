const { execSync } = require('child_process');

function build(packageRoot) {
  execSync('npm install', { cwd: packageRoot, stdio: [0, 1, 2] });
  execSync('npm run build', { cwd: packageRoot, stdio: [0, 1, 2] });
}

module.exports = { build };
