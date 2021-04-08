const { gql } = require("apollo-server");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const finvizor = require("finvizor");
const { Stock } = require("../Stock");
const stock = require('@ahang/stock')

const typeDefs = gql`
  type Stock {
    tikr: String!
    name: String!
    exchange: String!
    sector: String!
    price: Float!
    change: Float!
    changePrice: Float!
    volume: Float!
    marketData: [MarketData]
  }
  type MarketData {
    date: Date!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    adjClose: Float!
    volume: Float!
    symbol: String!
  }
  scalar Date
`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getStockData = async () => {

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies");
  const content = await page.content();

  const $ = cheerio.load(content);

  const lists = $("#constituents > tbody > tr");

  await Promise.all(
    lists.map(async (index, list) => {
      const tikr = $(list)
        .find("td > a.external.text")
        .text()
        .replace(".", "-")
        .replace("reports", "");

      if (index > 0) {
        let searchStock = await finvizor.stock(tikr);

        const marketData = await stock.getHistoricalData(tikr)
        const earning = await stock.getEarningData(tikr)
        const revenue = await stock.getRevenueData(tikr)
        const priceTarget = await stock.getPriceTargetData(tikr)

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
        });

        console.log(`${index}번째 데이터 완료~`)
      }

      else if (index == 0) {

      //  %5EVIX: 공포지수, ^GSPC: S&P500
        const vixData = await stock.getHistoricalData('%5EVIX')
        const snpData = await stock.getHistoricalData('^GSPC')

        await Stock.create({
          tikr: "VIX",
          marketData: vixData,
        });

        await Stock.create({
          tikr: "S&P500",
          marketData: snpData,
        });

        console.log(`${index}번째 데이터 완료~`)
      }
    })
  );

  browser.close();

  return true;
};

const resolvers = {
  Query: {
    searchStock: async (parent, args, context, info) => {
      var type = {};

      switch (args.type) {
        case "vol":
          type = {
            volume: -1,
          };
          break;
        case "up":
          type = {
            change: -1,
          };
          break;
        case "down":
          type = {
            change: 1,
          };
          break;
        case "high":
          type = {
            price: -1,
          };
          break;
        case "low":
          type = {
            price: 1,
          };
          break;
      }

      return await Stock.find({ tikr: { $ne: "S&P500" } })
        .sort(type)
        .limit(20);
    },
    marketData: async (parent, args, context, info) => {
      return await Stock.findOne({ tikr: args.tikr }, { marketData: true });
    },
    vixData: async () => {
      const temp = await Stock.findOne({ tikr: "VIX" }, { marketData: true });
      const vix = temp.marketData;

      var sum = 0;
      for (var prop in vix) {
        sum += vix[prop]["close"]
      }
      
      return Math.round(vix[0]["close"] / ( sum / vix.length * 2)  * 100)
    },
    stockData: async (parent, args, context, info) => {
      return await Stock.findOne({tikr: args.tikr});
    }
  },
  Mutation: {
    getStockData: () => getStockData(),
  },
};

module.exports = { typeDefs, resolvers };
