import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const resetSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const pageSx = {
  minHeight: "100vh",
  width: "100%",
  bgcolor: "#fff",
  display: "flex",
  justifyContent: "center",
  boxSizing: "border-box",
  overflowX: "hidden",
  overflowY: "auto",
};

const containerSx = {
  width: "100%",
  maxWidth: 600,
  px: { xs: "20px", sm: "32px" },
  pt: { xs: "12px", sm: "24px" },
  pb: { xs: "40px", sm: "48px" },
  boxSizing: "border-box",
};

const backIconSx = {
  mt: 3,
  ml: -1,
  mb: 2,
  width: 40,
  height: 40,
  p: 1,
  borderRadius: "50%",
  bgcolor: "transparent",
  color: "#1c1e21",
  "&:hover": {
    bgcolor: "#eef0f3",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.3rem",
  },
};

const titleSx = {
  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "22px",
  fontWeight: 500,
  lineHeight: 1.2,
  color: "#1c1e21",
  mb: 0.5,
};

const subtitleSx = {
  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "0.9375rem",
  fontWeight: 400,
  lineHeight: 1.4,
  color: "#65676b",
  mb: 3.5,
};

const formSx = {
  width: "100%",
};

const fieldLabelSx = {
  fontWeight: 500,
  fontSize: "0.9375rem",
  color: "#1c1e21",
  lineHeight: 1.3,
};

const textFieldSx = {
  width: "100%",
  minWidth: 0,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#ccd0d5",
    },
    "&:hover fieldset": {
      borderColor: "#8d949e",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1877f2",
      borderWidth: "1px",
    },
    "&.Mui-error fieldset": {
      borderColor: "#d32f2f",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
    fontSize: "15px",
    color: "#1c1e21",
    "&::placeholder": {
      color: "#8a8d91",
      opacity: 1,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginTop: "6px",
    fontSize: "0.8125rem",
  },
};

const submitButtonSx = {
  width: "100%",
  // minHeight: 48,
  py: 1.5,
  px: 2,
  border: "none",
  borderRadius: "24px",
  bgcolor: "#1877f2",
  color: "#fff",
  fontSize: "1.0625rem",
  fontWeight: 400,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  "&:hover:not(:disabled)": {
    bgcolor: "#166fe5",
  },
  "&:disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
  },
};

function ResetTextField({ name, ...props }) {
  const [field, meta] = useField(name);
  const showError = meta.touched && Boolean(meta.error);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      error={showError}
      helperText={showError ? meta.error : props.helperText}
      sx={{ ...textFieldSx, ...props.sx }}
    />
  );
}

export default function ResetPassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier;

  if (!identifier) {
    return <Navigate to="/forgot-password" replace />;
  }

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    resetForm();
    navigate("/", {
      state: {
        message: "Your password has been changed. You can log in now.",
      },
    });
  };

  return (
    <Box sx={pageSx}>
      <Box sx={containerSx}>
        <IconButton
          size="small"
          sx={backIconSx}
          onClick={() =>
            navigate("/forgot-password/verify", { state: { identifier } })
          }
          aria-label="Go back"
        >
          <ArrowBackIosNew fontSize="inherit" />
        </IconButton>

        <Typography component="h1" sx={titleSx}>
          Change your password
        </Typography>

        <Typography sx={subtitleSx}>
          Create a new password for {identifier}.
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={resetSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Box component={Form} sx={formSx}>
              <Stack spacing={2.5}>
                <Stack spacing={0.75}>
                  <Typography sx={fieldLabelSx}>New password</Typography>
                  <ResetTextField
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="New password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            edge="end"
                            aria-label={
                              passwordVisible ? "Hide password" : "Show password"
                            }
                            size="small"
                          >
                            {passwordVisible ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack spacing={0.75}>
                  <Typography sx={fieldLabelSx}>Confirm new password</Typography>
                  <ResetTextField
                    name="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setConfirmPasswordVisible(!confirmPasswordVisible)
                            }
                            edge="end"
                            aria-label={
                              confirmPasswordVisible
                                ? "Hide password"
                                : "Show password"
                            }
                            size="small"
                          >
                            {confirmPasswordVisible ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Box sx={{ pt: 2 }}>
                  <Box
                    component="button"
                    type="submit"
                    disabled={loading || isSubmitting}
                    sx={submitButtonSx}
                  >
                    {loading || isSubmitting ? "Loading" : "Continue"}
                  </Box>
                </Box>
              </Stack>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
