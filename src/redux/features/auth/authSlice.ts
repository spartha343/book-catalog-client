import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../../firebase/firebase.config";
import axios from "axios";
import { signOut as firebaseSignOut, User } from "firebase/auth";
import { IUser } from "../book/book.interface";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: null | object;
  loading: boolean;
  error: string | null;
  initialLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialLoading: true
};

// Helper function to extract serializable user data from Firebase user
export const extractUserData = (user: User): AuthUser => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  };
};

export const emailSignUp = createAsyncThunk(
  "auth/emailSignUp",
  async (
    { email, password, data }: { email: string; password: string; data: IUser },
    { rejectWithValue }
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await axios.post(
        "https://book-catalog-server-zeta-roan.vercel.app/api/v1/user/create-user",
        data,
        {
          withCredentials: true
        }
      );
      return extractUserData(result.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await axios.post(
        "https://book-catalog-server-zeta-roan.vercel.app/api/v1/auth/login",
        { email, password },
        {
          withCredentials: true
        }
      );
      return extractUserData(userCredential.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      // Call server-side to remove the cookie
      await axios.post(
        "https://book-catalog-server-zeta-roan.vercel.app/api/v1/auth/logout",
        null,
        {
          withCredentials: true // Ensure the cookie is sent and removed properly
        }
      );

      await firebaseSignOut(auth); // Sign out from Firebase
      return null; // No user after signing out
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload; // Set user in state
      state.initialLoading = false;
    },
    clearUser: (state) => {
      state.user = null; // Clear user from state
      state.initialLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(emailSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emailSignUp.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(emailSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null; // Reset user after successful sign-out
        state.loading = false;
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
