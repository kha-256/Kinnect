export const circleButtonSx = {
  width: 40,
  height: 40,
  bgcolor: "#e4e6eb",
  color: "#050505",
  "&:hover": { bgcolor: "#d8dadf" },
};

export const iconCircleSx = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  bgcolor: "#e4e6eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const popoverPaperSx = {
  width: 360,
  height: 400,
  maxHeight: "70vh",
  mt: 1.5,
  borderRadius: 2,
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export const popoverListSx = {
  flex: 1,
  overflowY: "auto",
  minHeight: 0,
  pb: 2,
};

export const filterTabSx = (active) => ({
  px: 1.5,
  py: 0.75,
  borderRadius: 5,
  fontSize: 15,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  bgcolor: active ? "#e7f3ff" : "transparent",
  color: active ? "#1877f2" : "#050505",
  "&:hover": { bgcolor: active ? "#e7f3ff" : "#f2f2f2" },
});

export const searchDropdownSx = {
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  width: 360,
  bgcolor: "common.white",
  borderRadius: 2,
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
  zIndex: 1200,
  maxHeight: "min(480px, 70vh)",
  overflowY: "auto",
};
