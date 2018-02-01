# coinnames
Simple module to return a crypto-currency's name from symbol or vice-versa. 

This module uses a predefined lists of coins on the file `coins.json` which where taken from coinmarketcap.com

### API
**options**
-optional, accepts the value `lower`, default: `undefined`

**checkAndUpdate(true)**
-forces a new update of the coin list from coinmarketcap

**getName(symbol,opts)**
-gets the coin name from the specified `symbol`

**getSymbol(name,opts)**
-gets the coin symbol from the specified `name`

### Usage

```javascript
var {getName,getSymbol} = require('coinnames')

var btc = getName('BTC')
console.log(btc) // Bitcoin

var ltc = getName('LTC','lower')
console.log(ltc) // litecoin

var litecoin = getSymbol('Litecoin')
console.log(litecoin) // LTC

var bitcoin = getSymbol('Bitcoin', 'lower')
console.log(bitcoin) // btc
```