import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const shareOptions = [
  { icon: <PermMediaIcon sx={{ color: "tomato", fontSize: 17 }} />, label: "Photo or Video" },
  { icon: <LabelIcon sx={{ color: "blue", fontSize: 17 }} />, label: "Tag" },
  { icon: <RoomIcon sx={{ color: "green", fontSize: 17 }} />, label: "Location" },
  { icon: <EmojiEmotionsIcon sx={{ color: "goldenrod", fontSize: 17 }} />, label: "Feelings" },
];

export default function Share() {
  const currentUser = useSelector((state) => state.user.user);
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        borderRadius: 2.5,
      }}
    >
      <Box sx={{ p: 1.25 }}>
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Avatar
            src={`${PF}${currentUser?.profilePicture || "person/1.jpeg"}`}
            alt={currentUser?.username || "user"}
            sx={{ width: 50, height: 50 }}
          />
          <InputBase
            placeholder={`What's on your mind ${currentUser?.username?.split(" ")[0] || ""}`}
            sx={{ flex: 1, fontSize: 14 }}
          />
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1, sm: 1.25 }}
            sx={{ ml: 1, flex: 1, minWidth: 0, flexWrap: "wrap", rowGap: 1 }}
          >
            {shareOptions.map((option) => (
              <Stack
                key={option.label}
                direction="row"
                alignItems="center"
                spacing={0.375}
                sx={{ cursor: "pointer", flexShrink: 0 }}
              >
                {option.icon}
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{ fontSize: 13, display: { xs: "none", sm: "block" } }}
                >
                  {option.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              bgcolor: "green",
              "&:hover": { bgcolor: "darkgreen" },
              mr: 0.625,
              px: 1.25,
              py: 0.625,
            }}
          >
            Share
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
