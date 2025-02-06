import fs from 'fs';  
import path from 'path';  
import yaml from 'js-yaml';  

const parseJsonFile = (filepath) => {  
  try {  
    const absolutePath = path.resolve(process.cwd(), filepath);  
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');  
    return JSON.parse(fileContent);  
  } catch (error) {  
    throw new Error(`Cannot read JSON file at ${filepath}: ${error.message}`);  
  }  
};  

const parseYamlFile = (filepath) => {  
  try {  
    const absolutePath = path.resolve(process.cwd(), filepath);  
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');  
    return yaml.load(fileContent);  
  } catch (error) {  
    throw new Error(`Cannot read YAML file at ${filepath}: ${error.message}`);  
  }  
};  

export { parseJsonFile, parseYamlFile };