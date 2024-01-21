import { userType } from "@/types";
import { baseUrl } from "../baseURL";

export const registerNewUser = async (u: userType): Promise<userType> => {
  const data = await fetch(`${baseUrl}/api/user`, {
    method: "POST",
    body: JSON.stringify(u),
  });
  const res = await data.json();
  return res.data;
};
