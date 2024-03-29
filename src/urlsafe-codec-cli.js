#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const UrlsafeCodec = require('./urlsafe-codec'); // Assuming UrlsafeCodec is exported with default export

yargs(hideBin(process.argv))
  .command('encode [json]', 'Encode a JSON string', (yargs) => {
    return yargs.positional('json', {
      describe: 'JSON string to encode',
      type: 'string'
    });
  }, (argv) => {
    if (argv.json) {
      const dictionary = JSON.parse(argv.json);
      console.log(UrlsafeCodec.encode(dictionary));
    } else {
      console.error('JSON string is required');
    }
  })
  .command('decode [string]', 'Decode an encoded string', (yargs) => {
    return yargs.positional('string', {
      describe: 'Encoded string to decode',
      type: 'string'
    });
  }, (argv) => {
    if (argv.string) {
      console.log(UrlsafeCodec.decode(argv.string));
    } else {
      console.error('Encoded string is required');
    }
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv;
