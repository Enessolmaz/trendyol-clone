import UserFavorite from "@/app/Components/UserFavorite/UserFavorite";
import React from "react";

type IParams = {
  params: {
    id: string;
  };
};

const page = ({ params }: IParams) => {
  return <UserFavorite url={params.id.toString()} />;
};

export default page;
