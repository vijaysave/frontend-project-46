import plain from './plain';

const formatters = {
  plain,

};

const getFormatter = (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Formatter ${formatName} not found`);
  }
  return formatter;
};

export default getFormatter;
