const { placeOrder, getOrder } = require("./ftx")
const config = require("./config.json")

async function main() {
  const ids = []
  for (const { market, amount } of config.orders) {
    const orderId = await placeOrder(market, amount)
    ids.push(orderId)
  }
  for (const id of ids) {
    const {market, avgFillPrice, createdAt, size} = await getOrder(id)
    console.log(`${market} ${createdAt}: ${avgFillPrice} ${size} $${avgFillPrice * size}`)
  }
}

main()
