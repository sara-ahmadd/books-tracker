export type loginFormType = {
  password: string;
  email: string;
  name: string;
};
export type signupFormType = {
  username: string;
  password: string;
  email: string;
};
export type themeContextInit = {
  theme: boolean;
  handleTheme: () => void;
};
export type book = {
  id?: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    subtitle?: string;
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language?: string;
    publisher?: string;
    publishedDate?: string;
    description?: string;
    categories?: string[];
  };
  saleInfo?: {
    listPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  searchInfo?: {
    textSnippet: string;
  };
  selfLink?: string;
  status?: string;
};
export type BooksArray = book[];
export type userType = {
  id?: string;
  _id?: string;
  email?: string;
  password?: string;
  image?: string;
  name?: string;
  books?: book[];
};
