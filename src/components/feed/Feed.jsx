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
        display: "flex",
        flex: username ? { xs: 1, md: 5.5 } : 1,
        minWidth: 0,
        pb: 4,
        boxSizing: "border-box",
        border: "1px solid red",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          spacing={0}
          sx={{
            width: "100%",
            maxWidth: 680,
            mx: "auto",
            p: { xs: 1.5, sm: 2.5 },
            boxSizing: "border-box",
          }}
        >
          <Share />

          {loading && (
            <Typography variant="body2" color="text.secondary" sx={{ pb: 2 }}>
              Loading posts...
            </Typography>
          )}

          {posts?.map((post) => (
            <Post key={post.id} post={post} user={users[post.userId]} />
          ))}
        </Stack>
      </Box>

      {!username && (
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            flex: "0 0 300px",
            p: 2.5,
            boxSizing: "border-box",
          }}
        >
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Box component="img" src="assets/gift.png" alt="" sx={{ width: 40, height: 40 }} />
              <Typography variant="body2" fontWeight={300}>
                <Box component="span" fontWeight={700}>
                  Rameesha Khan
                </Box>{" "}
                and{" "}
                <Box component="span" fontWeight={700}>
                  2 others
                </Box>{" "}
                have birthday today.
              </Typography>
            </Stack>

            <Box
              component="img"
              src="assets/ad.png"
              alt=""
              sx={{ width: "100%", borderRadius: 2.5 }}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
}
