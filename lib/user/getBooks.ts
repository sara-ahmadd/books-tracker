import { book, userType } from "@/types";
import { baseUrl } from "../baseURL";

const url = baseUrl;
export const getBooksFromMyLib = async (u: userType): Promise<book[]> => {
  const data = await fetch(`${baseUrl}/api/user?email=${u.email}`);
  const res = await data.json();
  return res.data.books;
};
