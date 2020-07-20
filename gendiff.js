const { program } = require('commander');
const { version, description } = require('./package.json');

const gendiff = () => {
  program.version(version);
  program.description(description);

  program.parse(process.argv);
};

module.exports = gendiff;
