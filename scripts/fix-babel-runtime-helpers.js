const fs = require('fs');
const path = require('path');

const helpersDir = path.resolve(
  __dirname,
  '..',
  'node_modules',
  '@babel',
  'runtime',
  'helpers',
  'esm'
);

const targets = [
  'interopRequireWildcard.js',
  'possibleConstructorReturn.js',
  'wrapRegExp.js',
  'toPropertyKey.js',
  'toPrimitive.js'
];

const search = '../../helpers/esm/typeof';
const replacement = `${search}.js`;

targets.forEach((fileName) => {
  const filePath = path.join(helpersDir, fileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');

  if (!original.includes(search) || original.includes(replacement)) {
    return;
  }

  const updated = original.split(search).join(replacement);
  fs.writeFileSync(filePath, updated);
  console.log(`Patched ${fileName} to use explicit .js extension.`);
});
