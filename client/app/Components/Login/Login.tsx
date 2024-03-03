"use client";
import React, { useEffect, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./LoginMutation";
import { FaSpinner } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { PiWarningCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlicer } from "@/app/redux/user";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [eyeStatus, setEyeStatus] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [userLogin, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const toastSuccess = (msg: any) => toast.success(msg);
  const toastError = (msg: any) => toast.error(msg);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: GetData } = await userLogin({
        variables: {
          data,
        },
      });
      const localUser: any = {
        id: GetData.userLogin.id,
      };
      dispatch(setUserSlicer(GetData));
      localStorage.setItem("user", localUser.id);
      toastSuccess("Giriş Başarılı");
      navigate.push("/");
      setData({
        email: "",
        password: "",
      });
    } catch (error : any) {
      toastError(error.message);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate.push("/");
    }
  });

  return (
    <div className="border flex flex-col flex-1 gap-4 items-center w-full bg-[#1f1f1f] border-[#404040] absolute left-0 h-[600px] py-4">
      <ToastContainer
        position="bottom-center"
        autoClose={350}
        hideProgressBar={true}
        closeOnClick
        theme="dark"
      />
      <div className="flex flex-col items-center px-4">
        <span className="text-lg font-bold textc">Merhaba,</span>
        <span className="text-sm">
          Trendyol’a giriş yap veya hesap oluştur, indirimleri kaçırma!
        </span>
      </div>
      <div className="login-card sm:w-[402px] h-full w-[350px] ">
        <div className="login-active-card flex  items-center justify-center gap-1">
          <button className="w-full bg-[#121212] h-[49px] z-50 relative top-[1px]   rounded-t-sm text-orange-500 border border-[#404040] border-b-0">
            Giriş Yap
          </button>
          <Link
            href="/register"
            className="w-full bg-[#252525] h-12 rounded flex items-center justify-center"
          >
            Kayıt Ol
          </Link>
        </div>
        <form
          onSubmit={(e) => loginHandler(e)}
          className="card w-full h-[400px] bg-[#121212] rounded-none border p-8 flex flex-col gap-4 border-[#404040]"
        >
          {error ? (
            <div className="bg-[#271f21] text-[#ab3d31] h-12 text-sm rounded flex items-center justify-center">
              <PiWarningCircleBold size={18} fill="#ab3d31" /> &nbsp; E-posta
              adresiniz ve/veya şifreniz hatalı.
            </div>
          ) : (
            ""
          )}
          <span>E Posta</span>
          <input
            value={data.email}
            name="email"
            type="email"
            minLength={12}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            required
            className=" bg-[#242424] rounded-md h-10 px-2  outline-none border-2 border-[#242424] focus:border-orange-500  transition-[500ms] "
          />
          <span>Şifre</span>
          <div className="relative w-full">
            <input
              minLength={7}
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              required
              name="password"
              autoComplete="current-password"
              type={eyeStatus ? "text" : "password"}
              className=" bg-[#242424] w-full rounded-md h-10 px-2  outline-none border-2 border-[#242424] focus:border-orange-500  transition-[500ms] "
            />
            <span
              onClick={() => setEyeStatus(!eyeStatus)}
              className="absolute  bottom-3 items-center right-3 cursor-pointer"
            >
              {eyeStatus ? (
                <FaRegEye size={16} />
              ) : (
                <RiEyeCloseLine size={16} />
              )}
            </span>
          </div>
          <button className="bg-[#f27b1a] h-12 rounded-md text-white hover:bg-[#ca6a3d] transition-all flex justify-center items-center">
            {loading ? (
              <FaSpinner className="text-white loading-spinner " size={21} />
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
