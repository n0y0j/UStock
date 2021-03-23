const { gql } = require("apollo-server");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const finvizor = require("finvizor");
const yahooFinance = require("yahoo-finance");
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

// const MHhip = async () => {
//   const browser = await puppeteer.launch({
//     headless: true,
//   });

//   const page = await browser.newPage();
//   await page.goto("https://finance.yahoo.com/quote/TSLA/history?p=TSLA");
//   const content = await page.content();

//   const $ = cheerio.load(content);

//   const lists = $(`#Col1-1-HistoricalDataTable-Proxy > section > div`);

//   const test = $(lists).find("table > tbody > tr");

//   test.map((index, item) => {
//     const MH1 = $(item).find("td:nth-child(0)").text();
//     const MH2 = $(item).find("td:nth-child(1)").text();
//     const MH3 = $(item).find("td:nth-child(2)").text();
//     const MH4 = $(item).find("td:nth-child(3)").text();
//     const MH5 = $(item).find("td:nth-child(4)").text();
//     const MH6 = $(item).find("td:nth-child(5)").text();
//     const MH7 = $(item).find("td:nth-child(6)").text();

//     console.log(`${MH1} ${MH2} ${MH3} ${MH4} ${MH5} ${MH6} ${MH7}\n`)
//   });
// };

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

        const marketData = await yahooFinance.historical({
          symbol: tikr,
          from: "2020-03-16",
          to: "2021-03-16",
        });

        await Stock.create({
          tikr: searchStock.ticker,
          name: searchStock.name,
          exchange: searchStock.exchange,
          sector: searchStock.sector,
          price: searchStock.price,
          change: searchStock.change === null ? 0 : searchStock.change,
          changePrice: (searchStock.price - searchStock.prevClose).toFixed(4),
          volume: searchStock.volume,
          marketData: marketData,
        });
      } else if (index == 0) {

      //  %5EVIX: 공포지수, ^GSPC: S&P500
        const marketData = await yahooFinance.historical({
          symbol: "%5EVIX",
          from: "2020-03-17",
          to: "2021-03-17",
        });

        await Stock.create({
          tikr: "VIX",
          marketData: marketData,
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
