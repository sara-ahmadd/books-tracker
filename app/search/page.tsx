"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeContext } from "../context/ThemeContext";
import { initArr } from "../components/MainContainer";
import BookCard from "../components/BookCard";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initArr);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=${process.env.API_KEY_GOOGLE}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.items);
      });
  }, [searchText]);

  return (
    <div className="w-screen min-h-screen">
      <form className=" w-full px-2 flex items-center gap-3">
        <input
          type="text"
          className={`input input-bordered w-full input-md text-black`}
          placeholder="Search..."
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
        />
      </form>
      <div
        className={`  flex gap-2 justify-center items-start w-fit flex-wrap  ${
          theme ? "text-white" : "text-black"
        } p-3`}
      >
        {data?.length > 0 ? (
          data.map((x, index) => (
            <div key={index}>
              <BookCard item={x} page="search" />
            </div>
          ))
        ) : (
          <h1 className="font-light text-xl">No books to display...</h1>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
