const usersResolvers = require("./users");
const rolesResolvers = require("./roles")

module.exports = {
  Query: {
    ...usersResolvers.Query,
  
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...rolesResolvers.Mutation
  },
};
