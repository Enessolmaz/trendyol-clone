import { gql } from "apollo-server-express";


export const typeDefs = gql`

    type User{
      id: ID,
      email: String,
      password: String
      gender: String
    }
    type Basket {
      id: ID
      category: String
      description: String
      image: String
      price: Float
      title: String
      totalPrice: String
      user_ID: String
      rating: Rating
      quantity: String
    }
    type Favorite{
      id: ID
      category: String
      description: String
      image: String
      price: Float
      title: String
      user_ID: String
      rating: Rating
    }

    input addFavorite{
      id: ID
      category: String
      description: String
      image: String
      price: Float
      title: String
      user_ID: String
      rating: RatingInput
    }

input addBasket {
  id: ID
  category: String
  description: String
  image: String
  price: Float
  rating: RatingInput
  title: String
  totalPrice: String
  user_ID: String
  quantity: String
}

type Rating {
  rate: Float
  count: Int
}

input RatingInput {
  rate: Float
  count: Int
}

    input addUser {
      email: String
      password: String
      gender: String
    }

    type Query {
      getUser(id: ID): User
      getUserBasket(id: ID): [Basket]
      getUserFavorite(id: ID): [Favorite]
      }

    type Mutation {
      userRegister(data: addUser) : User
      userLogin(data: addUser) : User

      userAddBasket(data: addBasket): Basket
      userDeleteItemInBasket(data:addBasket): [Basket]
      decreaseOrRemoveItem (data: addBasket ) : [Basket]
      increaseItem (data: addBasket ) : [Basket]


      userAddFavorite(data: addFavorite ) : Favorite
      

    }

`