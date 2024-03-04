"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItems from "./ProductItems";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredMap, setFilteredMap] = useState([]);
  // multiple
  // const [filterItems, setFilterItems] = useState<any>([]);

  const [filterItems, setFilterItems] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await axios("https://fakestoreapi.com/products").then((item) => {
        setProducts(item.data);
        setFilteredMap(item.data);
      });
      await axios("https://fakestoreapi.com/products/categories").then((item) =>
        setCategories(item.data)
      );
      setLoading(false);
    };
    getData();
  }, []);


  // const addFilterItems = (item: string) => {
  //   if (!filterItems.includes(item)) {
  //     const updatedFilterItems = [...filterItems, item];
  //     setFilterItems(updatedFilterItems);
  //   }
  // };

  const addFilterItems = (item: string) => {
    setFilterItems(item);
    const filteredProducts = products.filter(
      (product: any) => product.category === item
    );
    setFilteredMap(filteredProducts);
  };

  return (
    <div className="mt-2 basketContainer gap-8 md:gap-2">
      <div
        className={`side-filter-bar w-44  ${
          loading ? "opacity-5 transition-all" : "opacity-100 transition-all"
        }`}
      >
        <div className=" sticky top-0 productItems gap-2 md:mt-16">
          <span
            onClick={() => {
              setFilteredMap(products);
              setFilterItems("");
            }}
            className="w-full h-fit hover:text-[#999999] transition-all text-white  rounded-md flex gap-2 items-center px-2  text-sm cursor-pointer"
          >
            İlgili Kategoriler
          </span>
          {categories.map((item: any) => (
            <span
              onClick={() => addFilterItems(item)}
              className="w-full text-xs h-fit hover:text-[#999999] transition-all text-white  rounded-md flex gap-2 items-center px-2 sm:text-sm   cursor-pointer"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full">
        <ProductItems
          products={filteredMap}
          originalData={products}
          setFilteredMap={setFilteredMap}
          filterItems={filterItems}
          setFilterItems={setFilterItems}
        />
      </div>
    </div>
  );
};

export default Products;
