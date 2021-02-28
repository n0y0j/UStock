const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const config = require('./config/key')
const queries = require('./models/typedefs/_queries')
const mutations = require('./models/typedefs/_mutations')
const user = require('./models/User')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

const typeDefs = [
    queries,
    mutations,
    user.typeDefs,
]

const resolvers = [
    user.resolvers
]
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
