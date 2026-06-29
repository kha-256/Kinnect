import { useRef, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { createPost } from "../../store/slices/PostSlice";
import CreatePostModal from "./CreatePostModal";

export default function Share() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const firstName = currentUser?.username?.split(" ")[0] || "";

  const openModal = () => setModalOpen(true);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setMediaFile(file);
    setMediaPreview(preview);
    setModalOpen(true);
    e.target.value = "";
  };

  const handleModalClose = () => {
    if (mediaPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(mediaPreview);
    }
    setModalOpen(false);
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handlePost = ({ desc, preview, mediaType, taggedPeople }) => {
    dispatch(
      createPost({
        desc,
        photo: preview,
        mediaType,
        userId: currentUser?._id,
        taggedPeople,
      })
    );
    setMediaFile(null);
    setMediaPreview(null);
    setModalOpen(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: 2.5,
          border: "1px solid",
          borderColor: "grey.300",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{ p: 1.25 }}
        >
          <Avatar
            src={`${PF}${currentUser?.profilePicture || "person/1.jpeg"}`}
            alt={currentUser?.username || "user"}
            sx={{ width: 40, height: 40, flexShrink: 0 }}
          />

          <Box
            onClick={openModal}
            sx={{
              flex: 1,
              minWidth: 0,
              bgcolor: "grey.100",
              borderRadius: 999,
              px: 2,
              py: 1.1,
              cursor: "pointer",
              transition: "background-color 0.15s",
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ fontSize: 15, fontWeight: 400 }}
            >
              {`What's on your mind, ${firstName}?`}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={0.25} sx={{ flexShrink: 0 }}>
            <IconButton
              size="small"
              aria-label="Live video"
              onClick={() => videoInputRef.current?.click()}
              sx={{ color: "#f3425f" }}
            >
              <VideocamIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Photo or video"
              onClick={() => fileInputRef.current?.click()}
              sx={{ color: "#45bd62" }}
            >
              <PhotoLibraryIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Feeling or activity"
              onClick={openModal}
              sx={{ color: "#f7b928" }}
            >
              <EmojiEmotionsIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        hidden
        onChange={handleFileSelect}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={handleFileSelect}
      />

      <CreatePostModal
        open={modalOpen}
        onClose={handleModalClose}
        currentUser={currentUser}
        mediaFile={mediaFile}
        mediaPreview={mediaPreview}
        onPost={handlePost}
      />
    </>
  );
}
