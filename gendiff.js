const { program } = require('commander');
const { version, description } = require('./package.json');

const gendiff = () => {
  program.version(version).description(description).arguments('<filepath1>  <filepath2>');
  program.option('-f, --format [type]', 'output format');

  program.parse(process.argv);
};

module.exports = gendiff;
