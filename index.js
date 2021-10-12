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
  console.log(body)
  hmac.update(body)
  req.headers["FTX-KEY"] = config.api_key
  req.headers["FTX-TS"] = String(ts)
  req.headers["FTX-SIGN"] = hmac.digest("hex")
  console.log(req)
  return req
}, function (err) {
  return Promise.reject(err)
})

async function main() {
  const res = await api.get("/api/account")
  console.dir(res.data)
}

main()
  .catch((err) => {
    console.log(err.toJSON())
  })