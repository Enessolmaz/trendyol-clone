import mongoose from "mongoose"


const { Schema } = mongoose


const userBasket = new Schema({
  user_id: {
    type: String
  },
  userBasket: [
    {
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    },
  ],
})

export const USER_BASKET = mongoose.model("basket", userBasket) 