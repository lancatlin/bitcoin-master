const { placeOrder, getOrder } = require("./ftx")
const config = require("./config.json")

async function main() {
  const ids = []
  for (const { market, amount } of config.orders) {
    console.log(market, amount)
    const orderId = await placeOrder(market, amount)
    ids.push(orderId)
  }
  for (const id of ids) {
    const result = await getOrder(id)
    console.log(result)
  }
}

main()