const axios = require("axios")
const config = require("./config.json")
const { createHmac } = require("crypto")

const api = axios.create({
  baseURL: "https://ftx.com",
})


api.interceptors.request.use(function (req) {
  const ts = Date.now()
  const body = `${ts}${req.method.toUpperCase()}${req.url}${req.data? JSON.stringify(req.data): ""}`
  const hmac = createHmac("sha256", config.api_secret)
  hmac.update(body)
  req.headers["FTX-KEY"] = config.api_key
  req.headers["FTX-TS"] = String(ts)
  req.headers["FTX-SIGN"] = hmac.digest("hex")
  return req
}, function (err) {
  return Promise.reject(err)
})

async function balances() {
  const res = await api.get("/api/wallet/balances")
  return res.data.result
}

async function placeOrder(market, amount) {
  const price = await getPrice(market)
  const size = amount / price
  const res = await api.post("/api/orders", {
    market,
    side: 'buy',
    price: null,
    type: 'market', 
    size,
  })
  return res.data.result.id
}

async function getOrder(id) {
  const res = await api.get(`/api/orders/${id}`)
  return res.data.result
}

async function getPrice(market) {
  const res = await api.get(`/api/markets/${market}`)
  return res.data.result.last
}

module.exports = {
  getOrder,
  placeOrder,
  balances,
}
