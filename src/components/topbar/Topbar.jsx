import { useCallback, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Avatar, Badge, Box, IconButton, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { logout } from "../../store/slices/Userslice";
import { initialChats, initialNotifications } from "./topbarData";
import { circleButtonSx } from "./topbarStyles";
import SearchModal from "./SearchModal";
import ChatModal from "./ChatModal";
import NotificationsModal from "./NotificationsModal";
import ProfileMenu from "./ProfileMenu";

const iconItems = [
  { id: "home", icon: <HomeOutlinedIcon sx={{ fontSize: 22 }} />, path: "/home" },
  { id: "chat", icon: <ChatBubbleOutlineIcon sx={{ fontSize: 22 }} /> },
  { id: "notifications", icon: <NotificationsOutlinedIcon sx={{ fontSize: 22 }} /> },
];

const initialUnreadChatCount = initialChats.filter((chat) => chat.unread).length;
const initialUnreadNotificationCount = initialNotifications.filter((n) => !n.read).length;

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser = useSelector((state) => state.user.user);
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [chatAnchorEl, setChatAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [unreadChatCount, setUnreadChatCount] = useState(initialUnreadChatCount);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(initialUnreadNotificationCount);

  const profileOpen = Boolean(profileAnchorEl);
  const chatOpen = Boolean(chatAnchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);

  const handleProfileNavigate = useCallback(
    (path) => {
      setProfileAnchorEl(null);
      navigate(path);
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setProfileAnchorEl(null);
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  const handleChatOpen = (event) => {
    setNotificationAnchorEl(null);
    setChatAnchorEl(event.currentTarget);
  };

  const handleNotificationOpen = (event) => {
    setChatAnchorEl(null);
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleIconClick = (item, event) => {
    if (item.id === "chat") {
      handleChatOpen(event);
      return;
    }
    if (item.id === "notifications") {
      handleNotificationOpen(event);
      return;
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const getIconBadge = (item) => {
    if (item.id === "notifications") return unreadNotificationCount;
    if (item.id === "chat") return unreadChatCount;
    return item.badge;
  };

  const isIconBadgeInvisible = (item) => {
    if (item.id === "notifications") return !unreadNotificationCount;
    if (item.id === "chat") return !unreadChatCount;
    return !item.badge;
  };

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
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        pr:3,
       
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 56,
          height: 56,
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          px: { xs: 1, sm: 2 },
          gap: { xs: 0.75, sm: 1.5 },
        }}
      >
        <Box
          onClick={() => navigate("/home")}
          sx={{ cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center" }}
        >
          <Box
            component="img"
            src={`${PF}logo.png`}
            alt="ligi"
            sx={{ height: { xs: 32, sm: 40 }, width: "auto", objectFit: "contain" }}
          />
        </Box>

        <SearchModal
          isMobile={isMobile}
          onUserSelect={(username) => navigate(`/profile/${username}`)}
        />

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.25, sm: 0.75 }} sx={{ flexShrink: 0 }}>
          {iconItems.map((item) => (
            <IconButton
              key={item.id}
              sx={{
                ...circleButtonSx,
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
              }}
              onClick={(event) => handleIconClick(item, event)}
            >
              <Badge
                badgeContent={getIconBadge(item)}
                invisible={isIconBadgeInvisible(item)}
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "#e41e3f",
                    color: "white",
                    fontSize: 11,
                    minWidth: 18,
                    height: 18,
                    top: 2,
                    right: 2,
                  },
                }}
              >
                {item.icon}
              </Badge>
            </IconButton>
          ))}

          <ChatModal
            open={chatOpen}
            anchorEl={chatAnchorEl}
            onClose={() => setChatAnchorEl(null)}
            onUnreadCountChange={setUnreadChatCount}
          />

          <NotificationsModal
            open={notificationOpen}
            anchorEl={notificationAnchorEl}
            onClose={() => setNotificationAnchorEl(null)}
            onUnreadCountChange={setUnreadNotificationCount}
          />

          <Box
            onClick={(event) => setProfileAnchorEl(event.currentTarget)}
            sx={{
              position: "relative",
              cursor: "pointer",
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              bgcolor: "#e4e6eb",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              "&:hover": { bgcolor: "#d8dadf" },
            }}
          >
            <Avatar
              src={`${PF}${currentUser?.profilePicture || "person/1.jpeg"}`}
              alt={currentUser?.username || "user"}
              sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 14,
                height: 14,
                bgcolor: "common.white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: 14, color: "#050505" }} />
            </Box>
          </Box>

          <ProfileMenu
            anchorEl={profileAnchorEl}
            open={profileOpen}
            onClose={() => setProfileAnchorEl(null)}
            currentUser={currentUser}
            onNavigate={handleProfileNavigate}
            onLogout={handleLogout}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
