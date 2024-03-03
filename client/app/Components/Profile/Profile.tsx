"use client";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { get_user } from "../Navbar/graphql/userQuery";
import bg from "*bg.svg";

type IParams = {
  params: string;
};

const Profile = ({ params }: IParams) => {
  const { loading, error, data: user_data } = useQuery(get_user, {
    variables: {
      id: params.toString(),
    },
  });

  if (!user_data) return <span>Kullanıcı Bulunamadı</span>;

  return <div className="w-full h-full">{params}</div>;
};

export default Profile;
