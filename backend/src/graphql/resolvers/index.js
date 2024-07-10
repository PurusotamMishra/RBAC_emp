const usersResolvers = require("./users");
const rolesResolvers = require("./roles");
const roles = require("./roles");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...rolesResolvers.Query
  
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...rolesResolvers.Mutation
  },
};
