import { gql } from "@apollo/client";

export const GET_BASKET = gql`
  query getUserBasket($id: ID) {
    getUserBasket(id: $id) {
      id
      title
      description
      price
      category
      image
      totalPrice
      user_ID
      quantity
    }
  }
`;
