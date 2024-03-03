import { gql } from "@apollo/client";

export const deleteItemInBasket = gql`
  mutation userDeleteItemInBasket($data: addBasket) {
    userDeleteItemInBasket(data: $data) {
      id
      category
      description
      image
      price
      title
      quantity
    }
  }
`;

export const decreaseOrRemoveItemInBasket = gql`
  mutation decreaseOrRemoveItem($data: addBasket) {
    decreaseOrRemoveItem(data: $data) {
      id
      category
      description
      image
      price
      title
      quantity
    }
  }
`;

export const increaseItemInBasket = gql`
  mutation increaseItem($data: addBasket) {
    increaseItem(data: $data) {
      id
      category
      description
      image
      price
      title
      quantity
    }
  }
`;
