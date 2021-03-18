const { gql } = require("apollo-server");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const finvizor = require("finvizor");
const yahooFinance = require('yahoo-finance');
const { Stock } = require("../Stock");


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

        let searchStock = await finvizor.stock(tikr)

        const marketData = await yahooFinance.historical({
          symbol: tikr,
          from: '2020-03-16',
          to: '2021-03-16'
        })

        await Stock.create({
          tikr: searchStock.ticker,
          name: searchStock.name,
          exchange: searchStock.exchange,
          sector: searchStock.sector,
          price: searchStock.price,
          change: (searchStock.change === null) ? 0 : searchStock.change,
          changePrice: (searchStock.price - searchStock.prevClose).toFixed(4),
          volume: searchStock.volume,
          marketData: marketData
        });
      } else if (index == 0) {

        const marketData = await yahooFinance.historical({
          symbol: "^GSPC",
          from: '2020-03-17',
          to: '2021-03-17'
        })

        await Stock.create({
          tikr: 'S&P500',
          marketData: marketData
        });
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

      return await Stock.find({tikr: { $ne: "S&P500" }}).sort(type).limit(20)
    },
    marketData: async (parent, args, context, info) => {
      return await Stock.findOne({tikr: args.tikr}, {marketData: true})
    }
  },
  Mutation: {
    getStockData: () => getStockData()
  }
};

module.exports = { typeDefs, resolvers };