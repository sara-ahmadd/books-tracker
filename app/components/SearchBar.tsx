"use client";
import React, { ChangeEvent } from "react";

const SearchBar = ({
  text,
  setText,
}: {
  text: string;
  setText: (s: string) => void;
}) => {
  return (
    <form className="absolute top-0 left-10 w-full sm:w-1/4 flex items-center gap-3 p-5 z-20">
      <input
        type="text"
        className={`input input-bordered w-full max-w-xs input-md text-black`}
        placeholder="Search..."
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
