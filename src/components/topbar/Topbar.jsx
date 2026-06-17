import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const iconItems = [
  { id: "person", icon: <PersonIcon />, badge: 1 },
  { id: "chat", icon: <ChatIcon />, badge: 1 },
  { id: "notifications", icon: <NotificationsIcon />, badge: 1 },
];

export default function Topbar() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "common.white",
        color: "text.primary",
        height: 56,
        minHeight: 56,
        justifyContent: "center",
        zIndex: 1100,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: 56, height: 56, px: { xs: 1.5, sm: 2 }, gap: 1.5 }}>
        <Box
          onClick={() => navigate("/home")}
          sx={{ cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src={`${PF}logo.png`}
            alt="ligi"
            sx={{ height: 40, width: "auto", objectFit: "contain" }}
          />
        </Box>

        <Box
          sx={{
            bgcolor: "#f0f2f5",
            height: 40,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            px: 1.5,
            width: { xs: 200, sm: 320, md: 400 },
            maxWidth: 480,
            flexShrink: 0,
          }}
        >
          <SearchIcon sx={{ fontSize: 22, color: "text.secondary", mr: 1 }} />
          <InputBase
            placeholder="Search Kinnect"
            sx={{ flex: 1, fontSize: 15 }}
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
          sx={{ flexShrink: 0 }}
        >
          <Stack direction="row" spacing={1.25} sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, fontWeight: 500, cursor: "pointer", color: "text.primary" }}
            >
              Homepage
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 14, fontWeight: 500, cursor: "pointer", color: "text.primary" }}
            >
              Timeline
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            {iconItems.map((item) => (
              <IconButton key={item.id} size="small" sx={{ color: "text.primary", p: 0.75 }}>
                <Badge
                  badgeContent={item.badge}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "#e4b641",
                      color: "white",
                      fontSize: 11,
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                >
                  {item.icon}
                </Badge>
              </IconButton>
            ))}
          </Stack>

          <Avatar
            src={`${PF}${currentUser?.profilePicture || "person/1.jpeg"}`}
            alt={currentUser?.username || "user"}
            sx={{ width: 36, height: 36, cursor: "pointer", ml: 0.5 }}
            onClick={() => currentUser && navigate(`/profile/${currentUser.username}`)}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
