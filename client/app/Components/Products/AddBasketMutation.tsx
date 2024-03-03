import { gql } from "@apollo/client";

export const PUSH_BASKET = gql`
  mutation userAddBasket($data: addBasket) {
    userAddBasket(data: $data) {
      id
      category
      description
      image
      price
      title
      rating {
        rate
        count
      }
      user_ID
      quantity
    }
  }
`;
