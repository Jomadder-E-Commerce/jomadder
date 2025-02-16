export const convertValuesToLowerCase = (obj = {}) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = typeof obj[key] === 'string' ? obj[key] : obj[key];
    return acc;
  }, {});
};
export const convertValues = (value) => {
  const convert = value
    .split(' ')
    // .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  return convert;
};
