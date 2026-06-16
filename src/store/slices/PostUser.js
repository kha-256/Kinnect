import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users } from "../../dummyData";

const buildUserMap = (users) =>
  users.reduce((acc, user) => {
    acc[user.id] = {
      username: user.username,
      profilePicture: user.profilePicture,
    };
    return acc;
  }, {});

const initialState = {
  postUser: buildUserMap(Users),
  allUsers: Users,
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk("user/get", async (userId, { getState }) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const registeredUsers = getState().user.registeredUsers;
  const allUsers = [...Users, ...registeredUsers];
  const user = allUsers.find((u) => u.id === userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    _id: user.id,
    username: user.username,
    profilePicture: user.profilePicture,
  };
});

export const getUserByUsername = createAsyncThunk("user/getByUsername", async (username, { getState }) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const registeredUsers = getState().user.registeredUsers;
  const allUsers = [...Users, ...registeredUsers];
  const user = allUsers.find((u) => u.username === username);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    _id: user.id,
    username: user.username,
    profilePicture: user.profilePicture,
    email: user.email,
  };
});

const PostUser = createSlice({
  name: "postUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { _id, ...userData } = action.payload;
        state.postUser[_id] = userData;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        const { _id, ...userData } = action.payload;
        state.postUser[_id] = userData;
      });
  },
});

export default PostUser.reducer;
