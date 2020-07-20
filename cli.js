const path = require('path');
const { program } = require('commander');
const { version, description } = require('./package.json');
const genDiff = require('./gendiff');

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

module.exports = cli;
