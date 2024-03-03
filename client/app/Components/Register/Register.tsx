"use client";
import React, { useEffect, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "./RegisterMutation";
import { FaSpinner } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [eyeStatus, setEyeStatus] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    gender: "",
  });
  const [userRegister, { loading, error }] = useMutation(ADD_USER);
  const toastSuccess = (msg: any) => toast.success(msg);
  const toastError = (msg: any) => toast.error(msg);

  const navigate = useRouter();

  const registerUser = async (e: any) => {
    e.preventDefault();
    try {
      await userRegister({
        variables: {
          data,
        },
      });
      setData({ email: "", password: "", gender: "" });
      toastSuccess("Kayıt Başarılı")
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
    <div className="border flex flex-col flex-1 gap-4 items-center w-full bg-[#1f1f1f] border-[#404040] absolute left-0 min-h-[570px] py-4">
      <ToastContainer
        position="bottom-center"
        autoClose={350}
        hideProgressBar={true}
        closeOnClick
        theme="dark"
      />
      <div className="flex flex-col items-center px-4">
        <span className="text-lg font-bold ">Merhaba,</span>
        <span className="text-sm">
          Trendyol’a giriş yap veya hesap oluştur, indirimleri kaçırma!
        </span>
      </div>
      <div className="login-card sm:w-[402px] h-full w-[350px]   ">
        <div className="login-active-card flex   items-center justify-center gap-1">
          <Link
            href="/login"
            className="w-full bg-[#252525] h-12 rounded flex items-center justify-center"
          >
            Giriş Yap
          </Link>
          <button className="w-full bg-[#121212] h-[49px] z-50 relative top-[1px] rounded-t-sm text-orange-500 border border-[#404040] border-b-0">
            Kayıt Ol
          </button>
        </div>
        <form
          onSubmit={registerUser}
          className="card w-full min-h-[550px] bg-[#121212] rounded-none border p-8 flex flex-col gap-4 border-[#404040]"
        >
          <span>E Posta</span>
          <input
            name="email"
            minLength={10}
            required
            value={data.email}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            type="email"
            className=" bg-[#242424] rounded-md h-10 px-2  outline-none border-2 border-[#242424] focus:border-orange-500  transition-[500ms] "
          />
          <span>Şifre</span>
          <div className="relative w-full">
            <input
              autoComplete="current-password"
              required
              minLength={7}
              maxLength={64}
              name="password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
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
          <span className="text-xs mb-4">
            Şifreniz en az 7 karakter ve en fazla 64 karakter olmalı, harf ve
            rakam içermelidir.
          </span>

          <label className="text-[#666666]">Cinsiyet (Opsiyonel)</label>
          <div className="flex w-full h-10 items-center justify-between">
            <span
              onClick={() => {
                setGender("Kadın");
                setData({ ...data, gender: "Kadın" });
              }}
              className={`w-full transition-all cursor-pointer h-full flex items-center justify-center text-[#a3a3a3] bg-[#242424] text-center rounded-e-sm border border-[#525252] ${
                gender === "Kadın"
                  ? "border-[#f07841ec] bg-[#000000] text-[#f07841ec]"
                  : ""
              }`}
            >
              Kadın
            </span>
            <span
              onClick={() => {
                setGender("Erkek");
                setData({ ...data, gender: "Erkek" });
              }}
              className={`w-full transition-all cursor-pointer h-full flex items-center justify-center text-[#a3a3a3] bg-[#242424] text-center rounded-e-sm border border-[#525252] ${
                gender === "Erkek"
                  ? "border-[#f07841] bg-[#000000] text-[#f07841]"
                  : ""
              }`}
            >
              Erkek
            </span>
          </div>

          <span className="flex text-xs text-[#666666] gap-4 ">
            <input type="checkbox" name="vehicle1" value="req" required />
            <label>
              {" "}
              Tarafıma avantajlı tekliflerin sunulabilmesi amacıyla kişisel
              verilerimin işlenmesine ve paylaşılmasına açık rıza veriyorum.
            </label>
          </span>
          <span className="flex text-[#666666] text-xs gap-4">
            <input
              type="checkbox"
              name="vehicle1"
              value="req"
              className="transition-all "
              required
            />
            <label>
              {" "}
              Tarafıma elektronik ileti gönderilmesini kabul ediyorum.
            </label>
          </span>
          <span className="flex text-[#666666] text-xs gap-4">
            <input  
              className="bg-red-500 rounded-full"
              type="checkbox"
              name="vehicle1"
              value="req"
              required
            />
            <label>
              {" "}
              Kişisel verilerimin işlenmesine yönelik aydınlatma metnini okudum
              ve anladım.{" "}
            </label>
          </span>

          <button className="bg-[#f27b1a] h-12 text-white rounded-md hover:bg-[#ca6a3d] transition-all flex justify-center items-center">
            {loading ? (
              <FaSpinner className="text-white loading-spinner " size={21} />
            ) : (
              "Kayıt Ol"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
