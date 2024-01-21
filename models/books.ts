import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  id: String,
  volumeInfo: {
    title: String,
    authors: [String],
    subtitle: String,
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String,
    },
    language: String,
    publisher: String,
    publishedDate: String,
    description: String,
    categories: [String],
  },
  saleInfo: {
    listPrice: {
      amount: Number,
      currencyCode: String,
    },
  },
  searchInfo: {
    textSnippet: String,
  },
  selfLink: String,
  status: {
    type: String,
    default: "toRead",
  },
});
const BookModel = models.BookModel || model("BookModel", BookSchema);
export default BookModel;
