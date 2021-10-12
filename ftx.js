const axios = require("axios")
const config = require("./config.json")
const { createHmac } = require("crypto")

console.log(config)

const api = axios.create({
  baseURL: "https://ftx.com",
})

const hmac = createHmac("sha256", config.api_secret)

api.interceptors.request.use(function (req) {
  const ts = Date.now()
  const body = `${ts}${req.method.toUpperCase()}${req.url}${req.body? req.body : ""}`
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

balances()
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err.toJSON())
  })