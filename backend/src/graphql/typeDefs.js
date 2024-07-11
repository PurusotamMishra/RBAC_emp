const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    email: String!
    phone: String!
    salary: Int!
    department: String!
    role: String!
    isActive: Boolean!
  }

  type RolePermissions {
    role: String!
    permissions: [String!]!
  }

  input hasPermissions {
    role: String!
    permissions: [String]!
  }

  input RegisterInput {
    firstName: String!
    lastName: String
    email: String!
    phone: String!
    salary: Int!
    department: String!
  }

  input UpdateUserDetailsInput {
    firstName: String
    lastName: String
    email: String!
    phone: String
    salary: Int
    department: String
    role: String
  }


  type Query {
    getUserProfile (email: String!): User
    getAllUsers: [User!]!
    getAllRoles: [RolePermissions!]!
    getPermissions (role: String!) : RolePermissions!
    getAvailablePermissions: [String]!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): User!
    updateUserDetails(updatedDetails: UpdateUserDetailsInput!): User!
    deleteUser(email: String!, isActive: Boolean!): String!

    createRole (name: String!) : RolePermissions!
    deleteRole (name: String!) : String!
    updatePermissions (updatePermissions: hasPermissions!) : String!
  } 
`;