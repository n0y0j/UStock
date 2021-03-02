const { gql } = require("apollo-server");

const typeDefs = gql`
    type Mutation {
        register(input: registerInput): User
        login(input: loginInput): User
    }
`;

module.exports = typeDefs;
