import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "./book.interface";
import { IApiResponse } from "../../../interfaces/apiResponse";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-zeta-roan.vercel.app/api/v1",
    credentials: "include"
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<IApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["Books"]
    }),
    getBookById: builder.query<IApiResponse<IBook>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id: id }]
    }),
    addBook: builder.mutation<IApiResponse<IBook>, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook
      }),
      invalidatesTags: ["Books"]
    }),
    updateBook: builder.mutation<IApiResponse<IBook>, Partial<IBook>>({
      query: ({ _id, ...updatedBook }) => ({
        url: `/books/${_id}`,
        method: "PATCH",
        body: updatedBook
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: "Books", id: _id }
      ]
    }),
    deleteBook: builder.mutation<IApiResponse<IBook>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Books", id }]
    })
  })
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
} = booksApi;
