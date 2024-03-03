"use client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_FAVORITE } from "./UserFavoriteQuery";
import { get_user } from "../Navbar/graphql/userQuery";
import Link from "next/link";
import ProductFavorite from "../Products/ProductFavorite";
import { FaUser } from "react-icons/fa";

type IUrl = {
  url: string;
};

const UserFavorite = ({ url }: IUrl) => {
  const [favorites, setFavorites] = useState([]);

  const { loading, data: user_favorites, refetch } = useQuery(GET_FAVORITE, {
    variables: {
      id: url,
    },
  });
  const { data: user_information } = useQuery(get_user, {
    variables: {
      id: url,
    },
  });

  useEffect(() => {
    const modifiedFavorites = user_favorites?.getUserFavorite?.map(
      (item: any) => {
        const { __typename, ...rest } = item;
        return rest;
      }
    );
    setFavorites(modifiedFavorites);
    refetch();
  }, [refetch, user_favorites?.getUserFavorite]);

  return (
    <div className="flex flex-col py-4 px-2">
      {loading ? (
        <span className="w-full h-[60vh] flex items-center justify-center bg-no-repeat">
          <span className="w-[185px] h-40 bg-gradient-to-r from-orange-500 bg-red-500 loading-infinity " />
        </span>
      ) : (
        <>
          <div className="  flex items-center gap-1">
            <span className="flex items-center gap-2 font-bold">
              <FaUser />
              Kullanici :{" "}
            </span>
            <Link
              className="border px-2 h-8 flex items-center border-black transition-all rounded hover:border-orange-500"
              href={`/user/${url}`}
            >
              {user_information?.getUser?.email}
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 mt-2">
            {favorites?.length > 0 ? (
              favorites?.map((item: any) => (
                <div
                  key={item.id}
                  className="md:w-[23.5%] w-[45%] relative h-[305px] flex flex-col items-center bg-[#121212] border rounded-md border-[#414141] p-2    cursor-pointer gap-2"
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
                    <span className="h-full">{item.title.slice(0, 30)}</span>
                  </span>
                  <div className="absolute right-2 top-2 bg-black border border-[#414141] w-9 h-9 rounded-full flex items-center justify-center">
                    <ProductFavorite refetch={refetch} item={item} />
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
                        <span className="bg-[#26201a]  text-[9px] h-6 w-fit flex items-center px-2 rounded-sm text-white font-light">
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
                </div>
              ))
            ) : (
              <span className=" bg-orange-500 text-white w-full text-center h-16 flex items-center justify-center rounded">
                Kullanici hiç favori eklemedi
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserFavorite;
