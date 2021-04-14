const finvizor = require("finvizor");
const stock = require("@ahang/stock");
const { Stock } = require("../Stock");

const process = async (arrayOfPromises) => {
    await Promise.all(arrayOfPromises);
}

const saveStock = async (tikr) => {
  const searchStock = await finvizor.stock(tikr);
  const marketData = await stock.getHistoricalData(tikr);
  const earning = await stock.getEarningData(tikr);
  const revenue = await stock.getRevenueData(tikr);
  const priceTarget = await stock.getPriceTargetData(tikr);

  console.log(marketData.length);

  await Stock.create({
    tikr: searchStock.ticker,
    name: searchStock.name,
    exchange: searchStock.exchange,
    sector: searchStock.sector,
    marketCap: searchStock.marketCap,
    income: searchStock.income,
    sales: searchStock.sales,
    employees: searchStock.employees,
    price: searchStock.price,
    change: searchStock.change === null ? 0 : searchStock.change,
    changePrice: (searchStock.price - searchStock.prevClose).toFixed(4),
    volume: searchStock.volume,
    analyst: {
      earning: earning,
      revenue: revenue,
      priceTarget: priceTarget,
    },
    marketData: marketData,
  })
};

module.exports = { saveStock, process }
