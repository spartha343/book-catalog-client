import { IBook, IUser } from "../book/book.interface";

export type IReview = {
  _id?: string;
  book: string | IBook;
  content: string;
  rating?: string;
  createdBy: string | IUser;
};
