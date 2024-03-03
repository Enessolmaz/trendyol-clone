import { setUserBasket, setUserSlicer } from "@/app/redux/user";
import Link from "next/link";
import React from "react";
import { BsBasket3Fill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FaMessage } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoExit } from "react-icons/io5";

interface IDProps {
  setId: React.Dispatch<React.SetStateAction<string>>;
  user: any;
}

const AccountHoverList = ({ setId, user }: IDProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <span
        className="w-full h-8 transition-all text-[#F97316]  rounded-md flex gap-2 items-center px-2 cursor-pointer"
      >
        <FaUser /> {user?.email}
      </span>
      <Link
        href={`/user-favorite/${user.id}`}
        className="w-full h-8 hover:bg-[#211e1b] transition-all text-white  rounded-md flex gap-2 items-center px-2 cursor-pointer"
      >
        <MdFavorite /> Favorilerim
      </Link>
      <Link href="/user/basket" className="w-full h-8  hover:bg-[#211e1b] transition-all text-white rounded-md flex gap-2 items-center px-2 cursor-pointer">
        <BsBasket3Fill /> Sepetim
      </Link>
      <span className="w-full h-8 hover:bg-[#211e1b] transition-all text-white  rounded-md flex gap-2 items-center px-2 cursor-pointer">
        <FaMessage /> Satıcı Mesajlarım
      </span>
      <span
        className="w-full h-8 hover:bg-[#211e1b] transition-all text-white rounded-md flex gap-2 items-center px-2 cursor-pointer"
        onClick={() => {
          dispatch(setUserSlicer(null));
          dispatch(setUserBasket(null));
          setId("");
          localStorage.removeItem("user");
        }}
      >
        <IoExit /> Çıkış Yap
      </span>
    </>
  );
};

export default AccountHoverList;
