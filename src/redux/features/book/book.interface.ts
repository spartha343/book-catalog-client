import { IReview } from "../review/review.interface";

interface IReadingListItem {
  book: IBook;
  status: "to-read" | "reading" | "finished";
}

export type IUser = {
  _id?: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  password: string;
  role?: string;
  wishlist?: IBook[];
  readingList?: IReadingListItem[];
};

export type IBook = {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  description: string;
  createdBy: string | IUser;
  reviews?: IReview[];
};
