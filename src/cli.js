#!/usr/bin/env node

const { argvOption } = require('./argv');
const { createClient } = require('./create-client');

createClient({
  name: argvOption('--package-name'),
  version: argvOption('--package-version'),
  specPath: argvOption('--spec'),
});
