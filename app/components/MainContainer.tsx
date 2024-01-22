"use client";

import React, { useContext, useEffect, useState } from "react";

import { book, userType } from "@/types";
import SearchBar from "./SearchBar";
import { BooksContext } from "../context/BooksContext";
import Column from "./Column";
import { GroupsContext } from "../context/GroupsContext";
import { FilterContext } from "../context/FilterContext";
import { baseUrl } from "@/lib/baseURL";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import { refreshActions } from "../reduxToolkit/slices/refresh/refreshSlice";

export const initArr: book[] = [];
const MainContainer = () => {
  const { books, handleBooks } = useContext(BooksContext);
  const [searchText, setSearchText] = useState("");
  const { groups } = useContext(GroupsContext);
  const { filter } = useContext(FilterContext);
  const currUser = useAppSelector((state) => state.userReducer) as userType;
  const refresh = useAppSelector((state) => state.refreshReducer);
  useEffect(() => {
    if (currUser && currUser.email) {
      fetch(`${baseUrl}/api/user?email=${currUser.email}&q=${searchText}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((result) => {
          if (searchText.length > 0) {
            handleBooks(result.data);
          } else {
            handleBooks(result.data.books);
          }
        });
    }
  }, [searchText, refresh, currUser, currUser.books, handleBooks]);

  return (
    <div className="w-11/12overflow-x-scroll h-500 mx-auto overflow-y-scroll relative  py-4">
      <SearchBar text={searchText} setText={setSearchText} />
      <div className=" w-3/4 mx-auto px-5 absolute left-10  top-20 flex justify-start gap-5 items-center">
        {!currUser.email && (
          <h1 className="font-light text-xl text-center">
            Login or register to add books to your library.
          </h1>
        )}
        {currUser.email && currUser.books?.length == 0 && (
          <h1 className="font-light text-xl text-center">
            No books in your library.
          </h1>
        )}
        {currUser.books &&
          currUser.books?.length > 0 &&
          groups &&
          groups.length > 0 &&
          groups.map((g, ind) => {
            const targettedBooks = books?.filter((b) => {
              if (filter == "Category") {
                if (g) {
                  return b.volumeInfo.categories
                    ?.map((x) => x.toLowerCase())
                    .includes(g?.toLowerCase());
                }
              } else if (filter == "Author") {
                return b.volumeInfo.authors
                  ?.map((x) => x.toLowerCase())
                  .includes(g.toLowerCase());
              } else {
                return b.status?.toLowerCase() === g.toLowerCase();
              }
            });
            if (g) {
              return (
                <Column books={targettedBooks} badge={g} key={`${ind}--${g}`} />
              );
            }
          })}
      </div>
    </div>
  );
};

export default MainContainer;
