"use client";
import { signupFormType } from "@/types";
import Link from "next/link";
import React, { useContext, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ThemeContext } from "../context/ThemeContext";
import { registerNewUser } from "@/lib/user/signUp";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<signupFormType>();
  const onSubmit: SubmitHandler<signupFormType> = async (data) => {
    console.log(data);
    await registerNewUser({
      name: data.username,
      password: data.password,
      email: data.email,
    })
      .then((res) => {
        toast.success("New User Is Created Successfully.");
        router.push("/login");
      })
      .catch((error) => toast.error(error));
    reset();
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${
              theme ? "dark" : "light"
            }`}
          >
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className={`block text-sm font-medium leading-6 ${
                  theme ? "dark" : "light"
                }`}
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  required
                  className={`p-5 block w-full rounded-md border-0 py-1.5 ${
                    theme ? "dark" : "light"
                  } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium leading-6 ${
                  theme ? "dark" : "light"
                }`}
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  required
                  className={`p-5 block w-full rounded-md border-0 py-1.5 ${
                    theme ? "dark" : "light"
                  } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium leading-6 ${
                    theme ? "dark" : "light"
                  }`}
                >
                  Password
                </label>
              </div>
              <div className="mt-2 flex justify-center items-center gap-5">
                <input
                  id="password"
                  {...register("password")}
                  type={show ? "text" : "password"}
                  required
                  className={`p-5 block w-full rounded-md border-0 py-1.5 ${
                    theme ? "dark" : "light"
                  } after:shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? <IoIosEye /> : <IoIosEyeOff />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login to your account
            </Link>
          </p>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default SignUp;
