const { gql } = require("apollo-server");

const typeDefs = gql`
    type Mutation {
        register(input: registerInput): UserResponse
        login(input: loginInput): UserResponse
        getStockData: Boolean!
    }
`;

module.exports = typeDefs;
