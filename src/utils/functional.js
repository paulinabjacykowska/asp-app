export const pipe = (...functions) => object => {
  return functions.reduce((curValue, curFunc) => {
    return curFunc(curValue);
  }, object);
};
