"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Loading from "./Skeleton";
import Link from "next/link";

type IText = {
  text: string;
};

const WidgetContainer = ({ text }: IText) => {
  const [store, setStore] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const [perView, setPerView] = useState(2);

  useEffect(() => {
    const getStoreFromApi = async () => {
      try {
        await axios("https://fakestoreapi.com/products").then((item) => {
          setStore(item.data.slice(0, 10));
        });
        setSkeleton(false);
      } catch (error) {
        console.log(error);
        setSkeleton(true);
      }
    };
    getStoreFromApi();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setPerView(5);
      } else {
        setPerView(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-[#211e1b] h-[453px] rounded-md  flex flex-col p-6  gap-4 border  border-[#414141] ">
      <div className="flex justify-between">
        <span className="text-lg font-bold">{text}</span>
        <span className="text-sm">Tüm Ürünler!</span>
      </div>

      <div className="flex w-full gap-6 h-full ">
        {skeleton ? (
          <Loading />
        ) : (
          <Swiper
            spaceBetween={5}
            slidesPerView={perView}
            className=" h-full  overflow-clip  relative "
          >
            {store.map((item: any) => (
              <SwiperSlide className="" key={item.id}>
                <Link
                  href="/products"
                  className={`w-full h-full flex flex-col items-center bg-[#121212] border rounded-md border-[#414141] p-6  cursor-pointer gap-2 `}
                >
                  <picture>
                    <img
                      src={item.image}
                      alt="asd"
                      className="w-[172px] h-44 sm:h-52 rounded"
                    />
                  </picture>
                  <span className="description text-xs text-gray-500 w-full h-full    ">
                    <span className="font-bold text-white ">
                      {item.category.toUpperCase()}
                    </span>
                    &nbsp;
                    {item.title.slice(0, 55)}
                  </span>
                  <div className="price absolute bottom-0 text-[#f27a1a] text-sm w-full px-6 ">
                    <span className="flex items-center justify-between mb-2">
                      <span className="font-bold">
                        ${Math.floor(item.price)}
                      </span>
                      {item.id % 2 === 0 ? (
                        <span className="bg-[#2b2124] text-[9px] w-fit   flex items-center px-2 rounded-sm text-white font-light">
                          <picture>
                            <img
                              alt="logo"
                              src="https://cdn.dsmcdn.com/web/production/campaign-coupon-icon.svg"
                            />
                          </picture>
                          Kupon Fırsatı
                        </span>
                      ) : (
                        <span className="bg-[#26201a] text-[9px]  w-fit   flex items-center px-2 rounded-sm text-white font-light">
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
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default WidgetContainer;
