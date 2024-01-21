"use client";
import { loginFormType } from "@/types";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ThemeContext } from "../context/ThemeContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../reduxToolkit/hooks";
import { userActions } from "../reduxToolkit/slices/user/userSlice";
const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { register, handleSubmit } = useForm<loginFormType>({
    defaultValues: { email: "", password: "", name: "" },
  });
  const onSubmit: SubmitHandler<loginFormType> = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        dispatch(userActions.setUser({ ...data }));
        router.push("/");
      } else {
        alert(res?.error);
      }
    });
  };
  return (
    <div className={`${theme ? "dark" : "light"}`}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${
              theme ? "dark" : "light"
            }`}
          >
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium leading-6 ${
                  theme ? "dark" : "light"
                }`}
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name")}
                  type="name"
                  autoComplete="name"
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
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 flex justify-center items-center gap-5">
                <input
                  id="password"
                  {...register("password")}
                  type={show ? "text" : "password"}
                  required
                  className={`p-5 block w-full rounded-md border-0 py-1.5 ${
                    theme ? "dark" : "light"
                  } shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              href="/registration"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
