const mongoose = require("mongoose");
const { gql } = require("apollo-server");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    role: Int
  }
  input registerInput {
    name: String!
    email: String!
    password: String!
  }
`;

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      var temp;
      await User.findById(args.id, function (err, user) {
        if (err) return { success: false, err: "block!" };
        if (!user) return { success: false, err: "user is empty" };
        temp = user;
      });
      return temp;
    },
  },
  Mutation: {
    register: (parent, args, context, info) => {

      const newUser = {
        name: args.input.name,
        email: args.input.email,
        password: args.input.password,
      };

      bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) console.log(err);

        bcrypt.hash(args.input.password, salt, function(err, hash) {
          if (err) console.log(err);
          args.input.password = hash;
          
          User.create(
            {
              name: args.input.name,
              email: args.input.email,
              password: args.input.password,
            },
            function (err, user) {
              if (err) console.log(err);
            }
          );
        })
      })

      return newUser;
    },
  },
};

module.exports = { User, typeDefs, resolvers };
