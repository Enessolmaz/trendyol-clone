"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import AccountHoverList from "./AccountHoverList/AccountHoverList";
import BasketHoverList from "./BasketHoverList/BasketHoverList";
import { IoIosWarning } from "react-icons/io";

type IProps = {
  setId: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  loading: boolean;
  basket: any;
};

const Accounts = ({ user, setId, loading, basket }: IProps) => {
  const data = [
    {
      id: 1,
      name: user ? "Hesabım" : "Giriş Yap",
      icon: <FaUser size={16} />,
      isHover: true,
    },
    {
      id: 2,
      name: "Favorilerim",
      icon: <MdOutlineFavoriteBorder size={16} />,
    },

    {
      id: 3,
      name: "Sepetim",
      icon: <SlBasket size={16} />,
      basket: basket?.length > 0 && basket?.length,
    },
  ];

  const [isHover, setIsHover] = useState(false);

  return (
    <div className="flex gap-6 items-center justify-start ">
      <div className="flex items-center lg:gap-6  ">
        {loading ? (
          <span className="text-xs border border-red-400 p-2 rounded-md flex items-center ">
            Onrender: Your free instance will spin down with inactivity, which
            can delay requests by 50 seconds or more.
            <IoIosWarning className="animate-ping" size={32} fill="red" />{" "}
          </span>
        ) : (
          <>
            <span
              onMouseEnter={() => {
                setIsHover(true);
              }}
              onMouseLeave={() => {
                setIsHover(false);
              }}
              className="flex  min-w-20  items-center gap-1 hover:text-orange-500  h-9 cursor-pointer relative text-xs text-gray-300"
            >
              {data[0].icon} {data[0].name}
              <div
                className={`${
                  isHover
                    ? "flex items-center justify-center gap-2  flex-col cursor-default absolute top-9 min-h-24 max-h-fit bg-black z-50 rounded-md border border-gray-600 min-w-36 max-w-fit"
                    : "hidden"
                }`}
              >
                {user ? (
                  <div className="flex flex-1 flex-col w-full gap-1 p-2 ">
                    <AccountHoverList user={user} setId={setId} />
                  </div>
                ) : (
                  <div className="px-4 w-full flex flex-col gap-2">
                    <Link
                      className="bg-orange-600  w-full h-8 rounded-md flex items-center justify-center text-white font-bold"
                      href="/login"
                    >
                      Giriş Yap
                    </Link>
                    <Link
                      className="border border-gray-800 w-full h-8 rounded-md flex items-center justify-center text-white font-bold"
                      href="/register"
                    >
                      Kayıt Ol
                    </Link>
                  </div>
                )}
              </div>
            </span>
            <Link
              href={`${user ? `/user-favorite/${user?.id}` : "/login"}`}
              className="flex items-center gap-1 hover:text-orange-500 cursor-pointer transition-all text-xs text-gray-300"
            >
              {data[1].icon} {data[1].name}
            </Link>

            <BasketHoverList data={data} user={user} basket={basket} />
          </>
        )}
      </div>
    </div>
  );
};

export default Accounts;
