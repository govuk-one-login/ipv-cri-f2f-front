module.exports = function convertKeysToLowerCase(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToLowerCase(item));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = convertKeysToLowerCase(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }

