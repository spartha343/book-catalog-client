import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import AllBooks from "../pages/allBooks/AllBooks";
import SignIn from "../pages/authentication/signIn/SignIn";
import SignUp from "../pages/authentication/signUp/SignUp";
import AddNewBook from "../pages/addNewBook/AddNewBook";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";
import BookDetails from "../pages/bookDetails/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/all-books",
        element: <AllBooks />
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />
      },
      {
        path: "/add-new-book",
        element: (
          <ProtectedRoute>
            <AddNewBook />
          </ProtectedRoute>
        )
      },
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
