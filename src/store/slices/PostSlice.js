import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Posts, Users } from "../../dummyData";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const getTimelinePost = createAsyncThunk("post/timeline", async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return Posts;
});

export const getProfilePosts = createAsyncThunk("post/profile", async (username) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const user = Users.find((u) => u.username === username);
  if (!user) return [];

  return Posts.filter((post) => post.userId === user.id);
});

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {
      const newPost = {
        id: Date.now(),
        desc: action.payload.desc || "",
        date: "Just now",
        userId: action.payload.userId,
        like: 0,
        comment: 0,
      };
      if (action.payload.photo) {
        newPost.photo = action.payload.photo;
        newPost.mediaType = action.payload.mediaType || "image";
      }
      if (action.payload.taggedPeople?.length) {
        newPost.taggedPeople = action.payload.taggedPeople;
      }
      state.posts.unshift(newPost);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimelinePost.pending, (state) => {
        state.loading = true;
        state.posts = [];
        state.error = null;
      })
      .addCase(getTimelinePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getTimelinePost.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.error.message;
      })
      .addCase(getProfilePosts.pending, (state) => {
        state.loading = true;
        state.posts = [];
        state.error = null;
      })
      .addCase(getProfilePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getProfilePosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.error.message;
      });
  },
});

export const { createPost } = PostSlice.actions;
export default PostSlice.reducer;
