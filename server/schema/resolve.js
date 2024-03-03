import { USER_BASKET } from "../Model/UserBasket.js"
import { USER_FAVORITES } from "../Model/UserFavorites.js"
import { USER } from "../Model/Users.js"


export const resolvers = {

  Query: {
    getUser: async (_, { id }) => {
      const user = await USER.findById(id)
      return user
    },
    getUserBasket: async (_, { id }) => {
      const user = await USER_BASKET.findOne({
        user_id: id
      })
      if (user) {
        return user.userBasket
      }
      else {
        throw new Error("Kullanıcı Yok")
      }
    },
    getUserFavorite: async (_, { id }) => {
      const userFavorites = await USER_FAVORITES.findOne({ user_id: id })
      return userFavorites.userFavorite
    }
  },


  Mutation: {
    userRegister: async (_, { data }) => {
      const { email } = await data;
      const alreadyEmail = await USER.findOne({ email })
      if (alreadyEmail) {
        throw new Error("Email Adresi Mevcut")
      }
      else {
        const user_data = await USER.create(data)
        return user_data
      }
    },
    userLogin: async (_, { data }) => {
      const { email, password } = await data;
      const existUsername = await USER.findOne({ email })
      if (existUsername) {
        if (existUsername.password === password) {
          return existUsername
        }
        else {
          throw new Error("Password Yanlış")
        }
      }
      else {
        throw new Error("Email Bulunamadı")
      }
    },

    userAddBasket: async (_, { data }) => {
      const { user_ID, id } = await data;
      const existUser = await USER.findById(user_ID);

      if (existUser) {
        let existItem = await USER_BASKET.findOne({ user_id: user_ID });

        // Daha önce Kullanıcı Sepet Oluşturmuşmu ona bakıyoruz
        if (existItem) {

          // yani sepetdede aynı item varmı ona bakıyoruz burda
          const existItemInBasket = existItem.userBasket.find((item) => item.id === id)
          if (existItemInBasket) {
            existItemInBasket.quantity += 1;
            await existItem.save();
            return existItemInBasket
          }
          // Sepetde aynı ürün yoksa eski veriyi tutup yeni veriyi eklemem gereken yer
          else {
            data.quantity = 1;
            existItem.userBasket.push(data);
            await existItem.save();
            return data;
          }
          // Kullanıcı Sepet Oluşturmamış ve Yeni ürün ekliyoruz idsi ile birlikte
        } else {
          await USER_BASKET.create({ user_id: user_ID, userBasket: [data] })
          return data;
        }
      } else {
        throw new Error('Kullanıcı bulunamadı');
      }
    },
    userDeleteItemInBasket: async (_, { data }) => {
      const { user_ID, id } = await data;
      const existBasket = await USER_BASKET.findOne({ user_id: user_ID });
      if (existBasket) {
        const updatedBasket = existBasket.userBasket.filter((item) => item.id !== id)
        existBasket.userBasket = updatedBasket;
        await existBasket.save();
        return existBasket.userBasket
      }
    },

    decreaseOrRemoveItem: async (_, { data }) => {
      try {
        const { user_ID, id } = await data
        const newBasket = await USER_BASKET.findOne({ user_id: user_ID });
        if (newBasket) {
          const updatedBasket = newBasket.userBasket.map(item => {
            if (item.id === id) {
              if (item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
              }
            }
            return item;
          }).filter(item => item.quantity > 0);

          newBasket.userBasket = updatedBasket
          await newBasket.save()
          return newBasket.userBasket
        } else {
          throw new Error("HATA")
        }
      } catch (error) {
        return error.message;
      }
    },
    increaseItem: async (_, { data }) => {
      try {
        const { user_ID, id } = await data
        const existBasket = await USER_BASKET.findOne({ user_id: user_ID });
        if (existBasket) {
          const updatedBasket = existBasket.userBasket.map(item => {
            if (item.id === id) {
              if (item.quantity > 0) {
                return { ...item, quantity: item.quantity + 1 };
              }
            }
            return item;
          }).filter(item => item.quantity > 0);

          existBasket.userBasket = await updatedBasket
          await existBasket.save()
          return existBasket.userBasket
        } else {
          throw new Error("HATA")
        }

      } catch (error) {
        return error.message;
      }
    },



    userAddFavorite: async (_, { data }) => {
      const { user_ID, id } = await data
      const existUser = await USER.findById(user_ID);
      if (existUser) {
        let existItemInBasket = await USER_FAVORITES.findOne({ user_id: user_ID })
        if (existItemInBasket) {
          const existID = existItemInBasket.userFavorite.find((item) => item.id === id);
          if (existID) {
            console.log("Aynısı var Silindi")
            const newData = existItemInBasket.userFavorite.filter((item) => item.id !== id)
            existItemInBasket.userFavorite = newData
            await existItemInBasket.save()
            return data
          } else {
            console.log("Eklendi")
            existItemInBasket.userFavorite.push(data)
            await existItemInBasket.save()
            return data
          }
        }
        else {
          console.log("Oluşturuldu")
          await USER_FAVORITES.create({ user_id: user_ID, userFavorite: [data] })
          return data
        }
      }
      else {
        throw new Error('Kullanıcı bulunamadı');
      }

    }
  }
}