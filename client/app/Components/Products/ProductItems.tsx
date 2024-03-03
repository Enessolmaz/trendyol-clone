"use client";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { PUSH_BASKET } from "./AddBasketMutation";
import { useDispatch, useSelector } from "react-redux";
import { GET_BASKET } from "./UserQuery";
import { setUserBasket } from "@/app/redux/user";
import ProductFavorite from "./ProductFavorite";
import { GET_FAVORITE } from "../UserFavorite/UserFavoriteQuery";
import { FaSortNumericDown } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

interface IProduct {
  products: {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }[];
  filterItems: string[];
}

const ProductItems: React.FC<IProduct | any> = ({
  products,
  filterItems,
  setFilterItems,
  originalData,
  setFilteredMap,
}) => {
  const user_ID = useSelector((state: any) => state.user.user);
  const [userAddBasket, { loading, error }] = useMutation(PUSH_BASKET);
  const [sortVisible, setSortVisible] = useState(false);
  const [selectedSortType, setSelectedSortType] = useState("Önerilen Sıralama");

  const toastSuccess = (msg: any) => toast.success(msg);
  const toastError = (msg: any) => toast.error(msg);

  const [clickedLoadingId, setClickedLoadingId] = useState("");
  const dispatch = useDispatch();

  const { data: user_basket, loading: basketLoading, refetch } = useQuery(
    GET_BASKET,
    {
      variables: {
        id: user_ID?.id,
      },
    }
  );

  useEffect(() => {
    dispatch(setUserBasket(user_basket?.getUserBasket));
  }, [dispatch, user_basket]);

  const addToCart = async (selected: any) => {
    const data = { ...selected, user_ID: user_ID?.id };
    if (user_ID) {
      setClickedLoadingId(selected.id);
    }

    try {
      const { data: GetData } = await userAddBasket({
        variables: {
          data,
        },
      });
      if (GetData.userAddBasket) {
        await refetch();
        toastSuccess("Sepete Eklendi");
      }
    } catch (error : any) {
      toastError(error.message);
    }
  };
  const { data: user_favorites, refetch: favoriteFetch } = useQuery(
    GET_FAVORITE,
    {
      variables: {
        id: user_ID?.id,
      },
    }
  );

  return (
    <div
      className={`flex flex-col gap-4 transition-all px-2 mb-4 ${
        basketLoading ? "opacity-20" : ""
      }`}
    >
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex justify-between h-14 items-center  pr-12">
        <span className="font-bold text-white flex flex-col gap-2">
          {basketLoading ? "" : `+${products.length} ürün listeleniyor`}
          <div className="flex gap-2 transition-all">
            {filterItems ? (
              <span
                onClick={() => {
                  setFilterItems("");
                  setFilteredMap(originalData);
                }}
                key={filterItems}
                className="border rounded-md border-orange-500 p-2 text-xs cursor-pointer hover:bg-[#211e1b] transition-all"
              >
                {filterItems}
              </span>
            ) : (
              ""
            )}
          </div>
        </span>
        <div className="relative">
          <span
            onClick={() => setSortVisible(!sortVisible)}
            className="text-slate-300 transition-all border border-[#404040] hover:border-orange-500 text-sm flex gap-2 w-52 justify-between items-center p-3 rounded-md  cursor-pointer"
          >
            {selectedSortType}
            <FaSortNumericDown className="fill-orange-500" size={18} />{" "}
          </span>
          <div
            className={`${
              sortVisible
                ? "flex flex-col absolute top-[50px] text-sm w-52 border-[#404040] rounded border z-10 p-2 bg-black "
                : "hidden"
            }`}
          >
            <span
              onClick={() => {
                setSelectedSortType("Önerilen Sıralama");
                products.sort(
                  (a: { id: number }, b: { id: number }) => a.id - b.id
                );
              }}
              className="w-full h-8 hover:bg-[#222222] hover:text-orange-500 transition-all text-slate-300  rounded-md flex gap-2 items-center px-2 cursor-pointer"
            >
              Önerilen Sıralama
            </span>
            <span
              onClick={() => {
                setSelectedSortType("Düşükten Yükseğe");

                products.sort(
                  (a: { price: number }, b: { price: number }) =>
                    a.price - b.price
                );
              }}
              className="w-full h-8 hover:bg-[#222222] hover:text-orange-500 transition-all text-slate-300  rounded-md flex gap-2 items-center px-2 cursor-pointer"
            >
              Düşükten Yükseğe
            </span>
            <span
              onClick={() => {
                setSelectedSortType("Yüksekten Düşüğe");
                products.sort(
                  (a: { price: number }, b: { price: number }) =>
                    b.price - a.price
                );
              }}
              className="w-full h-8 hover:bg-[#222222] hover:text-orange-500 transition-all text-slate-300  rounded-md flex gap-2 items-center px-2 cursor-pointer"
            >
              Yüksekten Düşüğe
            </span>
          </div>
        </div>
      </div>
      <div className="products flex flex-wrap gap-2 ">
        {products.map((item: any) => (
          <div
            key={item.id}
            className="md:w-[23.5%] w-[48%] relative h-[375px] flex flex-col items-center bg-[#121212] border rounded-md border-[#414141] pt-6 px-6 pb-2  cursor-pointer gap-2"
          >
            <picture>
              <img
                src={item.image}
                alt="asd"
                className="w-[172px] h-48 rounded"
              />
            </picture>
            <span className="description flex-1 text-xs text-gray-500 h-32 w-full     ">
              <span className="font-bold text-white ">
                {item.category.toUpperCase()}
              </span>
              &nbsp;
              <span className="h-full">{item.title.slice(0, 35)}</span>
            </span>
            <div className="absolute right-2 top-2 bg-black border border-[#414141] w-9 h-9 rounded-full flex items-center justify-center">
              <ProductFavorite refetch={favoriteFetch} item={item} />
            </div>
            <div className="flex flex-1 text-[#f27a1a] w-full items-center justify-between ">
              <span className="flex flex-1 justify-between mb-2">
                <span className="font-bold">${item.price}</span>
                {item.id % 2 === 0 ? (
                  <span className="bg-[#2b2124] text-[9px] w-fit h-6 flex items-center px-2 rounded-sm text-white font-light">
                    <picture>
                      <img
                        alt="logo"
                        src="https://cdn.dsmcdn.com/web/production/campaign-coupon-icon.svg"
                      />
                    </picture>
                    Kupon Fırsatı
                  </span>
                ) : (
                  <span className="bg-[#26201a] text-[9px] h-6 w-fit flex items-center px-2 rounded-sm text-white font-light">
                    <picture>
                      <img
                        alt="logo"
                        src="https://cdn.dsmcdn.com/web/production/campaign-product-promotion-icon.svg"
                      />
                    </picture>
                    25 TL Hediye
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={() => addToCart(item)}
              className={`flex-1 w-full items-center justify-center transition-all rounded border border-orange-500 ${
                clickedLoadingId === item.id
                  ? loading
                    ? " bg-green-500 border border-white text-white text-bold"
                    : ""
                  : ""
              }`}
            >
              {clickedLoadingId === item.id
                ? loading
                  ? "Eklendi"
                  : "Sepete Ekle"
                : "Sepete Ekle"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductItems;
