const { argv } = require('process');

function argvOption(key, required = true) {
  const value = getArgvValue(key);
  if (required && !value) {
    throw new Error(`Required option '${key}' not specified`);
  }
  return value;
}

function getArgvValue(key) {
  const keyIndex = argv.indexOf(key);
  if (keyIndex === -1) return null;
  const value = argv[keyIndex + 1];
  if (!value || value.startsWith('-')) return null;
  return value;
}

module.exports = { argvOption };
