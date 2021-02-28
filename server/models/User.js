const mongoose = require("mongoose");
const { gql } = require("apollo-server");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Int!
  }
`;

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
        var temp;
        await User.findById(args.id, function(err, user) {
            if (err) return { success: false, err: 'block!'}
            if (!user) return { success: false, err: 'user is empty'}
            temp = user;
        })
        return temp;
    }
  },
  Mutation: {
    register: (parent, args, context, info) => {
      User.create({
        name: args.name,
        email: args.email,
        password: args.password,
        role: args.role,
      },
      function(err, user) {
        if (err) return { success: false }
        else console.log(user)
      });
      return args;
    },
  },
};

module.exports = { User, typeDefs, resolvers };
