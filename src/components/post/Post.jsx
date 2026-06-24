import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function Post({ post, user }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  if (!user) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "94%", sm: "94%" },
        mx: "auto",
        mb: 3.75,
        borderRadius: 2.5,
        overflow: "hidden",
        maxWidth: "100%",
        boxSizing: "border-box",
        
      }}
    >
      <Box sx={{ p: 1.25 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0, flex: 1 }}>
            <Avatar
              src={`${PF}${user.profilePicture || "person/Default_Profile_Picture.jpg"}`}
              alt={user.username}
              sx={{ width: 32, height: 32, flexShrink: 0 }}
            />
            <Typography variant="body2" fontWeight={500} noWrap>
              {user.username}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ flexShrink: 0 }}>
              {post.date}
            </Typography>
          </Stack>
          <IconButton size="small" aria-label="post options">
            <MoreVertIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2.5} sx={{ my: 2.5 }}>
          {post.desc && (
            <Typography variant="body2">{post.desc}</Typography>
          )}
          <Box
            component="img"
            src={`${PF}${post.photo}`}
            alt=""
            sx={{
              width: "100%",
              maxHeight: 500,
              objectFit: "contain",
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
          sx={{ minWidth: 0 }}
        >
          <Stack direction="row" alignItems="center" spacing={0.625} sx={{ minWidth: 0 }}>
            <Box
              component="img"
              src={`${PF}like.png`}
              alt="like"
              onClick={likeHandler}
              sx={{ width: 32, height: 32, cursor: "pointer" }}
            />
            <Box
              component="img"
              src={`${PF}heart.png`}
              alt="heart"
              onClick={likeHandler}
              sx={{ width: 32, height: 32, cursor: "pointer" }}
            />
            <Typography variant="body2">{like} people like it</Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              borderBottom: "1px dashed",
              borderColor: "text.secondary",
            }}
          >
            {post.comment} comments
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
