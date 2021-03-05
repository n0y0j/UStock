const { gql } = require("apollo-server");
const puppeteer = require('puppeteer')
const cheerio = require('cheerio');

const typeDefs = gql`
  type Stock {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Mutation: {
    searchStock: async (parent, args, context, info) => {

      const browser = await puppeteer.launch({
        headless: true
      })

      
      const page = await browser.newPage();

      await page.goto('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies');

      const content = await page.content();

      const $ = cheerio.load(content);

      const lists = $("#constituents > tbody > tr")

      lists.each((index, list) => {

        const name = $(list).find("td > a.external.text").text()
        const security = $(list).find("td > a").text()
        const sector = $(list).find("td").text()

        console.log({
          index, name, security, sector
        })
      })

      browser.close()

      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };
