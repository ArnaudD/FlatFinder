module.exports = yargs => {
  yargs.option('d', {
    alias: 'debug',
    default: false,
    describe: 'Add more console logs and output results in separate files for each source',
    type: 'boolean',
  });

  yargs.option('o', {
    alias: 'output-dir',
    describe: 'directory where temporary files and logs should be created',
    default: './tmp',
    normalize: true,
    coerce: value => (/^(\/|~)/.test(value) ? value : `${process.cwd()}/${value}`),
    type: 'string',
  });
};
