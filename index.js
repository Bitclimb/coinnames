const coinspath = `${__dirname}/coins.json`;
const coins = require(coinspath);
const coinsRev = Object.assign({}, ...Object.entries(coins).map(([a, b]) => ({
  [b.toLowerCase()]: a
})));

function getName (symbol, opts) {
  symbol = symbol.toUpperCase();
  return opts === 'lower' ? coins[symbol].toLowerCase() : coins[symbol];
}

function getSymbol (name, opts) {
  name = name.toLowerCase();
  opts === 'lower' ? coinsRev[name].toLowerCase() : coinsRev[name];
}

module.exports = { getName, getSymbol, checkAndUpdate: require('./update') };
