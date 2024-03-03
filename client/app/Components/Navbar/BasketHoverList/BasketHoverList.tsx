"use client";
import Link from "next/link";
import React, { useState } from "react";

const BasketHoverList = ({ basket, user, data }: any) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="">
      {user ? (
        <Link
          href="/user/basket"
          onMouseEnter={() => {
            if (basket?.length > 0) {
              setIsHover(true);
            }
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="flex items-center relative gap-1  h-9 hover:text-orange-500 cursor-pointer transition-all text-xs text-gray-300 "
        >
          {data[2]?.icon} {data[2]?.name}
          <span className=" w-fit min-w-5 bg-orange-500 hidden  md:flex items-center justify-center rounded text-white text-bold animate-pulse">
            {basket?.length > 0 && basket?.length}
          </span>
          <div
            className={`${
              isHover
                ? "hidden flex-col  min-[1280px]:flex  rounded-md gap-1 p-2 border border-gray-600  cursor-default absolute top-9 min-h-56 max-h-96 -right-16 overflow-auto bg-black z-50 min-w-60 max-w-fit"
                : "hidden"
            }`}
          >
            {basket?.map((item: any) => (
              <span
                key={item.id}
                className="w-full h-12 hover:bg-[#211e1b] transition-all text-white rounded-md flex gap-2 items-center justify-between p-2 cursor-pointer"
              >
                <picture>
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-8 h-8 rounded-md"
                  />
                </picture>
                <span>{item.title.slice(0, 10)}</span>
                <span>{item.quantity} Adet</span>
              </span>
            ))}
          </div>
        </Link>
      ) : (
        <span className="flex items-center relative gap-1  h-9 hover:text-orange-500 cursor-pointer transition-all text-xs text-gray-300">
          {data[2]?.icon} {data[2]?.name}
        </span>
      )}
    </div>
  );
};

export default BasketHoverList;
