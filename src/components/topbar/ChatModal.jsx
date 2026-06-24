import { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { chatConversations, commonEmojis, initialChats } from "./topbarData";
import { filterTabSx, popoverListSx, popoverPaperSx } from "./topbarStyles";

export default function ChatModal({ open, anchorEl, onClose, onUnreadCountChange }) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";
  const [chats, setChats] = useState(initialChats);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState(chatConversations);
  const [messageInput, setMessageInput] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);

  const unreadCount = chats.filter((chat) => chat.unread).length;

  const displayedChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let filtered = filter === "unread" ? chats.filter((chat) => chat.unread) : chats;

    if (query) {
      filtered = filtered.filter(
        (chat) =>
          chat.user.username.toLowerCase().includes(query) ||
          chat.lastMessage.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [chats, filter, searchQuery]);

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [unreadCount, onUnreadCountChange]);

  useEffect(() => {
    if (activeChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat, conversations]);

  const handleClose = () => {
    onClose();
    setSearchQuery("");
    setActiveChat(null);
    setMessageInput("");
    setEmojiPickerOpen(false);
  };

  const handleBack = () => {
    setActiveChat(null);
    setMessageInput("");
    setEmojiPickerOpen(false);
  };

  const handleChatClick = (chat) => {
    setChats((prev) =>
      prev.map((item) => (item.id === chat.id ? { ...item, unread: false } : item))
    );
    setActiveChat(chat);
    setMessageInput("");
  };

  const appendMessage = (messageData) => {
    if (!activeChat) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      time: "Just now",
      type: "text",
      text: "",
      ...messageData,
    };

    const previewText = newMessage.type === "image" ? "You sent a photo." : newMessage.text;

    setConversations((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage],
    }));

    setChats((prev) =>
      prev.map((item) =>
        item.id === activeChat.id
          ? { ...item, lastMessage: previewText, time: "Just now", unread: false }
          : item
      )
    );
  };

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text || !activeChat) return;

    appendMessage({ type: "text", text });
    setMessageInput("");
  };

  const handleEmojiSelect = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setEmojiPickerOpen(false);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file || !activeChat) return;

    const imageUrl = URL.createObjectURL(file);
    appendMessage({ type: "image", text: "Photo", imageUrl });
    event.target.value = "";
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{ paper: { sx: popoverPaperSx } }}
    >
      {activeChat ? (
        <>
          <Box
            sx={{
              px: 1,
              py: 1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton onClick={handleBack} aria-label="Back to chats">
              <ArrowBackIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <Box sx={{ position: "relative", flexShrink: 0 }}>
              <Avatar
                src={`${PF}${activeChat.user.profilePicture}`}
                alt={activeChat.user.username}
                sx={{ width: 40, height: 40 }}
              />
              {activeChat.online && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#31a24c",
                    border: "2px solid white",
                  }}
                />
              )}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={600} fontSize={15} noWrap>
                {activeChat.user.username}
              </Typography>
              {activeChat.online && (
                <Typography fontSize={12} color="#31a24c">
                  Active now
                </Typography>
              )}
            </Box>
            <IconButton size="small" sx={{ color: "#050505" }} aria-label="Conversation options">
              <MoreHorizIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              ...popoverListSx,
              px: 2,
              pt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {(conversations[activeChat.id] || []).map((message) => (
              <Box
                key={message.id}
                sx={{
                  alignSelf: message.sender === "me" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                <Box
                  sx={{
                    bgcolor:
                      message.type === "image"
                        ? "transparent"
                        : message.sender === "me"
                          ? "#0084ff"
                          : "#e4e6eb",
                    color: message.sender === "me" ? "common.white" : "#050505",
                    px: message.type === "image" ? 0 : 1.5,
                    py: message.type === "image" ? 0 : 1,
                    borderRadius:
                      message.sender === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    overflow: "hidden",
                  }}
                >
                  {message.type === "image" ? (
                    <Box
                      component="img"
                      src={message.imageUrl}
                      alt="Shared"
                      sx={{
                        maxWidth: 200,
                        maxHeight: 200,
                        borderRadius: 2,
                        display: "block",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography fontSize={15} lineHeight={1.4}>
                      {message.text}
                    </Typography>
                  )}
                </Box>
                <Typography
                  fontSize={11}
                  color="text.secondary"
                  sx={{ mt: 0.5, textAlign: message.sender === "me" ? "right" : "left" }}
                >
                  {message.time}
                </Typography>
              </Box>
            ))}
            <Box ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              px: 1.5,
              py: 1.5,
              flexShrink: 0,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            {emojiPickerOpen && (
              <Box
                sx={{
                  mb: 1,
                  p: 1,
                  bgcolor: "common.white",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  maxHeight: 140,
                  overflowY: "auto",
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {commonEmojis.map((emoji) => (
                    <Box
                      key={emoji}
                      component="button"
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      sx={{
                        width: 40,
                        height: 40,
                        border: "none",
                        bgcolor: "transparent",
                        borderRadius: 1,
                        cursor: "pointer",
                        fontSize: 24,
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        "&:hover": { bgcolor: "#f0f2f5" },
                      }}
                    >
                      {emoji}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <IconButton
                size="small"
                onClick={() => setEmojiPickerOpen((prev) => !prev)}
                sx={{ color: emojiPickerOpen ? "#1877f2" : "#f7b928" }}
                aria-label="Add emoji"
              >
                <EmojiEmotionsIcon sx={{ fontSize: 22 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => imageInputRef.current?.click()}
                sx={{ color: "#0084ff" }}
                aria-label="Send image"
              >
                <ImageOutlinedIcon sx={{ fontSize: 22 }} />
              </IconButton>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageSelect}
              />
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#f0f2f5",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  height: 36,
                }}
              >
                <InputBase
                  placeholder="Aa"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  sx={{ flex: 1, fontSize: 15 }}
                />
              </Box>
              <IconButton
                size="small"
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                sx={{ color: messageInput.trim() ? "#0084ff" : "text.disabled" }}
                aria-label="Send message"
              >
                <SendIcon sx={{ fontSize: 22 }} />
              </IconButton>
            </Stack>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ px: 2, pt: 2, pb: 1.5, flexShrink: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography fontWeight={700} fontSize={24}>
                Chats
              </Typography>
              {/* <Stack direction="row" spacing={0.5}>
                <IconButton size="small" sx={{ color: "#050505" }} aria-label="New message">
                  <EditOutlinedIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton size="small" sx={{ color: "#050505" }} aria-label="Chat options">
                  <MoreHorizIcon />
                </IconButton>
              </Stack> */}
            </Box>

            <Box
              sx={{
                bgcolor: "#f0f2f5",
                height: 36,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                px: 1.5,
                mb: 1.5,
              }}
            >
              <SearchIcon sx={{ fontSize: 18, color: "text.secondary", mr: 1 }} />
              <InputBase
                placeholder="Search Kinnect"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flex: 1, fontSize: 15 }}
              />
            </Box>

            <Stack direction="row" spacing={1}>
              <Box component="button" onClick={() => setFilter("all")} sx={filterTabSx(filter === "all")}>
                All
              </Box>
              <Box
                component="button"
                onClick={() => setFilter("unread")}
                sx={filterTabSx(filter === "unread")}
              >
                Unread
              </Box>
            </Stack>
          </Box>

          <Divider />

          {displayedChats.length === 0 ? (
            <Box sx={{ ...popoverListSx, px: 3, py: 6, textAlign: "center" }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 56, color: "#bcc0c4", mb: 2 }} />
              <Typography fontWeight={700} fontSize={17} color="text.secondary">
                {searchQuery.trim() ? "No chats found" : "No chats available"}
              </Typography>
            </Box>
          ) : (
            <Box sx={popoverListSx}>
              {displayedChats.map((chat) => (
                <Box
                  key={chat.id}
                  onClick={() => handleChatClick(chat)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2,
                    py: 1.25,
                    cursor: "pointer",
                    bgcolor: chat.unread ? "#e7f3ff" : "transparent",
                    "&:hover": { bgcolor: chat.unread ? "#dbe7f3" : "#f2f2f2" },
                  }}
                >
                  <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Avatar
                      src={`${PF}${chat.user.profilePicture}`}
                      alt={chat.user.username}
                      sx={{ width: 56, height: 56 }}
                    />
                    {chat.online && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 2,
                          right: 2,
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          bgcolor: "#31a24c",
                          border: "2px solid white",
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={chat.unread ? 700 : 600} fontSize={15} noWrap>
                      {chat.user.username}
                    </Typography>
                    <Typography
                      fontSize={13}
                      color="text.secondary"
                      noWrap
                      fontWeight={chat.unread ? 600 : 400}
                    >
                      {chat.lastMessage}
                    </Typography>
                  </Box>
                  <Stack alignItems="flex-end" spacing={0.75} sx={{ flexShrink: 0 }}>
                    <Typography fontSize={12} color="text.secondary">
                      {chat.time}
                    </Typography>
                    {chat.unread && (
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: "#1877f2",
                        }}
                      />
                    )}
                  </Stack>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Popover>
  );
}
