import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PeopleIcon from "@mui/icons-material/People";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import TagPeopleModal, { formatTaggedStatus } from "./TagPeopleModal";

const commonEmojis = ["😀", "😂", "😍", "🥰", "😊", "👍", "🎉", "❤️", "🔥", "✨", "😎", "🙏"];

const addPostOptions = [
  { icon: <PermMediaIcon sx={{ color: "#45bd62", fontSize: 24 }} />, label: "Photo/video", action: "media" },
  { icon: <PersonAddAlt1Icon sx={{ color: "#1877f2", fontSize: 24 }} />, label: "Tag people", action: "tag" },
  { icon: <EmojiEmotionsIcon sx={{ color: "#f7b928", fontSize: 24 }} />, label: "Feeling", action: "emoji" },
  { icon: <MoreHorizIcon sx={{ color: "grey.600", fontSize: 24 }} />, label: "More" },
];

export default function CreatePostModal({
  open,
  onClose,
  currentUser,
  mediaFile,
  mediaPreview,
  onPost,
}) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(mediaPreview);
  const [file, setFile] = useState(mediaFile);
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [tagViewOpen, setTagViewOpen] = useState(false);
  const [taggedPeople, setTaggedPeople] = useState([]);
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);

  const firstName = currentUser?.username?.split(" ")[0] || "";
  const isVideo = file?.type?.startsWith("video/");

  useEffect(() => {
    if (open) {
      setText("");
      setPreview(mediaPreview);
      setFile(mediaFile);
      setTagViewOpen(false);
      setTaggedPeople([]);
      setTimeout(() => textInputRef.current?.focus(), 100);
    }
  }, [open, mediaFile, mediaPreview]);

  const handleClose = () => {
    setText("");
    setEmojiAnchor(null);
    setTagViewOpen(false);
    setTaggedPeople([]);
    onClose();
  };

  const handleRemoveMedia = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    e.target.value = "";
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji);
    setEmojiAnchor(null);
    textInputRef.current?.focus();
  };

  const handlePost = () => {
    if (!text.trim() && !file) return;

    onPost({
      desc: text.trim(),
      preview: preview || undefined,
      mediaType: file ? (isVideo ? "video" : "image") : undefined,
      taggedPeople,
    });
    setText("");
    setEmojiAnchor(null);
    setPreview(null);
    setFile(null);
    setTaggedPeople([]);
    setTagViewOpen(false);
  };

  const handleAddPostAction = (action) => {
    if (action === "media") {
      fileInputRef.current?.click();
    } else if (action === "tag") {
      setTagViewOpen(true);
    } else if (action === "emoji") {
      textInputRef.current?.focus();
    }
  };

  const statusLine = formatTaggedStatus(currentUser?.username || "", taggedPeople);

  const canPost = Boolean(text.trim() || file);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2.5, maxWidth: 500 },
      }}
    >
      {!tagViewOpen && (
        <>
          <Box sx={{ position: "relative", px: 2, pt: 1.5 }}>
            <Typography variant="h6" fontWeight={700} textAlign="center" sx={{ fontSize: 20 }}>
              Create post
            </Typography>
            <IconButton
              onClick={handleClose}
              aria-label="Close"
              sx={{
                position: "absolute",
                right: 8,
                top: 4,
                bgcolor: "grey.200",
                width: 36,
                height: 36,
                "&:hover": { bgcolor: "grey.300" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mt: 1.5 }} />
        </>
      )}

      {tagViewOpen ? (
        <TagPeopleModal
          currentUserId={currentUser?._id}
          taggedPeople={taggedPeople}
          onTaggedChange={setTaggedPeople}
          onDone={() => setTagViewOpen(false)}
          onBack={() => setTagViewOpen(false)}
        />
      ) : (
      <Box sx={{ px: 2, pt: 2, pb: 2 }}>
        <Stack direction="row" alignItems="flex-start" spacing={1.25}>
          <Avatar
            src={`${PF}${currentUser?.profilePicture || "person/1.jpeg"}`}
            alt={currentUser?.username || "user"}
            sx={{ width: 40, height: 40, mt: 0.25 }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.4 }}>
              {statusLine}
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: "grey.200",
                cursor: "default",
              }}
            >
              <PeopleIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" fontWeight={600}>
                Friends{taggedPeople.length > 0 ? " (+)" : ""}
              </Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Stack>

        <Box sx={{ position: "relative", mt: 1.5, minHeight: 120 }}>
          <InputBase
            inputRef={textInputRef}
            multiline
            minRows={4}
            maxRows={10}
            placeholder={`What's on your mind, ${firstName}?`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              width: "100%",
              fontSize: 24,
              lineHeight: 1.4,
              pr: 5,
              "& .MuiInputBase-input": { p: 0 },
              "& .MuiInputBase-input::placeholder": {
                color: "grey.500",
                opacity: 1,
              },
            }}
          />
          {/* <IconButton
            onClick={(e) => setEmojiAnchor(e.currentTarget)}
            aria-label="Add emoji"
            sx={{ position: "absolute", right: 0, bottom: 0 }}
          >
            <EmojiEmotionsIcon sx={{ color: "grey.400", fontSize: 28 }} />
          </IconButton> */}
        </Box>

        {preview && (
          <Box
            sx={{
              position: "relative",
              mt: 2,
              borderRadius: 1,
              overflow: "hidden",
              bgcolor: "grey.100",
            }}
          >
            {isVideo ? (
              <Box
                component="video"
                src={preview}
                controls
                sx={{ width: "100%", maxHeight: 360, display: "block" }}
              />
            ) : (
              <Box
                component="img"
                src={preview}
                alt="Upload preview"
                sx={{ width: "100%", maxHeight: 360, objectFit: "contain", display: "block" }}
              />
            )}
            <IconButton
              onClick={handleRemoveMedia}
              aria-label="Remove media"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "white",
                width: 32,
                height: 32,
                boxShadow: 1,
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
            px: 1.5,
            py: 0.75,
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Add to your post
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0}>
            {addPostOptions.map((option) => (
              <IconButton
                key={option.label}
                aria-label={option.label}
                onClick={() => handleAddPostAction(option.action)}
                sx={{ p: 0.75 }}
              >
                {option.icon}
              </IconButton>
            ))}
          </Stack>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={handleFileChange}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          disabled={!canPost}
          onClick={handlePost}
          sx={{
            mt: 2,
            py: 1.25,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 1.5,
            bgcolor: canPost ? "#1877f2" : "grey.300",
            boxShadow: "none",
            "&:hover": { bgcolor: canPost ? "#166fe5" : "grey.300", boxShadow: "none" },
            "&.Mui-disabled": { color: "white", bgcolor: "grey.300" },
          }}
        >
          Post
        </Button>
      </Box>
      )}

      <Popover
        open={Boolean(emojiAnchor)}
        anchorEl={emojiAnchor}
        onClose={() => setEmojiAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, p: 1, maxWidth: 220 }}>
          {commonEmojis.map((emoji) => (
            <IconButton
              key={emoji}
              onClick={() => handleEmojiSelect(emoji)}
              sx={{ fontSize: 24, width: 40, height: 40 }}
            >
              {emoji}
            </IconButton>
          ))}
        </Box>
      </Popover>
    </Dialog>
  );
}
