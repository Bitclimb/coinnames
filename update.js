const fetch = require('node-fetch');
const fs = require('fs-extra');
async function checkAndUpdate (force = false) {
  const exists = await fs.pathExists(coinspath);
  if (!exists || force === true) {
    const coinlist = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0');
    let coinlistjson = await coinlist.json();
    const coinlistobj = {};
    for (let u = 0, len = coinlistjson.length; u < len; u++) {
      coinlistobj[coinlistjson[u].symbol] = coinlistjson[u].name;
    }
    await fs.outputJson(coinspath, coinlistobj, { spaces: 1 });
  }
}
module.exports = checkAndUpdate;
