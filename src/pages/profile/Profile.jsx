import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { getUserByUsername } from "../../store/slices/PostUser";

export default function Profile() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const profileUser = useSelector((state) =>
    Object.values(state.postUser.postUser).find((u) => u.username === username)
  );

  useEffect(() => {
    if (username) {
      dispatch(getUserByUsername(username));
    }
  }, [dispatch, username]);

  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER || "/assets/";

  return (
    <>
      <Topbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flex: 9 }}>
          <Box>
            <Box sx={{ height: 320, position: "relative" }}>
              <Box
                component="img"
                src={`${PF}post/3.jpeg`}
                alt=""
                sx={{ width: "100%", height: 250, objectFit: "cover", display: "block" }}
              />
              <Avatar
                src={`${PF}${profileUser?.profilePicture || "person/7.jpeg"}`}
                alt={profileUser?.username || username}
                sx={{
                  width: 150,
                  height: 150,
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 150,
                  mx: "auto",
                  border: "3px solid",
                  borderColor: "common.white",
                }}
              />
            </Box>
            <Stack alignItems="center" justifyContent="center" sx={{ py: 1 }}>
              <Typography variant="h5" fontWeight={600}>
                {profileUser?.username || username}
              </Typography>
              <Typography fontWeight={300}>Hello my friends!</Typography>
            </Stack>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Feed username={username} />
            <Rightbar profile />
          </Box>
        </Box>
      </Box>
    </>
  );
}
