import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { iconCircleSx } from "./topbarStyles";

const profileMenuItems = [
  { id: "home", label: "Home", icon: <HomeOutlinedIcon sx={{ fontSize: 20 }} />, path: "/home" },
  { id: "profile", label: "Profile", icon: <PersonIcon sx={{ fontSize: 20 }} /> },
  { id: "settings", label: "Settings & privacy", icon: <SettingsIcon sx={{ fontSize: 20 }} /> },
  { id: "logout", label: "Log out", icon: <LogoutIcon sx={{ fontSize: 20 }} /> },
];

export default function ProfileMenu({
  anchorEl,
  open,
  onClose,
  currentUser,
  onNavigate,
  onLogout,
}) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  const handleMenuItemClick = (item) => {
    if (item.id === "logout") {
      onLogout();
      return;
    }
    if (item.id === "profile" && currentUser) {
      onNavigate(`/profile/${currentUser.username}`);
      return;
    }
    if (item.path) {
      onNavigate(item.path);
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            width: 300,
            mt: 1.5,
            borderRadius: 2,
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
            overflow: "visible",
          },
        },
      }}
    >
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Box
          onClick={() => currentUser && onNavigate(`/profile/${currentUser.username}`)}
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            "&:hover": { bgcolor: "#f2f2f2" },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar
              src={`${PF}${currentUser?.profilePicture || "person/1.jpeg"}`}
              alt={currentUser?.username || "user"}
              sx={{ width: 40, height: 40 }}
            />
            <Typography fontWeight={600} fontSize={17}>
              {currentUser?.username || "User"}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ px: 1, pb: 1 }}>
        {profileMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleMenuItemClick(item)}
            sx={{
              borderRadius: 2,
              py: 1.25,
              px: 1.5,
              "&:hover": { bgcolor: "#f2f2f2" },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: "100%" }}>
              <Box sx={iconCircleSx}>{item.icon}</Box>
              <Typography fontWeight={500} fontSize={15}>
                {item.label}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Box>
    </Menu>
  );
}
