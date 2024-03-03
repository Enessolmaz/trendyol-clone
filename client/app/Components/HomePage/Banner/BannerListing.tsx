import React from "react";

const BannerListing = () => {
  const data = [
    {
      id: 1,
      name: "Sepete En Çok Eklenenler",
      specialClass: "text-green-500 bg-[#effcf2]",
    },
    {
      id: 2,
      name: "En Çok Öne Çıkanlar",
      specialClass: "text-orange-500 bg-[#fbf4ef]",
    },
    {
      id: 3,
      name: "Flaş Ürünler",
      specialClass: "text-purple-500 bg-[#fef0f2]",
    },
  ];

  return (
    <div className="basketContainer gap-4  sm:px-0 justify-between mt-4 sm:mt-0 ">
      {data.map((item) => (
        <span
          className={
            item.specialClass +
            " w-full h-16 rounded-xl flex items-center justify-center font-extrabold cursor-pointer "
          }
          key={item.id}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default BannerListing;
