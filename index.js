const fetch = require('node-fetch');
const fs = require('fs-extra');
const coinspath = `${__dirname}/coins.json`;
let coins, coinsRev;
async function checkAndUpdate () {
  if (coins || coinsRev) {
    return;
  }
  const exists = await fs.pathExists(coinspath);
  if (!exists) {
    const coinlist = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0');
    let coinlistjson = await coinlist.json();
    const coinlistobj = {};
    for (let u = 0, len = coinlistjson.length; u < len; u++) {
      coinlistobj[coinlistjson[u].symbol] = coinlistjson[u].name;
    }
    await fs.outputJson(coinspath, coinlistobj, { spaces: 1 });
  }
  coins = require(coinspath);
  coinsRev = Object.assign({}, ...Object.entries(coins).map(([a, b]) => ({
    [b.toLowerCase()]: a
  })));
}

function getName (symbol, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
  }
  symbol = symbol.toUpperCase();
  if (typeof cb === 'function') {
    checkAndUpdate().then(() => {
      cb(null, opts === 'lower' ? coins[symbol].toLowerCase() : coins[symbol]);
    }).catch(err => {
      cb(err, null);
    });
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        await checkAndUpdate();
        resolve(opts === 'lower' ? coins[symbol].toLowerCase() : coins[symbol]);
      } catch (err) {
        reject(err);
      }
    });
  }
}

function getSymbol (name, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
  }
  name = name.toLowerCase();
  if (typeof cb === 'function') {
    checkAndUpdate().then(() => {
      cb(null, opts === 'lower' ? coinsRev[name].toLowerCase() : coinsRev[name]);
    }).catch(err => {
      cb(err, null);
    });
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        await checkAndUpdate();
        resolve(opts === 'lower' ? coinsRev[name].toLowerCase() : coinsRev[name]);
      } catch (err) {
        reject(err);
      }
    });
  }
}

getSymbol('bitcoin', 'lower').then(res => {
  console.log(res);
});
