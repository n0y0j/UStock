const { gql } = require("apollo-server");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const finvizor = require("finvizor");
const { Stock } = require("../Stock");
const https = require('https')
const fs = require('fs');       

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
  }
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

        await Stock.create({
          tikr: searchStock.ticker,
          name: searchStock.name,
          exchange: searchStock.exchange,
          sector: searchStock.sector,
          price: searchStock.price,
          change: searchStock.change,
          changePrice: (searchStock.price - searchStock.prevClose).toFixed(4),
          volume: searchStock.volume,
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

      return await Stock.find().sort(type).limit(20);
    },
    getSnpStock: () => {
      const url = 'https://query1.finance.yahoo.com/v7/finance/download/ES=F?period1=1583846026&period2=1615382026&interval=1d&events=history&includeAdjustedClose=true'
      const savepath = "../client/src/components/Chart/data.csv"
      const outfile = fs.createWriteStream(savepath);
      
      var req = https.get(url, function(res) {
        res.pipe(outfile);
      });

      return true;
    }
  },
  Mutation: {
    getStockData: () => getStockData()
  }
};

module.exports = { typeDefs, resolvers };
