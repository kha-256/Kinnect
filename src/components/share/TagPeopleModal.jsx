import { useMemo, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { Users } from "../../dummyData";

const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

const suggestionMeta = [
  { subtitle: "Friend" },
  { subtitle: "Friend" },
  { subtitle: "Profile · 242 followers" },
  { subtitle: "Friend" },
  { subtitle: "Page · 30K followers" },
  { subtitle: "Page · 20K followers" },
  { subtitle: "Friend" },
  { subtitle: "Profile · 118 followers" },
  { subtitle: "Friend" },
];

export default function TagPeopleModal({
  currentUserId,
  taggedPeople,
  onTaggedChange,
  onDone,
  onBack,
}) {
  const [search, setSearch] = useState("");

  const suggestions = useMemo(() => {
    return Users.filter((user) => user.id !== currentUserId).map((user, index) => ({
      id: user.id,
      username: user.username,
      profilePicture: user.profilePicture,
      subtitle: suggestionMeta[index % suggestionMeta.length].subtitle,
    }));
  }, [currentUserId]);

  const filteredSuggestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return suggestions;
    return suggestions.filter((user) => user.username.toLowerCase().includes(query));
  }, [search, suggestions]);

  const isTagged = (id) => taggedPeople.some((person) => person.id === id);

  const handleToggleTag = (person) => {
    if (isTagged(person.id)) {
      onTaggedChange(taggedPeople.filter((p) => p.id !== person.id));
    } else {
      onTaggedChange([...taggedPeople, person]);
    }
  };

  const handleRemoveTag = (id) => {
    onTaggedChange(taggedPeople.filter((person) => person.id !== id));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 40px",
          alignItems: "center",
          px: 1,
          py: 1,
          minHeight: 52,
        }}
      >
        <IconButton
          onClick={onBack}
          aria-label="Back"
          sx={{
            bgcolor: "grey.200",
            width: 36,
            height: 36,
            "&:hover": { bgcolor: "grey.300" },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight={700}
          textAlign="center"
          sx={{ fontSize: 20, lineHeight: 1.2 }}
        >
          Tag people
        </Typography>
        <Box />
      </Box>

      <Divider />

      <Box sx={{ px: 2, pt: 2, pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              bgcolor: "grey.100",
              borderRadius: 999,
              px: 1.5,
              py: 0.75,
            }}
          >
            <SearchIcon sx={{ fontSize: 20, color: "text.secondary", mr: 1 }} />
            <InputBase
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 15 }}
            />
          </Box>
          <Button
            onClick={onDone}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: 15,
              color: "#1877f2",
              minWidth: "auto",
              px: 1,
            }}
          >
            Done
          </Button>
        </Stack>

        {taggedPeople.length > 0 && (
          <Box sx={{ mt: 2.5 }}>
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.secondary"
              sx={{ letterSpacing: 0.5 }}
            >
              TAGGED
            </Typography>
            <Box
              sx={{
                mt: 1,
                p: 1,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: 0.75,
              }}
            >
              {taggedPeople.map((person) => (
                <Chip
                  key={person.id}
                  label={person.username}
                  onDelete={() => handleRemoveTag(person.id)}
                  deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: "#e7f3ff",
                    color: "#1877f2",
                    fontWeight: 600,
                    fontSize: 13,
                    "& .MuiChip-deleteIcon": { color: "#1877f2" },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          sx={{ display: "block", mt: 2.5, mb: 1, letterSpacing: 0.5 }}
        >
          SUGGESTIONS
        </Typography>

        <Box sx={{ maxHeight: 320, overflowY: "auto", mx: -1 }}>
          {filteredSuggestions.map((person) => (
            <Stack
              key={person.id}
              direction="row"
              alignItems="center"
              spacing={1.5}
              onClick={() => handleToggleTag(person)}
              sx={{
                px: 1,
                py: 1.25,
                borderRadius: 1,
                cursor: "pointer",
                bgcolor: isTagged(person.id) ? "grey.100" : "transparent",
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              <Avatar
                src={`${PF}${person.profilePicture}`}
                alt={person.username}
                sx={{ width: 48, height: 48 }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {person.username}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {person.subtitle}
                </Typography>
              </Box>
            </Stack>
          ))}

          {filteredSuggestions.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 1, py: 2 }}>
              No people found
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export function formatTaggedStatus(username, taggedPeople) {
  if (!taggedPeople?.length) return username;

  const names = taggedPeople.map((person) => person.username);
  if (names.length === 1) return `${username} is with ${names[0]}`;
  if (names.length === 2) return `${username} is with ${names[0]} and ${names[1]}`;

  const last = names[names.length - 1];
  const rest = names.slice(0, -1).join(", ");
  return `${username} is with ${rest} and ${last}`;
}
