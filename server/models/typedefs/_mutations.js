const { gql } = require("apollo-server");

const typeDefs = gql`
    type Mutation {
        register(input: registerInput): User
    }
`;

module.exports = typeDefs;
