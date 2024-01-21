"use client";
import { book } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const initBook: book = {
  id: "",
  volumeInfo: {
    title: "",
    authors: [""],
    subtitle: "",
    imageLinks: {
      smallThumbnail: "/vercel.svg",
      thumbnail: "",
    },
    language: "",
    publisher: "",
    publishedDate: "",
    description: "",
    categories: [""],
  },
  saleInfo: {
    listPrice: {
      amount: 0,
      currencyCode: "",
    },
  },
  searchInfo: {
    textSnippet: "",
  },
  selfLink: "",
};
const BookDetails = () => {
  const path = usePathname();
  const [book, setBook] = useState(initBook);
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes${path}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => setBook(res));
  }, [path]);
  return (
    <div className="w-screen h-fit flex flex-wrap justify-center items-start px-5  p-5">
      <div className="w-full sm:w-1/2 h-full">
        <Image
          src={book.volumeInfo.imageLinks?.smallThumbnail ?? "/vercel.svg"}
          width={400}
          height={500}
          alt={`${book.volumeInfo.title ?? "book"}`}
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-3 pt-20 w-full sm:w-1/2">
        <p className="text-lg font-semibold border-b-2 border-indigo-600 pb-3 w-full">
          Title:
          <span className="font-light italic">{`${
            book.volumeInfo.title ?? "book"
          }`}</span>
        </p>
        <div className="text-lg font-semibold border-b-2 border-indigo-600 w-full pb-3">
          Authors:
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {book.volumeInfo.authors?.map((a) => (
              <span key={a} className="font-light italic">
                {a}
              </span>
            ))}
          </div>
        </div>
        <p className="text-lg font-semibold border-b-2 border-indigo-600 w-full pb-3">
          Publishing Date:
          <span className="font-light italic">
            {book.volumeInfo.publishedDate ?? ""}
          </span>
        </p>
        <p className="text-lg font-semibold border-b-2 border-indigo-600 w-full pb-3">
          Publisher:
          <span className="font-light italic">{book.volumeInfo.publisher}</span>
        </p>
      </div>
      <div className="text-lg font-semibold border-b-2 border-indigo-600 w-full pb-3 pt-5 flex flex-col justify-center items-start">
        <span className="text-2xl font-semibold border-b-2 border-indigo-600 p-3">
          Description:
        </span>
        <div className="font-light italic p-5">
          {book.volumeInfo.description}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
