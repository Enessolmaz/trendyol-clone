import { gql } from "@apollo/client";

export const GET_FAVORITE = gql`
  query getUserFavorite($id: ID) {
    getUserFavorite(id: $id) {
      category
      description
      id
      image
      price
      title
    }
  }
`;
