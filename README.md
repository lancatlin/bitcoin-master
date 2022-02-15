# Bitcoin Master

> Buy $10 Bitcoin a day, you can master the game

CLI Crypto Systematic Investment Tool

## Install

```
git clone https://github.com/lancatlin/bitcoin-master.git
cd bitcoin-master
yarn install
# npm install
```

## Config

Currently only support [FTX](https://ftx.com) because its app sucks.

```
{
  "api_key": "YOUR API KEY HERE",
  "api_secret": "YOUR API SECRET HERE",
  "orders": [
    {
      "market": "BTC/USD",
      "amount": 10
    },
    {
      "market": "ETH/USD",
      "amount": 10
    }
  ]
}
```

## Execute

```
node index.js
```

## Put it to crontab (Linux only)

```
0 8 * * * cd /dir/to/bitcoin-master && node index.js 1>> output.log 2>> error.log
```

