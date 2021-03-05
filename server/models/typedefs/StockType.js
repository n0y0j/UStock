const { gql } = require("apollo-server");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const finvizor = require("finvizor");

const typeDefs = gql`
  type Stock {
    tikr: String
    name: String
    exchange: String
    sector: String
    price: Float
    change: Float
    volume: Float
  }
`;

const getStockData = async () => {
  var stockList = [];

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
        .replace("reports", "");

      if (index > 0) {
        let searchStock = await finvizor.stock(tikr);

        var stock = {
          tikr: searchStock.ticker,
          name: searchStock.name,
          exchange: searchStock.exchange,
          sector: searchStock.sector,
          price: searchStock.price,
          change: searchStock.change,
          volume: searchStock.volume,
        };

        if (stock.tikr !== null) {
          stockList.push(stock);
        }
      }
    })
  );

  browser.close();
  console.log(stockList.length);
  return stockList;
};

const resolvers = {
  Mutation: {
    searchStock: async (parent, args, context, info) => {
      const stockList = await getStockData();

      return stockList;
    },
  },
};

module.exports = { typeDefs, resolvers };
