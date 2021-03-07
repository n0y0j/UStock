const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        user(id: String): User
        searchStock(type: String): [Stock]
    }
`

module.exports = typeDefs