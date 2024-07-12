const { User } = require("../../models/User");
const { AuthenticationError } = require("apollo-server");
const { GraphQLError } = require("graphql");

const SECRET_KEY = "hello"; // Ensure SECRET_KEY is defined in your environment

module.exports = {
  Mutation: {
    async registerUser(
      _,
      { registerInput: {firstName, lastName, email, phone, salary, department } }
    ) {
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new GraphQLError(
            "User already exists with this email: " + email
          );
        }
        const userCount = await User.countDocuments(); // Get the total number of users
        const newId = (1000 + userCount).toString();

        const newUser = new User({
          id: newId,
          firstName,
          lastName,
          phone,
          email: email.toLowerCase(),
          salary,
          department,
          role: "EMP",
          isActive: true,
        });

        const res = await newUser.save();
        const idsave= newUser.id;

        return {
          idsave,
          // ...res._doc,
          ...res._doc
        };
      } catch (error) {
        throw new GraphQLError(`Failed to register user: ${error.message}`);
      }
    },



    async updateUserDetails(_, { updatedDetails }) {
      const { firstName, lastName, email, phone, salary, department, role } = updatedDetails;
      try {
        const user = await User.findOneAndUpdate(
          { email },
          { firstName, lastName, phone, salary, department, role },
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

    async deleteUser(_, { email, isActive }) {
      try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          throw new GraphQLError(
            "User not found with this email: " + email
          );
        }

        // const res = await User.deleteOne({ email });
        const user = await User.findOneAndUpdate(
          { email },
          { isActive },
          { new: true }
        );

        return (
          "User deleted successfully!"
        )


      } catch (err) {
        throw new GraphQLError(`Failed to delete user: ${err.message}`)
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
        const roles = await User.find({"isActive": true});
        return roles;
      } catch (error) {
        throw new GraphQLError(`Failed to fetch all users: ${error.message}`);
      }
    },
  },
};
