const { gql } = require("apollo-server");

const typeDefs = gql`
    type Mutation {
        register(name: String, email: String, password: String, role: Int): User
    }
`;

module.exports = typeDefs;
