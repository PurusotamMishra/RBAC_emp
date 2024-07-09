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
  }

  input hasPermissions {
    role: String!
    permissions: [String]!
  }

  input RegisterInput {
    id: String!
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
    getUserProfile(email: String!): User
    getAllUsers: [User!]!

    
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): User
    updateUserDetails(updatedDetails: UpdateUserDetailsInput!): User!
    deleteUser(email: String!): String!

    createRole (name: String!) : String
    deleteRole (name: String!) : String!
    updatePermissions (updatePermissions: hasPermissions!) : String!
  }
`;
