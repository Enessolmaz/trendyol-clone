import Link from "next/link";
import React from "react";

const BannerOffer = () => {
  const dataOffer = [
    {
      id: 30,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1155/pimWidgetApi/mobile_20240202153542_2527400ElektronikMobile202402021801.jpg",
    },
    {
      id: 31,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1157/pimWidgetApi/mobile_20240201202326_2522913EvYasamMobile202402011501.jpg",
    },
    {
      id: 32,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1118/pimWidgetApi/mobile_20240102111002_2402134ErkekMobile20240102130.jpg",
    },
    {
      id: 33,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1155/pimWidgetApi/mobile_20240202142205_Atasun1000150.jpg",
    },
    {
      id: 34,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1156/pimWidgetApi/mobile_20240202100923_2523567ErkekMobile202402011501.jpg",
    },
    {
      id: 35,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1118/pimWidgetApi/mobile_20240102055228_ac2024banner.jpg",
    },
    {
      id: 36,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1118/pimWidgetApi/mobile_20240102111002_2402134ErkekMobile20240102130.jpg",
    },
    {
      id: 37,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1157/pimWidgetApi/mobile_20240201202326_2522913EvYasamMobile202402011501.jpg",
    },
    {
      id: 38,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1157/pimWidgetApi/mobile_20240201202326_2522913EvYasamMobile202402011501.jpg",
    },
    {
      id: 39,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1118/pimWidgetApi/mobile_20240102055228_ac2024banner.jpg",
    },
    {
      id: 40,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1155/pimWidgetApi/mobile_20240202153542_2527400ElektronikMobile202402021801.jpg",
    },
    {
      id: 41,
      imgUrl:
        "https://cdn.dsmcdn.com/ty1118/pimWidgetApi/mobile_20240102111002_2402134ErkekMobile20240102130.jpg",
    },
  ];

  return (
    <div className="flex flex-wrap  gap-4 mb-4">
      {dataOffer.map((item) => (
        <Link
        href="/products"
          className="sm:w-[32%] w-[45%] h-40 bg-slate-900 rounded-md overflow-hidden "
          key={item.id}
        >
          <picture>
            <img src={item.imgUrl} alt="brand" className="bannerOffer-img" />
          </picture>
        </Link>
      ))}
    </div>
  );
};

export default BannerOffer;
