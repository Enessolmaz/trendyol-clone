import Link from "next/link";
import React from "react";

const NavigationWrapper = () => {
  const data = [
    {
      id: 1,
      name: "Kadın",
    },
    {
      id: 2,
      name: "Erkek",
    },
    {
      id: 3,
      name: "Anne & Çocuk",
    },
    {
      id: 4,
      name: "Ev & Yaşam ",
    },
    {
      id: 5,
      name: "Süpermarket",
    },
    {
      id: 6,
      name: "Kozmetik",
    },
    {
      id: 7,
      name: "Ayakkabı & Çanta",
    },
    {
      id: 8,
      name: "Elektronik",
    },
    {
      id: 9,
      name: "Spor&Outdoor",
    },
    {
      id: 10,
      name: "Çok Satanlar",
      isNew: true,
    },
    {
      id: 11,
      name: "Flaş Ürünler",
      isNew: true,
    },
  ];

  return (
    <div className="flex justify-between items-center text-sm max-lg:hidden  h-8  px-4">
      {data.map((item) => (
        <Link
          href="/products"
          key={item.id}
          className="flex justify-center hover:text-orange-500 hover:border-b-2  border-[#f27a1a] cursor-pointer transition-color  h-full gap-1"
        >
          {item.name}
          {item.isNew && (
            <span className="bg-[#dc2e2e] flex items-center justify-center rounded-lg text-[10px] w-7 h-5 text-white ">
              Yeni
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavigationWrapper;
