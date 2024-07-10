import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
query GetUserProfile($email: String!) {
  getUserProfile(email: $email) {
    id
    firstName
    lastName
    email
    phone
    salary
    department
    role
  }
}`;


export const GET_ALL_USERS = gql`
  query GetAllUsers {
  getAllUsers {
    id
    firstName
    lastName
    email
    phone
    salary
    department
    role
  }
}
`;

export const GET_ALL_ROLES = gql`
query GetAllRoles {
  getAllRoles {
    role
    permissions
  }
}
`;

export const GET_PERMISSIONS = gql`
query GetPermissions($role: String!) {
  getPermissions(role: $role) {
    permissions
  }
}`
