import { connectDB } from "@/database/connectdb";
import BookModel from "@/models/books";
import User from "@/models/users";
import { book, userType } from "@/types";
import { genSalt, hash } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  await connectDB();
  try {
    if (searchParams.has("email")) {
      const userEmail = searchParams.get("email") as string;
      if (userEmail.length > 0) {
        const user = (await User.findOne({ email: userEmail })) as userType;
        if (searchParams.has("q")) {
          const q = searchParams.get("q") as string;
          if (q.length > 0) {
            const booksArr = user?.books?.filter((x) =>
              x.volumeInfo.title
                .toLowerCase()
                .includes(q?.toLowerCase() as string)
            ) as book[];
            return NextResponse.json({
              data: booksArr,
              msg: "books of the user fetched successfully",
            });
          }
        }
        return NextResponse.json({ data: user, msg: "user fetched " });
      }
      return NextResponse.json({ msg: "enter user email " });
    }
  } catch (error) {
    throw new Error("Error in fetching user data from DB.");
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, password, name, books = [] } = body;
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  await connectDB();
  if (!email || !password) {
    return new NextResponse("Missing data", { status: 400 });
  }
  const check = await User.findOne({ email: email });
  if (check) {
    return new NextResponse("User already exists", { status: 400 });
  }
  const user: userType = await User.create({
    email,
    password: hashedPassword,
    name,
    books,
  });
  return NextResponse.json({ data: user, msg: "user added" });
}
export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, password, username, books } = body;
  await connectDB();
  const user = (await User.findOneAndUpdate(
    { email: email },
    { email, password, username, books }
  )) as userType;
  return NextResponse.json({ data: user, msg: "user updated" });
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const userEmail = searchParams.get("email");
  if (userEmail) {
    await connectDB();
    const user = (await User.findOneAndDelete({
      email: userEmail,
    })) as userType;

    return NextResponse.json({ data: user, msg: "user deleted" });
  } else {
    throw new Error("Provide the id of the user to be deleted.");
  }
}
