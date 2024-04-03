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
      try {
        // Parse the input JSON string
        const dictionary = JSON.parse(argv.json);
        // Encode the dictionary and format the output as a JSON string
        const encoded = UrlsafeCodec.encode(dictionary);
        console.log(encoded);
      } catch (error) {
        console.error('Invalid JSON string. Please ensure it is properly formatted with keys and values in double quotes.');
      }
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
      try {
        // Decode the string
        const decoded = UrlsafeCodec.decode(argv.string);
        // Format the output as a JSON string with keys and values in double quotes
        console.log(JSON.stringify(decoded));
      } catch (error) {
        console.error('Invalid encoded string. Please ensure it is a valid encoded JSON string.');
      }
    } else {
      console.error('Encoded string is required');
    }
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv;
