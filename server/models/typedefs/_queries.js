const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        user(id: String): User
    }
`

module.exports = typeDefs