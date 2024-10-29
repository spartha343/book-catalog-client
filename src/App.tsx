import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useAppDispatch } from "./redux/hooks/hooks";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import {
  clearUser,
  extractUserData,
  setUser
} from "./redux/features/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the Redux state with the user data
        dispatch(setUser(extractUserData(user)));
      } else {
        // User is signed out, clear the user from Redux state
        dispatch(clearUser());
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
