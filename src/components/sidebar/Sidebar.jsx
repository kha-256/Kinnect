import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { logout } from "../../store/slices/Userslice";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar({ fixed = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.postUser.allUsers);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const sidebarItems = [
    { label: "Feed", icon: <RssFeedIcon /> },
    { label: "Chats", icon: <ChatIcon /> },
    { label: "Videos", icon: <PlayCircleIcon /> },
    { label: "Groups", icon: <GroupsIcon /> },
    { label: "Bookmarks", icon: <BookmarkIcon /> },
    { label: "Questions", icon: <HelpOutlineIcon /> },
    { label: "Jobs", icon: <WorkIcon /> },
    { label: "Events", icon: <EventIcon /> },
    { label: "Courses", icon: <SchoolIcon /> },
  ];

  return (
    <Box
      sx={{
        width: { md: 280 },
        maxWidth: { md: 280 },
        display: { xs: "none", sm: "none", md: "block" },
        flexShrink: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        ...(fixed
          ? {
              position: "fixed",
              left: 0,
              top: 56,
              height: "calc(100vh - 56px)",
              overflowY: "auto",
              overflowX: "hidden",
              zIndex: 100,
            }
          : {
              height: "calc(100vh - 56px)",
              overflowY: "auto",
              overflowX: "hidden",
              position: "sticky",
              top: 56,
              alignSelf: "flex-start",
            }),
      }}
    >
      <Box sx={{ px: { sm: 1, md: 2 }, py: 2 }}>
        <List disablePadding>
          {sidebarItems.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                px: { sm: 1, md: 1.5 },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "text.primary" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: { sm: 14, md: 15 }, fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: "error.main",
              px: { sm: 1, md: 1.5 },
              "& .MuiListItemIcon-root": { color: "error.main" },
              "&:hover": { backgroundColor: "error.50" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontSize: { sm: 14, md: 15 }, fontWeight: 600 }}
            />
          </ListItemButton>
        </List>

        {/* <Button
          variant="contained"
          size="small"
          sx={{ mt: 1.5, borderRadius: 2, textTransform: "none", px: 2.5 }}
        >
          Show More
        </Button> */}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, }}>
          Close Friends
        </Typography>

        <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
          {allUsers.slice(0,5).map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
