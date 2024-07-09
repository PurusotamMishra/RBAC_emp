const {Role, Permission , hasPermissions  } = require("../../models/User");

const { GraphQLError } = require("graphql");

module.exports = {
    Mutation: {
        async createRole(_, { name }) {

            try{
                const existingName = await Role.findOne({ name })

                if(existingName){
                    throw new GraphQLError("Role already exists. You can update its permissions.")
                }

                const newRole = new Role({
                    name: name
                })
                const newHasPermissions = new hasPermissions({
                    role: name,
                    permissions: ["NOACCESS"]
                })

                const res = await newRole.save();
                const res2 = await newHasPermissions.save();

                return(
                    `Role created successfully! ${res} ` 
                )

            }catch(err){
                throw new GraphQLError(`Failed to create role: ${err.message}`)
            }
        },

        async deleteRole (_, { name }) {
            try{
                const existingName = await Role.findOne({name})

                if(!existingName){
                    throw new GraphQLError("Role does not exists.")
                }

                const res = await Role.deleteOne({ name });
                const res2 = await hasPermissions.deleteOne({role:name});
                return(
                    "Role deleted successfully!"
                )

            }catch(err){
                throw new GraphQLError(`Failed to delete role: ${err.message}`)
            }
        },

        async updatePermissions (_, { hasPermissions }){
            try{
                const { role, permissions } = hasPermissions;

                const existingRole = await Role.findOne({role})
                return (
                    "Permissions updated successfully!"
                )

            }catch(err){
                throw new GraphQLError(`Failed to create role: ${err.message}`)
            }
        }

    }
}
