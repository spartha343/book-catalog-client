import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApiResponse } from "../../../interfaces/apiResponse";
import { IReview } from "./review.interface";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-zeta-roan.vercel.app/api/v1/reviews",
    credentials: "include"
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    addReview: builder.mutation<IApiResponse<IReview>, Partial<IReview>>({
      query: (review) => ({
        url: "/",
        method: "POST",
        body: review
      }),
      invalidatesTags: ["Review"]
    }),
    getReviewsByBookId: builder.query<IApiResponse<IReview[]>, string>({
      query: (bookId) => `/${bookId}`,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Review" as const,
                id: _id
              })),
              "Review"
            ]
          : ["Review"]
    }),
    updateReview: builder.mutation<
      IApiResponse<IReview>,
      { reviewId: string; data: Partial<IReview> }
    >({
      query: ({ reviewId, data }) => ({
        url: `/${reviewId}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (_result, _error, { reviewId }) => [
        { type: "Review", id: reviewId }
      ]
    }),
    deleteReview: builder.mutation<IApiResponse<IReview>, string>({
      query: (reviewId) => ({
        url: `/${reviewId}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result, _error, reviewId) => [
        { type: "Review", id: reviewId }
      ]
    })
  })
});

export const {
  useAddReviewMutation,
  useGetReviewsByBookIdQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} = reviewApi;
