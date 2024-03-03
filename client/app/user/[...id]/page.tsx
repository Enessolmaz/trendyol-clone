import Profile from "@/app/Components/Profile/Profile";
import React from "react";

type IParams = {
  params: {
    id: string;
  };
};

const page = ({ params }: IParams) => {
  return <Profile params={params.id} />;
};

export default page;
