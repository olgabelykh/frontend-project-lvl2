import path from 'path';
import { createRequire } from 'module';
import program from 'commander';

import genDiff from '../index.js';

const require = createRequire(import.meta.url);
const { version, description } = require('../package.json');

export default () => {
  program
    .version(version)
    .description(description)
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1>  <filepath2>')
    .action((filepath1, filepath2, { format }) => {
      const resolvedFilepath1 = path.resolve(filepath1);
      const resolvedFilepath2 = path.resolve(filepath2);
      const diff = genDiff(resolvedFilepath1, resolvedFilepath2, format);
      console.log(diff);
    });

  program.parse(process.argv);
};
