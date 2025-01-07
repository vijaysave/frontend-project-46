#!/usr/bin/env node  

import { program } from 'commander';
import parseJsonFile from './Parser.js';

program  
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the first configuration file')
  .argument('<filepath2>', 'path to the second configuration file')
  .option('-f, --format <type>', 'output format');

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

const filepath1 = program.args[0];
const filepath2 = program.args[1];
const format = program.opts().format || 'default';

const data1 = parseJsonFile(filepath1);
const data2 = parseJsonFile(filepath2);

console.log(`Comparing files: ${filepath1} and ${filepath2}`);
console.log(`Output format: ${format}`);
console.log('Data from file 1:', JSON.stringify(data1, null, 2));
console.log('Data from file 2:', JSON.stringify(data2, null, 2));
