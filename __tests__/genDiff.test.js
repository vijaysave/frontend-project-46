import genDiff from './gendiff.js';  
import { parseJsonFile } from './parser.js';  

const file1 = {  
  common: {  
    setting1: 'Value 1',  
    setting2: 200,  
    setting3: true,  
    setting6: {  
      key: 'value',  
      doge: {  
        wow: '',  
      },  
    },  
  },  
  group1: {  
    baz: 'bas',  
    foo: 'bar',  
    nest: {  
      key: 'value',  
    },  
  },  
  group2: {  
    abc: 12345,  
    deep: {  
      id: 45,  
    },  
  },  
};  

const file2 = {  
  common: {  
    follow: false,  
    setting1: 'Value 1',  
    setting3: null,  
    setting4: 'blah blah',  
    setting5: {  
      key5: 'value5',  
    },  
    setting6: {  
      key: 'value',  
      ops: 'vops',  
      doge: {  
        wow: 'so much',  
      },  
    },  
  },  
  group1: {  
    foo: 'bar',  
    baz: 'bars',  
    nest: 'str',  
  },  
  group3: {  
    deep: {  
      id: {  
        number: 45,  
      },  
    },  
    fee: 100500,  
  },  
};  

test('Generate diff between two nested structures', () => {  
  const expectedDiff = `{  
    common: {  
      + follow: false  
        setting1: Value 1  
      - setting2: 200  
      - setting3: true  
      + setting3: null  
      + setting4: blah blah  
      + setting5: {  
            key5: value5  
        }  
        setting6: {  
            key: value  
          + ops: vops  
            doge: {  
              - wow:   
              + wow: so much  
            }  
        }  
    }  
    group1: {  
      - baz: bas  
      + baz: bars  
        foo: bar  
      - nest: {  
            key: value  
        }  
      + nest: str  
    }  
    - group2: {  
        abc: 12345  
        deep: {  
            id: 45  
        }  
    }  
    + group3: {  
        deep: {  
            id: {  
                number: 45  
            }  
        }  
        fee: 100500  
    }  
}`; // это форматированное значение  

  expect(genDiff(file1, file2)).toEqual(expectedDiff);  
});