import { book, userType } from "@/types";
import { baseUrl } from "../baseURL";

const url = baseUrl;
export const getBookCategory = async (
  u: userType,
  category: string
): Promise<book[]> => {
  const response = await fetch(`${url}/api/user?email=${u.email}`);
  const res = await response.json();
  const booksArr: book[] = res.data.books;
  const books = booksArr.filter((b) =>
    b.volumeInfo?.categories?.includes(category)
  );
  return books;
};
