const { Role, Permission, hasPermissions } = require("../../models/User");

const { GraphQLError } = require("graphql");

module.exports = {
    Mutation: {
        async createRole(_, { name }) {

            try {
                const existingName = await Role.findOne({ name })

                if (existingName) {
                    throw new GraphQLError("Role already exists. You can update its permissions.")
                }

                const newRole = new Role({
                    name: name
                })
                const newHasPermissions = new hasPermissions({
                    role: name,
                    permissions: ["NO_ACCESS"]
                })

                const res = await newRole.save();
                const res2 = await newHasPermissions.save();
                return {
                    role: res2.role,
                    permissions: res2.permissions,
                }

            } catch (err) {
                throw new GraphQLError(`Failed to create role: ${err.message}`)
            }
        },

        async deleteRole(_, { name }) {
            try {
                const existingName = await Role.findOne({ name })

                if (!existingName) {
                    throw new GraphQLError("Role does not exists.")
                }

                const res = await Role.deleteOne({ name });
                const res2 = await hasPermissions.deleteOne({ role: name });
                return "Role deleted successfully!"
            } catch (err) {
                throw new GraphQLError(`Failed to delete role: ${err.message}`)
            }
        },

        async updatePermissions(_, { updatePermissions }) {
            try {
                const { role, permissions } = updatePermissions;

                const existingRole = await Role.findOne({ role })
                if (existingRole) {
                    throw new GraphQLError("Role does not exist!")
                }

                const res = await hasPermissions.findOneAndUpdate(
                    { role },
                    { permissions },
                );

                return "Roles and its permissions updated successfully!"
            } catch (err) {
                throw new GraphQLError(`Failed to update Permission: ${err.message}`)
            }
        }
    },

    Query: {

        async getAllRoles() {
            try {
                const roles = await hasPermissions.find();
                return roles;
            } catch (error) {
                throw new GraphQLError(`Failed to fetch all users: ${error.message}`);
            }
        },
        
        async getAvailablePermissions () {
            try{
                const availPermissions = await Permission.find();
                return availPermissions;
            }catch(err){
                throw new GraphQLError(`Failed to fetch the permissions: ${err.message}`)
            }
        },

        async getPermissions(_, { role }) {
            try {
                const existingRole = await Role.find({ role })
                if (!existingRole) {
                    throw new GraphQLError(`Role does not exists!`)
                }

                const res = await hasPermissions.findOne({ role })
                return (
                    res
                )
            } catch (err) {
                throw new GraphQLError(`Failed to fetch permissions: ${err.message}`)
            }
        }

    }
}
