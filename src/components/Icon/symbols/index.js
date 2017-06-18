const context = require.context('.', false, /\.svg$/);

export default context.keys().reduce(
  (result, symbol) => {
    const symbolName = (/\.\/(.*)\.svg$/).exec(symbol)[1];

    result[symbolName] = `#${symbolName}`;
    return result;
  },
  {},
);
