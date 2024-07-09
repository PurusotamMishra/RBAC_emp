const { User } = require("../../models/User");
const { AuthenticationError } = require("apollo-server");
const { GraphQLError } = require("graphql");

const SECRET_KEY = "hello"; // Ensure SECRET_KEY is defined in your environment

module.exports = {
  Mutation: {
    async registerUser(
      _,
      { registerInput: { id, firstName, lastName, email, phone, salary, department } }
    ) {
      try {
        const existingUser = await Emp.findOne({ email });

        if (existingUser) {
          throw new GraphQLError(
            "User already exists with this email: " + email
          );
        }

        const newUser = new Emp({
          id,
          firstName,
          lastName,
          phone,
          email: email.toLowerCase(),
          salary,
          department,
          role: "EMP",
        });


        const res = await newUser.save();

        return {
          // id: res.id,
          // ...res._doc,
          ...res._doc
        };
      } catch (error) {
        throw new GraphQLError(`Failed to register user: ${error.message}`);
      }
    },

  

    async updateUserDetails(_, { updatedDetails }) {
      const { firstName, lastName, email, phone, salary, department } = updatedDetails;
      try {
        const user = await User.findOneAndUpdate(
          { firstName },
          { lastName },
          { email },
          { phone },
          { salary },
          { department },
          { new: true }
        );

        if (!user) {
          throw new GraphQLError("User not found");
        }
        return user;
      } catch (error) {
        throw new GraphQLError(
          `Failed to update user details: ${error.message}`
        );
      }
    },

    async deleteUser(_, { email } ) {
      try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          throw new GraphQLError(
            "User not found with this email: " + email
          );
        }

        const res = await User.deleteOne({ email });

        return(
          "User deleted successfully!"
        )


      }catch(err){
        throw new GraphQLError (`Failed to delete user: ${err.message}`)
      }
    }
  },

  Query: {

    async getUserProfile(_, { email }) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new GraphQLError("User not found");
        }
        return user;
      } catch (error) {
        throw new GraphQLError(`Failed to fetch user profile: ${error.message}`);
      }
    },

    async getAllUsers() {
      try {
        const users = await userSchema.find();
        return users;
      } catch (error) {
        throw new GraphQLError(`Failed to fetch all users: ${error.message}`);
      }
    },
  },
};
