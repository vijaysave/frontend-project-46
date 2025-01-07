import fs from 'fs';  
import path from 'path';

/**  
 * Функция для чтения и парсинга JSON-файла.
 * @param {string} filepath - Путь к файлу.
 * @returns {Object} - Парсенные данные из файла.
 */
const parseJsonFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

export default parseJsonFile;
