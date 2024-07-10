import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
  registerUser(registerInput: $registerInput) {
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

export const UPDATE_USER_DETAILS = gql`
mutation UpdateUserDetails($updatedDetails: UpdateUserDetailsInput!) {
    updateUserDetails(updatedDetails: $updatedDetails) {
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
`

export const DELETE_USER = gql`
mutation DeleteUser($email: String!) {
  deleteUser(email: $email)
}
`
