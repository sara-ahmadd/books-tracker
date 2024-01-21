import Image from "next/image";
import Filters from "./components/Filters";
import MainContainer from "./components/MainContainer";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-bold text-xl p-5 relative w-screen min-h-screen">
      <Filters />
      <MainContainer />
      <Link
        href={"/search"}
        title="add newbook to your library"
        className="absolute bottom-0 right-2 w-20 h-20 rounded-full border-2 border-indigo-500 flex justify-center items-center cursor-pointer"
      >
        <FaPlus size={40} color={"#9474fc"} />
      </Link>
    </div>
  );
}
