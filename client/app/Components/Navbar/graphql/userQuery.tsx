import { gql } from "@apollo/client";

export const get_user = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      email
      password
      gender
    }
  }
`;
