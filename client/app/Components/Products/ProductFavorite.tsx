"use client";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { ADD_FAVORITE } from "./AddFavoritesMutation";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_FAVORITE } from "../UserFavorite/UserFavoriteQuery";
import toast, { Toaster } from "react-hot-toast";

const ProductFavorite = ({ item, refetch }: any) => {
  const user_ID = useSelector((state: any) => state.user.user);
  const [disabled, setDisabled] = useState(false);
  const toastError = (msg: any) => toast.error(msg);

  const [
    userAddFavorite,
    { loading: favorite_loading, error: errorFavorite },
  ] = useMutation(ADD_FAVORITE);

  const addToFavorite = async (selected: any) => {
    if (disabled) return;
    setDisabled(true);

    try {
      const data = { ...selected, user_ID: user_ID?.id };
      const { data: getFavorite } = await userAddFavorite({
        variables: {
          data,
        },
      });
      if (getFavorite.userAddFavorite) {
        refetch();
      }
    } catch (error : any) {
      toastError(error?.message);
    } finally {
      setDisabled(false);
    }
  };

  const { data: user_favorites } = useQuery(GET_FAVORITE, {
    variables: {
      id: user_ID?.id,
    },
  });

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {favorite_loading ? (
        <span className="w-6 h-6 bg-orange-500 loading-spinner flex items-center justify-center" />
      ) : (
        <button disabled={disabled}>
          <FaHeart
            onClick={() => addToFavorite(item)}
            className={` transition-all  ${
              user_favorites?.getUserFavorite?.some(
                (exist: any) => +exist?.id === +item?.id
              )
                ? "fill-orange-600 hover:fill-gray-400"
                : "hover:fill-orange-600 "
            }
 )}`}
          />
        </button>
      )}
    </>
  );
};

export default ProductFavorite;
