const { Role, Permission, hasPermissions } = require("../../models/User");

const { GraphQLError } = require("graphql");

module.exports = {
  Mutation: {
    async createRole(_, { name }) {
      try {
        const existingName = await Role.findOne({ name });

        if (existingName) {
          throw new GraphQLError(
            "Role already exists. You can update its permissions."
          );
        }

        const newRole = new Role({
          name: name,
        });
        const newHasPermissions = new hasPermissions({
          role: name,
          permissions: ["NO_ACCESS"],
        });

        const resRole = await newRole.save();
        const resPermissions = await newHasPermissions.save();

        return {
          role: resPermissions.role,
          permissions: resPermissions.permissions,
        };
      } catch (err) {
        throw new GraphQLError(`Failed to create role: ${err.message}`);
      }
    },

    async deleteRole(_, { name }) {
      try {
        const existingName = await Role.findOne({ name });

        if (!existingName) {
          throw new GraphQLError("Role does not exists.");
        }

        const res = await Role.deleteOne({ name });
        const res2 = await hasPermissions.deleteOne({ role: name });
        return "Role deleted successfully!";
      } catch (err) {
        throw new GraphQLError(`Failed to delete role: ${err.message}`);
      }
    },

    async updatePermissions(_, { updatePermissions }) {
      try {
        const { role, permissions } = updatePermissions;

        const existingRole = await Role.findOne({ role });
        if (existingRole) {
          throw new GraphQLError("Role does not exist!");
        }

        const res = await hasPermissions.findOneAndUpdate(
          { role },
          { permissions }
        );

        return "Roles and its permissions updated successfully!";
      } catch (err) {
        throw new GraphQLError(`Failed to UPDATE : ${err.message}`);
      }
    },
  },

  Query: {
    async getAllRoles() {
      try {
        const users = await hasPermissions.find();
        return users;
      } catch (error) {
        throw new GraphQLError(`Failed to fetch all users: ${error.message}`);
      }
    },
  },
};
