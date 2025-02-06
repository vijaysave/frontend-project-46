const isObject = (value) => value && typeof value === 'object';

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (diff) => {
  const iter = (currentDiff, path = '') => {
    return currentDiff.flatMap((node) => {
      const { key, type, value, oldValue } = node;
      const fullPath = path ? `${path}.${key}` : key;

      switch (type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'updated':
          return `Property '${fullPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(value)}`;
        case 'nested':
          return iter(value, fullPath);
        default:
          return [];
      }
    }).join('\n');
  };

  return iter(diff);
};

export default plain;
