import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation userLogin($data: addUser) {
    userLogin(data: $data){
      id
      email
      password
      gender
    }
  }
`;
