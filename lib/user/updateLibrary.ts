import { book, userType } from "@/types";
import { baseUrl } from "../baseURL";
import { getBooksFromMyLib } from "./getBooks";

const url = baseUrl;
export const updateMyLib = async (
  u: userType,
  newBook?: book
): Promise<book[]> => {
  const getLibrary = await getBooksFromMyLib(u);
  const data = await fetch(`${url}/api/user`, {
    method: "PUT",
    body: JSON.stringify({ ...u, books: [...getLibrary, newBook] }),
  });
  const res = await data.json();
  return res.data.books;
};

export const updateBookStatus = async (
  u: userType,
  id: string,
  state: string
) => {
  const getLibrary = await getBooksFromMyLib(u);
  const targetBook = getLibrary.find((b) => b.id === id);
  if (targetBook) {
    const updatedBook = { ...targetBook, status: state };
    const getBookIndex = getLibrary.findIndex((b) => b.id === id);
    getLibrary.splice(getBookIndex, 1, updatedBook);

    const data = await fetch(`${url}/api/user`, {
      method: "PUT",
      body: JSON.stringify({ ...u, books: getLibrary }),
    });
    const res = await data.json();
    return res.data.books;
  }
};
