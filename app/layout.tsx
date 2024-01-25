import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Parent from "./components/Parent";
import ThemeContextProvider from "./context/ThemeContext";
import BooksContextProvider from "./context/BooksContext";
import GroupsContextProvider from "./context/GroupsContext";
import FilterContextProvider from "./context/FilterContext";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Books Tracking App",
  description: "Books tracking application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <ThemeContextProvider>
              <BooksContextProvider>
                <GroupsContextProvider>
                  <FilterContextProvider>
                    <Parent>
                      <Navbar />
                      {children}
                    </Parent>
                  </FilterContextProvider>
                </GroupsContextProvider>
              </BooksContextProvider>
            </ThemeContextProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
