import { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  ClickAwayListener,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import { Users } from "../../dummyData";
import { initialRecentSearches } from "./topbarData";
import { circleButtonSx, iconCircleSx, searchDropdownSx } from "./topbarStyles";

export default function SearchModal({ isMobile, onUserSelect }) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches);
  const [editMode, setEditMode] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return Users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setEditMode(false);
  };

  const handleUserSelect = (username) => {
    onUserSelect(username);
    handleCloseSearch();
  };

  const handleRemoveRecent = (id) => {
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRecentClick = (item) => {
    if (item.type === "user" && item.username) {
      handleUserSelect(item.username);
      return;
    }
    setSearchQuery(item.label);
    searchInputRef.current?.focus();
  };

  const recentSearchPanel = (
    <Box sx={{ py: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Typography fontWeight={700} fontSize={17}>
          Recent
        </Typography>
        <Typography
          component="button"
          onClick={() => setEditMode((prev) => !prev)}
          sx={{
            color: "#1877f2",
            fontWeight: 600,
            fontSize: 15,
            border: "none",
            bgcolor: "transparent",
            cursor: "pointer",
            p: 0,
          }}
        >
          {editMode ? "Done" : "Edit"}
        </Typography>
      </Box>

      {recentSearches.length === 0 ? (
        <Typography sx={{ px: 2, py: 2, color: "text.secondary", fontSize: 15 }}>
          No recent searches
        </Typography>
      ) : (
        recentSearches.map((item) => (
          <Box
            key={item.id}
            onClick={() => !editMode && handleRecentClick(item)}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              cursor: editMode ? "default" : "pointer",
              "&:hover": { bgcolor: editMode ? "transparent" : "#f2f2f2" },
            }}
          >
            {item.type === "user" ? (
              <Avatar
                src={`${PF}${item.profilePicture}`}
                alt={item.label}
                sx={{ width: 36, height: 36, mr: 1.5 }}
              />
            ) : (
              <Box sx={{ ...iconCircleSx, width: 36, height: 36, mr: 1.5 }}>
                <HistoryIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              </Box>
            )}
            <Typography flex={1} fontSize={15} noWrap>
              {item.label}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveRecent(item.id);
              }}
              sx={{ color: "text.secondary" }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        ))
      )}
    </Box>
  );

  const searchResultsPanel = (
    <Box sx={{ py: 1 }}>
      {filteredUsers.length === 0 ? (
        <Typography sx={{ px: 2, py: 2, color: "text.secondary", fontSize: 15 }}>
          No results found for &quot;{searchQuery.trim()}&quot;
        </Typography>
      ) : (
        filteredUsers.map((user) => (
          <Box
            key={user.id}
            onClick={() => handleUserSelect(user.username)}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              cursor: "pointer",
              "&:hover": { bgcolor: "#f2f2f2" },
            }}
          >
            <Avatar
              src={`${PF}${user.profilePicture}`}
              alt={user.username}
              sx={{ width: 36, height: 36, mr: 1.5 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography fontSize={15} fontWeight={500} noWrap>
                {user.username}
              </Typography>
              <Typography fontSize={13} color="text.secondary" noWrap>
                {user.email}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );

  const searchPanelContent = searchQuery.trim() ? searchResultsPanel : recentSearchPanel;

  const searchInputField = (
    <InputBase
      inputRef={searchInputRef}
      placeholder="Search Kinnect"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{ flex: 1, fontSize: 15 }}
    />
  );

  return (
    <>
      <IconButton
        onClick={() => setSearchOpen(true)}
        sx={{ ...circleButtonSx, display: { xs: "flex", md: "none" } }}
        aria-label="Search"
      >
        <SearchIcon sx={{ fontSize: 22 }} />
      </IconButton>

      <ClickAwayListener onClickAway={searchOpen && !isMobile ? handleCloseSearch : () => {}}>
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", md: "block" },
            flexShrink: 0,
          }}
        >
          <Box
            onClick={() => setSearchOpen(true)}
            sx={{
              bgcolor: "#f0f2f5",
              height: 40,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              px: searchOpen ? 0.5 : 1.5,
              width: 400,
              maxWidth: 480,
              cursor: "text",
            }}
          >
            {searchOpen ? (
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseSearch();
                  }}
                  sx={{ width: 36, height: 36 }}
                  aria-label="Close search"
                >
                  <ArrowBackIcon sx={{ fontSize: 22, color: "#050505" }} />
                </IconButton>
                <Box onClick={(e) => e.stopPropagation()} sx={{ flex: 1, display: "flex" }}>
                  {searchInputField}
                </Box>
              </>
            ) : (
              <>
                <SearchIcon sx={{ fontSize: 22, color: "text.secondary", mr: 1 }} />
                <Typography sx={{ flex: 1, fontSize: 15, color: "text.secondary" }}>
                  Search Kinnect
                </Typography>
              </>
            )}
          </Box>

          {searchOpen && <Box sx={searchDropdownSx}>{searchPanelContent}</Box>}
        </Box>
      </ClickAwayListener>

      <Modal open={searchOpen && isMobile} onClose={handleCloseSearch} disableScrollLock>
        <Box sx={{ bgcolor: "common.white", minHeight: "100vh", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton onClick={handleCloseSearch} aria-label="Close search">
              <ArrowBackIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#f0f2f5",
                height: 40,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                px: 1.5,
              }}
            >
              {searchInputField}
            </Box>
          </Box>
          {searchPanelContent}
        </Box>
      </Modal>
    </>
  );
}
