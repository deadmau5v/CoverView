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

if (!fs.existsSync(helpersDir)) {
  console.log('Babel helpers directory not found, skipping patch.');
  return;
}

const files = fs.readdirSync(helpersDir);

files.forEach((fileName) => {
  if (path.extname(fileName) !== '.js') {
    return;
  }

  const filePath = path.join(helpersDir, fileName);
  const originalContent = fs.readFileSync(filePath, 'utf8');

  // Regex to find relative imports (e.g., from './utils') and add the .js extension.
  // It looks for `from` statements with relative paths that do not already have an extension.
  const regex = /(from\s+['"])(\.\.?\/[^"']+?)(?<!\.js)(['"])/g;

  if (!regex.test(originalContent)) {
    return;
  }

  // Reset regex state before using replace
  regex.lastIndex = 0;
  const updatedContent = originalContent.replace(regex, '$1$2.js$3');

  if (originalContent !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Patched ${fileName} to use explicit .js extension.`);
  }
});