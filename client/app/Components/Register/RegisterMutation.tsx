import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation userRegister($data: addUser) {
    userRegister(data: $data) {
      id
      email
      password
      gender
    }
  }
`;
