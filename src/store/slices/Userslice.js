import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users } from "../../dummyData";

const initialState = {
  user: null,
  token: null,
  registeredUsers: [],
  loading: false,
  error: null,
};

const findUserByCredentials = (email, password, registeredUsers) => {
  const allUsers = [...Users, ...registeredUsers];
  return allUsers.find((u) => u.email === email && u.password === password);
};

const toAuthUser = (user) => ({
  _id: user.id,
  username: user.username,
  email: user.email,
  profilePicture: user.profilePicture,
});

export const userLogin = createAsyncThunk("user/login", async (body, { getState }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { email, password } = body;
  const found = findUserByCredentials(email, password, getState().user.registeredUsers);

  if (!found) {
    throw new Error("Invalid credentials");
  }

  return {
    user: toAuthUser(found),
    token: `mock-token-${found.id}`,
  };
});

export const userSignUp = createAsyncThunk("user/signup", async (body, { getState }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { userName, email, password } = body;
  const allUsers = [...Users, ...getState().user.registeredUsers];

  if (allUsers.some((u) => u.email === email)) {
    throw new Error("Email already exists");
  }

  return {
    id: Date.now(),
    username: userName,
    email,
    password,
    profilePicture: "person/1.jpeg",
  };
});

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    hydrateAuth: (state) => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        state.user = JSON.parse(storedUser);
        state.token = JSON.parse(storedToken);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.error = null;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredUsers.push(action.payload);
        state.error = null;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      });
  },
});

export const { hydrateAuth, logout } = UserSlice.actions;
export default UserSlice.reducer;
