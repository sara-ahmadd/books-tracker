"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CiFilter } from "react-icons/ci";
import { GroupsContext } from "../context/GroupsContext";
import { FilterContext } from "../context/FilterContext";
import { baseUrl } from "@/lib/baseURL";
import { book } from "@/types";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import { refreshActions } from "../reduxToolkit/slices/refresh/refreshSlice";

const Filters = () => {
  const { theme } = useContext(ThemeContext);
  const [showList, setShowList] = useState(false);
  let groupsArr = ["Status", "Category", "Author"];
  let Status = ["ToRead", "OnProgress", "Done"];
  const [Category, setCategory] = useState([""]);
  const [Author, setAuthor] = useState([""]);
  const { handleGroups } = useContext(GroupsContext);
  const { handleFilter } = useContext(FilterContext);
  const [filter, setFilter] = useState("Status");
  const { data: session } = useSession();
  const refresh = useAppSelector((state) => state.refreshReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user && session.user.email) {
      fetch(`${baseUrl}/api/user?email=${session.user.email}`)
        .then((res) => res.json())
        .then((res) => {
          const books: book[] = res.data.books;
          const categs = books
            .map((x) => x.volumeInfo.categories)
            .flat()
            .filter((c) => c && c.length > 0) as unknown as string[];
          const authors = books
            .map((x) => x.volumeInfo.authors)
            .flat()
            .filter((c) => c && c.length > 0) as unknown as string[];

          const categSet = new Set(categs);
          const categories = Array.from(categSet);

          const authorsSet = new Set(authors);
          const auths = Array.from(authorsSet);

          setCategory(categories);
          setAuthor(auths);
        });
    }
  }, [filter, refresh, session?.user]);

  return (
    <div className="flex justify-between items-center border-b-2 border-indigo-400 pb-3 w-full flex-wrap ">
      <div
        className="flex justify-center items-center gap-5
      "
      >
        <div
          className={`flex justify-center items-center gap-1 font-extralight border-2 border-slate-500 rounded-md p-3 ${
            theme ? "text-white" : "text-black"
          } relative`}
          title="Get specigic books category"
        >
          <button
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-2"
          >
            <p className=" text-base">Filter</p>
            <CiFilter />
          </button>
          {showList ? (
            <div
              className={` bg-slate-50 absolute z-40 top-full mt-2 left-0  rounded-md py-5 min-w-max  flex flex-col justify-center items-start gap-4 ${
                theme ? "text-white" : "text-black"
              } border-2 border-slate-400 bg-slate-50 w-56 max-h-96 px-5 overflow-y-scroll flex flex-col justify-start items-start`}
            >
              {filter === "Status"
                ? Status.map((x) => (
                    <button
                      key={x}
                      className="w-full text-sm font-light flex justify-start items-center btn btn-sm"
                      onClick={() => {
                        setShowList(false);
                        handleGroups([x]);
                      }}
                    >
                      {x}
                    </button>
                  ))
                : filter === "Category"
                ? Category.map((x) => (
                    <button
                      key={x}
                      onClick={() => {
                        setShowList(false);
                        handleGroups([x]);
                      }}
                      className="w-full text-sm font-light flex justify-start items-center btn btn-sm border-b-2 "
                    >
                      {x}
                    </button>
                  ))
                : filter === "Author"
                ? Author.map((x) => (
                    <button
                      key={x}
                      onClick={() => {
                        setShowList(false);
                        handleGroups([x]);
                      }}
                      className="w-full text-sm font-light flex justify-start items-center btn btn-sm border-b-2 "
                    >
                      {x}
                    </button>
                  ))
                : null}
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-lg font-extralight w-fit px-3">
        Grouped By <span>{filter}</span>
      </p>
      <div className="flex justify-between items-center ">
        <div className="flex justify-center gap-3 items-center flex-wrap w-fit ">
          {groupsArr.map((x) => (
            <button
              key={x}
              className={`btn btn-outline ${
                theme ? "text-white" : "text-black"
              } font-normal ${
                filter === x ? "bg-indigo-400 text-white" : undefined
              } w-32`}
              onClick={() => {
                setFilter(x);
                if (x == "Category") {
                  handleFilter("Category");
                  handleGroups(Category);
                } else if (x == "Author") {
                  handleFilter("Author");
                  handleGroups(Author);
                } else {
                  handleFilter("Status");
                  handleGroups(Status);
                }
                dispatch(refreshActions.setRefresh(!refresh));
              }}
              title={`Group books by ${x}`}
            >
              By {x}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
