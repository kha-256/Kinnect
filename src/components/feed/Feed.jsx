import Share from "../share/Share";
import Post from "../post/Post";
import { getTimelinePost, getProfilePosts } from "../../store/slices/PostSlice";
import { getUser } from "../../store/slices/PostUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function Feed({ username }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const users = useSelector((state) => state.postUser.postUser);
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    if (username) {
      dispatch(getProfilePosts(username));
    } else {
      dispatch(getTimelinePost());
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (posts?.length) {
      posts.forEach((post) => {
        dispatch(getUser(post.userId));
      });
    }
  }, [dispatch, posts]);

  return (
    <Box
      sx={{
        flex: { xs: 1, md: 5.5 },
        minWidth: 0,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Stack spacing={0}>
        <Box sx={{ p: { xs: 1.5, sm: 2.5 } }}>
          <Share />
        </Box>

        {loading && (
          <Typography variant="body2" color="text.secondary" sx={{ px: 2.5, pb: 2 }}>
            Loading posts...
          </Typography>
        )}

        {posts?.map((post) => (
          <Post key={post.id} post={post} user={users[post.userId]} />
        ))}
      </Stack>
    </Box>
  );
}
