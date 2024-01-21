"use client";
import { book } from "@/types";
import React, { createContext, useState } from "react";
const initBooksArr: book[] = [];
export const initBookContext = {
  books: initBooksArr,
  handleBooks: (b: book[]) => {},
};
export const BooksContext = createContext(initBookContext);
const BooksContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState(initBooksArr);
  const handleBooks = (val: book[]) => {
    setBooks(val);
  };
  return (
    <BooksContext.Provider value={{ books, handleBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
