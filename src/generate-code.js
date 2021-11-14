const { NgOpenApiGen } = require('ng-openapi-gen/lib/ng-openapi-gen');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const { loopWhile } = require('deasync');

function generateCode(root, specPath) {
  const spec = getSpec(specPath);
  const generator = new NgOpenApiGen(spec, { output: root });
  generator.generate();
}

function getSpec(specPath) {
  const refParser = new $RefParser();
  const timeout = 20000;
  let result = null;
  try {
    refParser
      .bundle(specPath, {
        dereference: { circular: false },
        resolve: { http: { timeout } },
      })
      .then((spec) => (result = spec));
    loopWhile(() => !result);
    return result;
  } catch (err) {
    console.error(`Error on API generation from ${specPath}: ${err}`);
    process.exit(1);
  }
}

module.exports = { generateCode };
