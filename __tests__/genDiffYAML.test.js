import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parseYamlFile from '../parsers.js';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', filename);

describe('genDiff for YAML files', () => {
  it('should return correct difference between two flat YAML objects', () => {
    const data1 = parseYamlFile(getFixturePath('file1.yml'));
    const data2 = parseYamlFile(getFixturePath('file2.yml'));

    const expectedDiff = `{
  - follow: false
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    const result = genDiff(data1, data2);
    expect(result).toBe(expectedDiff);
  });
});