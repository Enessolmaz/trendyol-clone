import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-center  p-2 sticky h-fit bottom-0 bg-opacity-50 backdrop-blur-xl  ">
      <Link target="_blank" href="https://github.com/Enessolmaz">
        <FaGithub
          className="fill-orange-500 transition-all cursor-pointer animate-bounce blur-none  z-10"
          size={24}
        />{" "}
      </Link>
    </div>
  );
};

export default Footer;
