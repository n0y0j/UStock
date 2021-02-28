const data = require('./test.json')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')

mongoose.connect('mongodb+srv://admin:asd123456@ustock.tnrtb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

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
