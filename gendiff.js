#!/usr/bin/env node  

import { program } from 'commander';  
import { parseJsonFile, parseYamlFile } from './parser.js';  
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

const genDiff = (data1, data2) => {  
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();  
  const result = keys.map((key) => {  
    if (!(key in data1)) {  
      return { key, type: 'added', value: data2[key] };  
    }  
    if (!(key in data2)) {  
      return { key, type: 'removed', value: data1[key] };  
    }  
    if (data1[key] !== data2[key]) {  
      if (typeof data1[key] === 'object' && data1[key] !== null && typeof data2[key] === 'object' && data2[key] !== null) {  
        return { key, type: 'nested', value: genDiff(data1[key], data2[key]) }; // рекурсивный вызов  
      }  
      return {  
        key,  
        type: 'updated',  
        oldValue: data1[key],  
        value: data2[key],  
      };  
    }  
    return { key, type: 'unchanged', value: data1[key] };  
  });  

  return result;  
};  

const run = () => {  
  program  
    .description('Compares two configuration files and shows a difference.')  
    .version('1.0.0')  
    .argument('<filepath1>', 'path to the first configuration file')  
    .argument('<filepath2>', 'path to the second configuration file')  
    .option('-f, --format <type>', 'output format', 'stylish');  

  program.parse(process.argv);  

  const file1 = program.args[0];  
  const file2 = program.args[1];  
  const format = program.opts().format;  

  let data1, data2;  
  try {  
    data1 = file1.endsWith('.json') ? parseJsonFile(file1) : parseYamlFile(file1);  
    data2 = file2.endsWith('.json') ? parseJsonFile(file2) : parseYamlFile(file2);  
  } catch (error) {  
    console.error(`Error reading files: ${error.message}`);  
    process.exit(1);  
  }  

  console.log(`Comparing files: ${file1} and ${file2}`);  
  console.log(`Output format: ${format}`);  
  
  const diff = genDiff(data1, data2);  
  let formattedDiff;  

  switch (format) {  
    case 'stylish':  
      formattedDiff = formatStylish(diff);  
      break;  
    case 'plain':  
      formattedDiff = formatPlain(diff);  
      break;  
    case 'json':  
      formattedDiff = JSON.stringify(diff, null, 2);  
      break;  
    default:  
      console.error(`Unknown format: ${format}`);  
      process.exit(1);  
  }  

  console.log(formattedDiff);  
};  

if (process.argv[1] === new URL(import.meta.url).pathname) {  
  run();  
}  

export default genDiff;  
export { parseJsonFile, parseYamlFile };