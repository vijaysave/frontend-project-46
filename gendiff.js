#!/usr/bin/env node

import { program } from 'commander';
import parseJsonFile from './parser.js';

/**  
 *
 * @param {Object} data1
 * @param {Object} data2
 * @returns {string}
 */
const genDiff = (data1, data2) => {  
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();
  const result = keys.map((key) => {  
    if (!(key in data1)) {  
      return `  + ${key}: ${data2[key]}`;
    }
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return null;
  }).filter(Boolean);

  return `{\n${result.join('\n')}\n}`;
};

program
  .description('Compares two configuration files (file1 and file2) and shows a difference.')
  .version('1.0.0')
  .argument('<file1>', 'path to the first configuration file')
  .argument('<file2>', 'path to the second configuration file')
  .option('-f, --format <type>', 'output format');

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

const file1 = program.args[0];
const file2 = program.args[1];
const format = program.opts().format || 'default';

const data1 = parseJsonFile(file1);
const data2 = parseJsonFile(file2);

console.log(`Comparing files: ${file1} and ${file2}`);
console.log(`Output format: ${format}`);
const diff = genDiff(data1, data2);
console.log(diff);
