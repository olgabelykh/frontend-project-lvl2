import path from 'path';
import { createRequire } from 'module';
import program from 'commander';

import genDiff from './gendiff.js';

const require = createRequire(import.meta.url);
const { version, description } = require('./package.json');

const cli = () => {
  program
    .version(version)
    .description(description)
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1>  <filepath2>')
    .action((filepath1, filepath2) => {
      const resolvedFilePath1 = path.resolve(filepath1);
      const resolvedFilePath2 = path.resolve(filepath2);
      const diff = genDiff(resolvedFilePath1, resolvedFilePath2);
      console.log(diff);
    });

  program.parse(process.argv);
};

export default cli;
