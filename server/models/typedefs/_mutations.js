const { gql } = require("apollo-server");

const typeDefs = gql`
    type Mutation {
        register(input: registerInput): UserResponse
        login(input: loginInput): UserResponse
    }
`;

module.exports = typeDefs;
