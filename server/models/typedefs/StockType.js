const { gql } = require("apollo-server");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { Stock } = require("../Stock");
const stock = require("@ahang/stock");
const { saveStock, process } = require("./worker");

const typeDefs = gql`
  type Stock {
    tikr: String!
    name: String!
    exchange: String!
    sector: String!
    marketCap: Float!
    income: Float!
    sales: Float!
    employees: Float!
    price: Float!
    change: Float!
    changePrice: Float!
    volume: Float!
    analyst: JSONObject!
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
  scalar JSONObject
`;

const getStockData = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies");
  const content = await page.content();

  const $ = cheerio.load(content);

  const lists = $("#constituents > tbody > tr");

  for (var chunk = 0; chunk < parseInt(lists.length / 5 + 1); chunk++) {
    let arrayOfPromises = [];
    for (var temp = chunk * 5; temp < chunk * 5 + 5; temp++) {
      if (temp > lists.length - 1) break;

      if (temp == 0) {
        const vixData = await stock.getHistoricalData("%5EVIX");
        const snpData = await stock.getHistoricalData("^GSPC");

        await Stock.create({
          tikr: "VIX",
          marketData: vixData,
        });

        await Stock.create({
          tikr: "S&P500",
          marketData: snpData,
        });
      } else {
        const tikr = $(lists[temp])
          .find("td > a.external.text")
          .text()
          .replace(".", "-")
          .replace("reports", "");

        console.log(`${temp}번째 데이터 ${tikr} 드가자~`);

        arrayOfPromises.push(saveStock(tikr));

        if (temp % 5 == 4) await process(arrayOfPromises);
      }
    }
    console.log("===========================================");
  }
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

      return await Stock.find({ tikr: { $nin: [ "S&P500", "VIX" ] } })
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
        sum += vix[prop]["close"];
      }

      return Math.round((vix[0]["close"] / ((sum / vix.length) * 2)) * 100);
    },
    stockData: async (parent, args, context, info) => {
      return await Stock.findOne({ tikr: args.tikr });
    },
  },
  Mutation: {
    getStockData: () => getStockData(),
  },
};

module.exports = { typeDefs, resolvers };
