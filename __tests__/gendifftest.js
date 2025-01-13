import genDiff from '../gendiff.js';  

test('compare two flat JSON files', () => {
  const data1 = { follow: false, host: 'hexlet.io', timeout: 50 };
  const data2 = { follow: false, host: 'hexlet.io', timeout: 20, verbose: true };

  const expectedOutput = `{  
timeout: 50
timeout: 20

verbose: true
}`;

expect(genDiff(data1, data2)).toEqual(expectedOutput);
});