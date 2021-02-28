const data = require('./test.json')
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        test: String
    }
`

const resolvers = {
    Query: {
        test: () => data.test
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
