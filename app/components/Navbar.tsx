"use client";
import Image from "next/image";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { FiSun } from "react-icons/fi";
import { LuMoon } from "react-icons/lu";
import { ThemeContext } from "../context/ThemeContext";

import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import { signOut, useSession } from "next-auth/react";
import { baseUrl } from "@/lib/baseURL";
import { userActions } from "../reduxToolkit/slices/user/userSlice";
const Navbar = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session?.user && session.user.email) {
      fetch(`${baseUrl}/api/user?email=${session.user.email}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(userActions.setUser(res.data));
        });
    }
  }, [session?.user, dispatch]);

  return (
    <nav className=" w-11/12 px-5 py-3 flex justify-center gap-5 items-center flex-wrap">
      {/* logo */}
      <div className=" w-72 flex justify-center">
        <Link href={"/"}>
          <Image src={"logo.svg"} alt="logo" width={100} height={100} />
        </Link>
      </div>
      {/* theme */}
      <div className="flex gap-5 w-9">
        <button
          className={`btn btn-outline font-bold text-lg btn-sm ${
            theme ? "dark" : "light"
          }`}
          onClick={handleTheme}
        >
          {theme ? <FiSun /> : <LuMoon />}
        </button>
      </div>
      {/* profile */}
      <div className="flex gap-4 items-center">
        {session?.user && session.user.email ? (
          <>
            <div className=" text-2xl text-slate-400">
              <FaUserLarge />
            </div>
            <p className="font-semi-bold text-lg">Hi, {session.user.name}</p>
            <button
              className={`btn btn-outline ${
                theme ? "text-white" : "text-black"
              } font-normal w-32`}
              onClick={() => {
                signOut();
                dispatch(userActions.setUser({}));
              }}
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/registration"}>SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
