import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { booksApi } from "./features/book/bookApi";
import { reviewApi } from "./features/review/reviewApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(reviewApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
