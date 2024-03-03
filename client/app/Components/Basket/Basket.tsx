"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiBox } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { get_user } from "../Navbar/graphql/userQuery";
import { setUserBasket } from "@/app/redux/user";
import {
  decreaseOrRemoveItemInBasket,
  deleteItemInBasket,
  increaseItemInBasket,
} from "./BasketMutation";
import { GET_BASKET } from "../Products/UserQuery";
import { toast, Toaster } from "react-hot-toast";

const Basket = () => {
  const basket = useSelector((state: any) => state.user.basket);
  const user = useSelector((state: any) => state.user.user);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = useState("");
  const toastSuccess = (msg: any) => toast.success(msg);

  const { data: user_information, loading, error } = useQuery(get_user, {
    variables: {
      id: user?.id,
    },
  });

  const { refetch, data: user_basket } = useQuery(GET_BASKET, {
    variables: {
      id: user?.id,
    },
  });

  const [
    userDeleteItemInBasket,
    {
      loading: userDeleteItemInBasket_loading,
      error: userDeleteItemInBasketError,
    },
  ] = useMutation(deleteItemInBasket);

  const [decreaseOrRemoveItem, { loading: decreaseLoading }] = useMutation(
    decreaseOrRemoveItemInBasket
  );

  const [increaseItem, { loading: increaseItemLoading }] = useMutation(
    increaseItemInBasket
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate.push("/login");
    } else {
      navigate.push("/user/basket");
    }
  }, [navigate, user]);

  const deleteItem = async (selectedItem: any) => {
    setLoadingDelete(selectedItem.id);
    const __type = { ...selectedItem, user_ID: user_information?.getUser?.id };
    const { __typename, ...data } = __type;
    try {
      const { data: getData } = await userDeleteItemInBasket({
        variables: {
          data,
        },
      });
      dispatch(setUserBasket(getData?.userDeleteItemInBasket));
      toastSuccess("Silindi");
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (selectedItem: any) => {
    const __type = { ...selectedItem, user_ID: user_information?.getUser?.id };
    const { __typename, ...data } = __type;

    try {
      const { data: getData } = await decreaseOrRemoveItem({
        variables: {
          data,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = async (selectedItem: any) => {
    const __type = { ...selectedItem, user_ID: user_information?.getUser?.id };
    const { __typename, ...data } = __type;
    try {
      const { data: getData } = await increaseItem({
        variables: {
          data,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const total = basket?.reduce(
    (acc: any, item: any) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="mt-4 flex flex-col gap-4 px-4 xl:px-0 pb-4">
      <Toaster position="bottom-center" reverseOrder={false} />
      {loading ? (
        <span className="w-full h-[60vh] flex items-center justify-center bg-no-repeat">
          <span className="w-[185px] h-40 bg-gradient-to-r from-orange-500 bg-red-500 loading-infinity " />
        </span>
      ) : (
        <>
          {basket?.length > 0 ? (
            <div className="basketContainer w-full justify-between gap-12 relative ">
              <div className=" flex flex-col w-full  gap-8">
                <div className="text-lg w-full   h-12 flex items-center   text-white">
                  Sepetim ({basket?.length})Adet
                </div>
                <div className="flex flex-col w-full gap-4">
                  {basket?.map((item: any) => (
                    <div
                      key={item.id}
                      className="item flex flex-col  h-44 w-full  rounded-md border  border-[#3a3a3a]"
                    >
                      <div className="bg-[#1f1f1f] rounded-t-md h-9 px-12 flex items-center">
                        Satıcı:{" "}
                        <span className="text-white font-bold">
                          {" "}
                          &nbsp; {item?.category}
                        </span>
                      </div>
                      {item?.quantity * item.price > 200 ? (
                        <div className="bg-[#152920] flex justify-center h-6 text-white items-center gap-2">
                          <FiBox className="text-[#0bc15c]" /> Kargo Bedava!
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="item-information h-full flex flex-1 items-center  px-2 lg:px-12 border  border-[#3a3a3a]   ">
                        <div className="image-desc flex gap-4 w-full truncate ">
                          <picture>
                            <img
                              src={item?.image}
                              alt={item?.description}
                              className="w-16 rounded "
                            />
                          </picture>
                          <div className="-desc  flex-col w-full hidden md:flex ">
                            <span className="flex-1  w-full text-white">
                              {item.category}
                            </span>
                            <span className="flex-1  w-full text-sm">
                              Tutar : {item.price}
                            </span>
                            <span className="flex-1  w-full text-sm truncate  max-w-96 ">
                              {item.title}
                            </span>
                          </div>
                        </div>
                        <div className=" w-fit flex justify-between  items-center ">
                          <div className="border xl:w-48 max-w-fit flex items-center justify-between">
                            <button
                              onClick={() => decreaseQuantity(item)}
                              className="border-r bg-white-500 w-full flex items-center justify-center  px-2 font-bold"
                            >
                              -
                            </button>
                            <span className="border-r w-full flex items-center justify-center px-2">
                              {item?.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item)}
                              className="rounded px-2 w-full font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-orange-700 flex items-center justify-center w-20 text-sm transition-all hover:text-orange-500 cursor-pointer">
                            {Math.floor(item?.quantity * item.price)} TL
                          </span>
                          <div onClick={() => deleteItem(item)}>
                            {loadingDelete === item.id ? (
                              userDeleteItemInBasket_loading ? (
                                <div className="w-6 h-6 flex bg-orange-500 items-center justify-center  loading-spinner" />
                              ) : (
                                <FaTrash className="hover:text-orange-700 transition-all cursor-pointer" />
                              )
                            ) : (
                              <FaTrash className="hover:text-orange-700 transition-all cursor-pointer" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sticky top-0  h-fit gap-8">
                <button className="h-11 w-full text-white font-bold rounded-md bg-orange-500">
                  Sepeti Onayla
                </button>
                <div className="bg-[#1a221e] text-[#8b8b8b] text-xs rounded-md p-2 flex flex-col gap-2">
                  <div className="description flex">
                    <picture>
                      <img
                        src="https://cdn.dsmcdn.com/web/production/ty-pass-mweb-basket.png"
                        alt="trpass"
                        className="w-24"
                      />
                    </picture>
                    &nbsp; 45 TL!
                  </div>
                  <span>
                    {" "}
                    10 lu kargo paketi satın al, siparişlerin için ayrıca kargo
                    ücreti ödeme!
                  </span>
                  <button className="p-2 bg-black rounded border border-green-500 hover:bg-green-500 hover:border-black transition-all hover:text-white">
                    Sepete Ekle
                  </button>
                </div>
                <div className="h-40 gap-1 rounded p-2 flex flex-col border border-[#343434] ">
                  <span className=" w-full flex text-white font-bold">
                    Sipariş Özeti
                  </span>
                  <div className="mt-2">
                    <span className=" w-full flex justify-between text-sm">
                      Ürünlerin Toplamı{" "}
                      <span className="text-orange-500">
                        {total && Math.floor(total)} TL
                      </span>
                    </span>
                    <span className=" w-full flex text-sm justify-between  mt-2">
                      <span>Kargo Toplamı </span>
                      <span className="text-orange-500"> 34.99 TL</span>
                    </span>
                  </div>
                  <span className="border-b-2 border-[#343434] " />

                  <div className=" h-full flex items-center justify-between">
                    <span>Toplam</span>
                    <span className="text-orange-500">
                      {Math.floor(total + 35)} TL
                    </span>
                  </div>
                </div>
                <span>İNDIRIM KODU GIR</span>
                <button className="h-11 w-full text-white font-bold rounded-md bg-orange-500">
                  Sepeti Onayla
                </button>
              </div>
            </div>
          ) : (
            <span className=" bg-orange-500 text-white w-full text-center h-16 flex items-center justify-center rounded">
              Kullanicinin Sepeti Boş
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Basket;
