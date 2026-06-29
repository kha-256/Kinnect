import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { Box } from "@mui/material";

const SIDEBAR_WIDTH = 280;
const TOPBAR_HEIGHT = 56;

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f2f5" }}>
      <Topbar />
      <Sidebar fixed />
      <Box
        component="main"
        sx={{
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
        }}
      >
        <Feed />
      </Box>
    </Box>
  );
}
