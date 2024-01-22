import { connectDB } from "@/database/connectdb";
import BookModel from "@/models/books";
import User from "@/models/users";
import { book, userType } from "@/types";
import { compare } from "bcrypt-ts";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credintials",
      credentials: {
        name: {
          label: "UserName",
          type: "text",
          placeholder: "Your user name",
        },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email", placeholder: "Your Email" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email or password is missing.");
        }
        await connectDB();
        const user = (await User.findOne({
          email: credentials.email,
        })) as userType;

        if (!user) {
          throw new Error(`User is not found...`);
        }
        const matchPassword = await compare(
          credentials.password,
          user.password as string
        );
        if (!matchPassword) {
          throw new Error("password is not correct");
        }
        return { ...user, id: user.email };
      },
    }),
  ],

  pages: {
    newUser: "/registration",
    signIn: "/login",
  },
};
