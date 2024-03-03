"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Accounts from "./Accounts";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { get_user } from "./graphql/userQuery";
import { setUserBasket, setUserSlicer } from "@/app/redux/user";
import { GET_BASKET } from "../Products/UserQuery";

const Navbar = () => {
  const [id, setId] = useState<string>("");
  const user = useSelector((state: any) => state.user.user);
  const basket = useSelector((state: any) => state.user.basket);

  const dispatch = useDispatch();

  const { loading, error, data: user_data } = useQuery(get_user, {
    variables: {
      id,
    },
  });
  const { data: user_basket, refetch } = useQuery(GET_BASKET, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setId(localUser);
      dispatch(setUserBasket(user_basket?.getUserBasket));
      dispatch(setUserSlicer(user_data?.getUser));
    } else {
      setId("");
    }
  }, [dispatch, user, user_data?.getUser, user_basket?.getUserBasket]);

  return (
    <div className="flex justify-between items-center gap-4  md:gap-16 py-2 relative px-4 ">
      <div className="max-w-40 w-40 ">
        <Link href="/" className="max-w-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Layer_1"
            x="50px"
            y="0px"
            viewBox="0 0 111 45"
          >
            <path
              className="st0"
              d="M39.69,23.74H27.12c0.58,2.36,2.49,4.14,4.98,4.14c1.4,0,2.78-0.6,3.7-1.64l3.04,0.07  c-1.34,2.54-3.89,4.17-6.85,4.17c-4.32,0-7.72-3.75-7.72-7.99c0-4.38,3.34-7.97,7.78-7.97c4.3,0,7.73,3.54,7.73,7.81  C39.77,22.79,39.74,23.29,39.69,23.74L39.69,23.74z M32.01,17.11c-2.46,0-4.74,1.94-4.9,4.44h9.8  C36.76,19.07,34.49,17.11,32.01,17.11z M52.28,30.1v-8.24c0-2.57-0.77-4.74-3.79-4.74c-2.79,0-4,2.16-4,4.72v8.27h-2.84V14.93h2.66  v1.61h0.05c1.1-1.45,2.69-2.03,4.44-2.03c2.16,0,4.19,0.85,5.37,2.71c0.73,1.15,0.96,2.54,0.96,3.89v8.99L52.28,30.1L52.28,30.1z   M70.27,30.1v-2.16h-0.05c-1.26,1.76-3.26,2.54-5.37,2.54c-4.55,0-7.89-3.39-7.89-7.91c0-4.55,3.29-8.06,7.89-8.06  c1.91,0,3.94,0.73,5.15,2.27h0.05V9.83h2.84V30.1H70.27z M65.01,17.11c-3.01,0-5.2,2.46-5.2,5.43c0,2.84,2.28,5.35,5.18,5.35  c2.96,0,5.28-2.41,5.28-5.35C70.27,19.5,68.11,17.11,65.01,17.11z M81.14,35.17h-2.95l2.21-5.37l-6.05-14.87h3.07l4.47,11.78  l4.57-11.78h3.07L81.14,35.17L81.14,35.17z M97.63,30.48c-4.47,0-8.19-3.59-8.19-8.08c0-4.47,3.81-7.89,8.19-7.89  c4.44,0,8.19,3.45,8.19,7.94C105.82,26.78,102.23,30.48,97.63,30.48L97.63,30.48z M97.63,17.11c-2.96,0-5.35,2.41-5.35,5.37  s2.38,5.4,5.35,5.4c2.99,0,5.35-2.46,5.35-5.42C102.97,19.5,100.58,17.11,97.63,17.11z M108.14,30.1V9.83H111V30.1H108.14z   M2.82,27.11c0.12,0.48,0.28,0.88,0.46,1.18c0.18,0.3,0.42,0.56,0.69,0.81c0.9,0.79,2.04,1.19,3.39,1.19c1.34,0,2.59-0.33,3.73-0.96  v-2.73c-1.18,0.69-2.31,1.05-3.37,1.05c-1.44,0-2.19-0.88-2.19-2.62v-7.43h4.78v-2.63H5.56V10.1H2.74v4.86H0v2.63h2.62v6.74  C2.62,25.7,2.69,26.63,2.82,27.11z M20.05,17.47c0.88,0,1.85,0.48,2.88,1.45l1.55-2.57c-1.26-1.15-2.78-1.68-3.67-1.68h-0.2  c-1.02,0-2.73,0-4.11,2.25l-0.05,0.09l0.01-2.04h-2.95v15.04h2.95v-7.86c0-1.26,0.35-2.36,1.06-3.29  C18.23,17.94,19.08,17.47,20.05,17.47z"
            />
          </svg>
        </Link>
      </div>
      <div className="search xl:flex  w-full hidden items-center justify-start relative">
        <input
          type="text"
          className="flex-1 bg-[#242424] rounded-md px-4 p-2 outline-none border-2 border-[#242424] focus:border-orange-500  transition-[500ms] "
          placeholder="Aradığınız, ürün, kategori veya markayı yazınız"
        />
        <span>
          <CiSearch
            size={24}
            className="absolute right-2 bottom-0 top-0 h-full text-[#b54700]    cursor-pointer "
          />
        </span>
      </div>
      <div className="accounts">
        <Accounts basket={basket} loading={loading} user={user} setId={setId} />
      </div>
    </div>
  );
};

export default Navbar;
