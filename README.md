# coinnames
Simple module to return a crypto-currency's name from symbol or vice-versa. 

On initial run (will only happen once), this module will request coinmarketcap.com for the list of coins, and stores it 
using `coins.json` filename on the same directory as this module is installed.

### API
**options**
-optional, accepts the value `lower`, default: `undefined`

**getName(symbol,opts,callback)**
-gets the coin name from the specified `symbol`
-calls the callback function with `callback(error,result)`

**getName(symbol,opts) -> [Promise]**
-gets the coin name from the specified `symbol`
-returns a `Promise`

**getSymbol(name,opts,callback)**
-gets the coin symbol from the specified `name`
-calls the callback function with `callback(error,result)`

**getSymbol(name,opts) -> [Promise]**
-gets the coin symbol from the specified `name`
-returns a `Promise`

### Usage

Asyncronous using callback

```javascript
getName('BTC',function(err,result){
    console.log(result) // Bitcoin
})

getName('LTC','lower',function(err,result){
    console.log(result) // litecoin
})

getSymbol('Litecoin',function(err,result){
    console.log(result) // LTC
})

getSymbol('Bitcoin', 'lower',function(err,result){
    console.log(result) // btc
})

// using Promise
getName('BTC').then(function(result){
    console.log(result) // Bitcoin
})
getSymbol('Bitcoin', 'lower').then(function(result){
    console.log(result) // btc
})

// using async/await
(async function(){
    var res = await getName('BCH')
    console.log(res) // Bitcoin Cash
    console.log(await getSymbol('Bitcoin Cash')) // BCH
})()


```