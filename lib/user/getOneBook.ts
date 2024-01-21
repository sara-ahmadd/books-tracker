import { book, userType } from "@/types";
import { baseUrl } from "../baseURL";

const url = baseUrl;
export const getOneBook = async (u: userType, id: string): Promise<book> => {
  const data = await fetch(`${baseUrl}/api/user?email=${u.email}`);
  const res = await data.json();
  const bookArr = res.data.books as book[];
  const bookTargetted = bookArr.find((x) => x.id === id) as book;
  return bookTargetted;
};
