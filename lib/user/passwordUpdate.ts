import { book, userType } from "@/types";
import { baseUrl } from "../baseURL";
import { genSalt, hash } from "bcrypt-ts";

const url = baseUrl;
export const updatePassword = async (
  email: string,
  newPassWord: string
): Promise<userType> => {
  // find user
  const u = await fetch(`${baseUrl}/api/user?email=${email}`);
  const response = await u.json();

  if (!response.data) throw new Error("User is not found");
  const user = response.data;
  const salt = await genSalt(10);
  const hashedNewPassWord = await hash(newPassWord, salt);
  const data = await fetch(`${baseUrl}/api/user`, {
    method: "PUT",
    body: JSON.stringify({ ...user, password: hashedNewPassWord }),
  });
  const res = await data.json();
  return res.data;
};
