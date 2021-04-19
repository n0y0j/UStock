const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        searchStock(type: String): [Stock]
        marketData(tikr: String): Stock
        stockData(tikr: String): Stock
        vixData: Int
    }
`

module.exports = typeDefs