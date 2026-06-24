import { useSelector } from "react-redux";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
  const allUsers = useSelector((state) => state.postUser.allUsers);
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  const HomeRightbar = () => (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Box component="img" src="assets/gift.png" alt="" sx={{ width: 40, height: 40 }} />
        <Typography variant="body2" fontWeight={300}>
          <Box component="span" fontWeight={700}>
            Rameesha Khan
          </Box>{" "}
          and{" "}
          <Box component="span" fontWeight={700}>
            2 others
          </Box>{" "}
          have birthday today.
        </Typography>
      </Stack>

      <Box
        component="img"
        src="assets/ad.png"
        alt=""
        sx={{ width: "100%", borderRadius: 2.5 }}
      />

      {/* <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2.5 }}>
          Online Friends
        </Typography>
        <Stack component="ul" spacing={1.875} sx={{ m: 0, p: 0, listStyle: "none" }}>
          {allUsers.slice(0,7).reverse().map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </Stack>
      </Box> */}
    </Stack>
  );

  const ProfileRightbar = () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1.25 }}>
          User Information
        </Typography>
        <Stack spacing={1.25}>
          {[
            { label: "Country", value: "Pakistan" },
            { label: "City", value: "Karachi" },
            { label: "Age", value: "26" },
          ].map((item) => (
            <Stack key={item.label} direction="row" spacing={2}>
              <Typography variant="body2" fontWeight={500} color="text.secondary" sx={{ minWidth: 72 }}>
                {item.label}:
              </Typography>
              <Typography variant="body2" fontWeight={300}>
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2.5 }}>
          User Friends
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {allUsers.slice(0, 6).map((u) => (
            <Stack
              key={u.id}
              alignItems="center"
              spacing={0.5}
              sx={{ width: "28%", cursor: "pointer" }}
            >
              <Avatar
                variant="rounded"
                src={`${PF}${u.profilePicture}`}
                alt={u.username}
                sx={{ width: 100, height: 100, borderRadius: 1.25 }}
              />
              <Typography variant="body2" noWrap sx={{ maxWidth: "100%" }}>
                {u.username}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Stack>
  );

  return (
    <Box
      sx={{
        flex: { xs: 0, sm: 0, md: 3.5 },
        display: { xs: "none", sm: "none", md: "block" },
      }}
    >
      <Box sx={{ pt: 2.5, pr: 2.5 }}>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </Box>
    </Box>
  );
}
