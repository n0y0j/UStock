const { gql } = require("apollo-server");
const User = require('../User')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Int
  }
  type UserResponse {
    user: User!
    message: String!
    success: Boolean!
  }
  input registerInput {
    name: String!
    email: String!
    password: String!
  }
  input loginInput {
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
    register: async (parent, args, context, info) => {
      var checkValue = {
        user: {
          name: args.input.name,
          email: args.input.email,
          password: args.input.password,
        },
        message: "",
        success: false,
      };

      const user = new User(checkValue.user);

      try {
        await user.save();
        checkValue.success = true;
        checkValue.message = "회원가입에 성공했습니다."
      } catch (err) {
        checkValue.message = "이미 이메일이 존재합니다."
        checkValue.success = false;
      }

      return checkValue;
    },

    login: async (parent, args, context, info) => {
      var checkValue = {
        user: {
          email: args.input.email,
          password: args.input.password,
        },
        message: "",
        success: false,
      };

      await User.findOne({ email: args.input.email }, async (err, user) => {
        if (!user) {
          checkValue.message = "이메일에 해당하는 유저가 없습니다";
          return err;
        }

        const res = await user.comparePassword(args.input.password);
        checkValue.success = res;
        

        if (!res) checkValue.message = "비밀번호를 다시 입력해주세요"
        else checkValue.message = "로그인에 성공하였습니다"
      });

      return checkValue;
    },
  },
};

module.exports = { typeDefs, resolvers }
