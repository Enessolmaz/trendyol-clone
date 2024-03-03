"use client";
import React, { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { data } from "./Swiperdata";
import Link from "next/link";

const SwiperSlick = () => {

  const [swiperItem, setSwiperItem] = useState("");

  return (
    <div className="sm:flex hidden">
      <Swiper spaceBetween={5} slidesPerView={10.5} className={`mt-2 abcdef `}>
        {data.map((item) => (
          <SwiperSlide
            key={item.id}
            className="text-center text-sm cursor-pointer   "
          >
            <Link href="/products" className="flex flex-col items-center">
              <picture>
                <img
                  src={item.img}
                  alt="Landscape picture"
                  width={200}
                  className="mt-3 w-[66px] rounded-full border"
                />
              </picture>
              <span className=" h-12"> {item.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlick;
