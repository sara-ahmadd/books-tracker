"use client";
import { book } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaPlus } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import { updateBookStatus, updateMyLib } from "@/lib/user/updateLibrary";
import { getOneBook } from "@/lib/user/getOneBook";

import { IoIosArrowDown } from "react-icons/io";
import { refreshActions } from "../reduxToolkit/slices/refresh/refreshSlice";
import { userActions } from "../reduxToolkit/slices/user/userSlice";

const BookCard = ({ item, page }: { item: book; page: string }) => {
  const { theme } = useContext(ThemeContext);
  const [showList, setShowList] = useState(false);
  const currUser = useAppSelector((state) => state.userReducer);
  const refresh = useAppSelector((state) => state.refreshReducer);
  const dispatch = useAppDispatch();
  const readingStates = ["ToRead", "OnProgress", "Done"];
  return (
    <div
      className={`border-2 min-h-96 w-52 ${
        theme ? "border-slate-50" : "border-indigo-400"
      } rounded-md p-2  flex flex-col justify-between items-center`}
    >
      <Image
        src={item.volumeInfo?.imageLinks?.smallThumbnail ?? `/vercel.svg`}
        width={200}
        height={200}
        alt={item.volumeInfo.title ?? "bookImg"}
      />

      <Link
        className={`min-w-fit h-14 flex flex-col justify-center items-start`}
        href={`/${item.id}`}
        target="_blank"
      >
        <p className="w-full font-light text-sm text-center break-words">
          {item.volumeInfo.title ?? "title"}
        </p>
        <p className="w-full font-semibold text-xs text-center italic break-words">
          {item.volumeInfo?.subtitle == undefined
            ? ""
            : item.volumeInfo?.subtitle?.length > 30
            ? item?.volumeInfo?.subtitle.slice(0, 30) + "..."
            : item.volumeInfo.subtitle}
        </p>
      </Link>

      {page == "search" ? (
        <>
          <button
            className="btn btn-sm btn-primary"
            onClick={async () => {
              const { id, volumeInfo, saleInfo, searchInfo, selfLink } = item;
              if (!currUser.email) {
                toast.error("Login or register to add books to your library.");
                return;
              }
              const checkbook = await getOneBook(currUser, id as string);
              if (
                checkbook &&
                checkbook.volumeInfo.title === volumeInfo.title
              ) {
                toast.error("Book is already in your library.");
              } else {
                if (currUser?.books && currUser.books.length >= 0) {
                  //update library in the database
                  await updateMyLib(currUser, {
                    id,
                    volumeInfo,
                    saleInfo,
                    searchInfo,
                    selfLink,
                    status: "ToRead", //default status 'ToRead'
                  }).then((res) => {
                    if (res) {
                      //update library in the global state
                      dispatch(
                        userActions.setUser({ ...currUser, books: res })
                      );
                    }
                    toast.success("Book is added to your library.");
                  });
                }
              }
            }}
          >
            <FaPlus size={20} color={"#fff"} />
          </button>
          <Toaster />
        </>
      ) : (
        <div className="relative w-10 h-10 rounded-full bg-slate-50 flex justify-center items-center ">
          <button
            className="cursor-pointer"
            onClick={() => setShowList(!showList)}
          >
            <IoIosArrowDown size={30} color={"#7055fa"} />
          </button>
          {showList && (
            <>
              {/* Drop down list containing the states of reading */}
              <div className="bg-slate-50 w-44 rounded-md h-fit flex flex-col justify-start items-start absolute top-full -left-14 gap-1 p-1">
                {readingStates?.map((state) => (
                  <button
                    key={state}
                    className="w-full flex justify-start items-center  px-2 text-black font-mono font-light text-base hover:bg-slate-400 rounded-md h-8 transition-all"
                    onClick={async () => {
                      await updateBookStatus(
                        currUser,
                        item.id as string,
                        state
                      ).then(() => {
                        dispatch(refreshActions.setRefresh(!refresh));
                        setShowList(false);
                      });
                    }}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
