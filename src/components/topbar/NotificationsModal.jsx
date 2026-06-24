import { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Box, Divider, IconButton, Popover, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { initialNotifications } from "./topbarData";
import { filterTabSx, popoverListSx, popoverPaperSx } from "./topbarStyles";

export default function NotificationsModal({ open, anchorEl, onClose, onUnreadCountChange }) {
  const navigate = useNavigate();
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const displayedNotifications =
    filter === "unread" ? notifications.filter((notification) => !notification.read) : notifications;

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [unreadCount, onUnreadCountChange]);

  const handleNotificationClick = (notification) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === notification.id ? { ...item, read: true } : item))
    );
    onClose();
    navigate(`/profile/${notification.fromUser.username}`);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{ paper: { sx: popoverPaperSx } }}
    >
      <Box sx={{ px: 2, pt: 2, pb: 1.5, flexShrink: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
          <Typography fontWeight={700} fontSize={24}>
            Notifications
          </Typography>
          {/* <IconButton size="small" sx={{ color: "#050505" }} aria-label="Notification options">
            <MoreHorizIcon />
          </IconButton> */}
        </Box>

        <Stack direction="row" spacing={1}>
          <Box component="button" onClick={() => setFilter("all")} sx={filterTabSx(filter === "all")}>
            All
          </Box>
          <Box component="button" onClick={() => setFilter("unread")} sx={filterTabSx(filter === "unread")}>
            Unread
          </Box>
        </Stack>
      </Box>

      <Divider />

      {displayedNotifications.length === 0 ? (
        <Box sx={{ ...popoverListSx, px: 3, py: 6, textAlign: "center" }}>
          <NotificationsNoneIcon sx={{ fontSize: 56, color: "#bcc0c4", mb: 2 }} />
          <Typography fontWeight={700} fontSize={17} color="text.secondary">
            You have no notifications
          </Typography>
        </Box>
      ) : (
        <Box sx={popoverListSx}>
          {displayedNotifications.map((notification) => (
            <Box
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                px: 2,
                py: 1.5,
                cursor: "pointer",
                bgcolor: notification.read ? "transparent" : "#e7f3ff",
                "&:hover": { bgcolor: notification.read ? "#f2f2f2" : "#dbe7f3" },
              }}
            >
              <Avatar
                src={`${PF}${notification.fromUser.profilePicture}`}
                alt={notification.fromUser.username}
                sx={{ width: 56, height: 56 }}
              />
              <Box sx={{ flex: 1, minWidth: 0, pt: 0.5 }}>
                <Typography fontSize={15} lineHeight={1.4}>
                  <Box component="span" fontWeight={600}>
                    {notification.fromUser.username}
                  </Box>{" "}
                  {notification.message}
                </Typography>
                <Typography fontSize={13} color="text.secondary" mt={0.5}>
                  {notification.time}
                </Typography>
              </Box>
              {!notification.read && (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#1877f2",
                    mt: 1.5,
                    flexShrink: 0,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Popover>
  );
}
