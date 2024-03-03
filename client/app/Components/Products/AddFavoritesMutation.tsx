import { gql } from "@apollo/client";

export const ADD_FAVORITE = gql`
  mutation userAddFavorite($data: addFavorite) {
    userAddFavorite(data: $data) {
      id
      category
      description
      image
      price
      title
      user_ID
    }
  }
`;
