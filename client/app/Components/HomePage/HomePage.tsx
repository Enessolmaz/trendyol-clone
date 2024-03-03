"use client";
import React from "react";
import SwiperSlick from "./Swiper/Swiper-Slick";
import BannerListing from "./Banner/BannerListing";
import WidgetContainer from "../Widgetcontainer/WidgetContainer";
import BannerOffer from "./BannerOffer/BannerOffer";
import Footer from "../Footer/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 px-2 ">
      <SwiperSlick />
      <BannerListing />
      <WidgetContainer />
      <BannerOffer />
      <Footer/>
    </div>
  );
};

export default HomePage;
