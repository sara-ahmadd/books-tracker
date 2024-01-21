"use client";
import { book } from "@/types";
import React, { useContext } from "react";
import BookCard from "./BookCard";
import { ThemeContext } from "../context/ThemeContext";

const Column = ({ books, badge }: { books: book[]; badge: string }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="h-fit flex flex-col justify-start items-center ">
      <h1 className="p-3 w-fit h-10 flex justify-center items-center rounded-full bg-indigo-500 text-center font-light text-sm">
        {badge}
      </h1>
      <div
        className={` flex flex-col overflow-y-scroll gap-2 items-start w-fit  h-96 ${
          theme ? "text-white" : "text-black"
        } py-5 px-3`}
      >
        {books?.length > 0 ? (
          books.map((x, index) => <BookCard item={x} key={index} page="home" />)
        ) : (
          <h1 className="font-light text-xl text-center pr-5">
            No books display...
          </h1>
        )}
      </div>
    </div>
  );
};

export default Column;
