import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { userSignUp } from "../../store/slices/Userslice";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const registerSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const registerSx = {
  minHeight: "100vh",
  width: "100%",
  bgcolor: "#fff",
  display: "flex",
  justifyContent: "center",
  boxSizing: "border-box",
  overflowX: "hidden",
  overflowY: "auto",
};

const registerContainerSx = {
  width: "100%",
  maxWidth: 600,
  px: { xs: "20px", sm: "32px" },
  pt: { xs: "12px", sm: "24px" },
  pb: { xs: "40px", sm: "48px" },
  boxSizing: "border-box",
 
};

const registerBackIconSx = {
  mt:3,
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

const registerTitleSx = {
  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: {md:'22px', sm:'22px', xs:"22px"},
  fontWeight: 500,
  lineHeight: 1.2,
  color: "#1c1e21",
  mb: 0.5,
};

const registerSubtitleSx = {
  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "0.9375rem",
  fontWeight: 400,
  lineHeight: 1.4,
  color: "#65676b",
  mb: 3.5,
};

const registerFormSx = {
  width: "100%",
};

const fieldLabelSx = {
  fontWeight: 500,
  fontSize: "0.9375rem",
  color: "#1c1e21",
  lineHeight: 1.3,
};

const helperTextSx = {
  fontSize: "0.8125rem",
  color: "#65676b",
  lineHeight: 1.4,
};

const textFieldSx = {
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

const registerErrorSx = {
  color: "#d32f2f",
  fontSize: "0.875rem",
  lineHeight: 1.4,
};

const registerTermsSx = {
  fontSize: "0.8125rem",
  color: "#65676b",
  lineHeight: 1.45,
};

const registerSubmitButtonSx = {
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

const registerLoginLinkSx = {
  width: "100%",
  py: 1.5,
  px: 2,
  border: "none",
  borderRadius: "24px",
  bgcolor: "transparent",
  color: "#1877f2",
  fontSize: "1rem",
  fontWeight: 400,
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    bgcolor: "rgba(24, 119, 242, 0.08)",
  },
};

function RegisterTextField({ name, ...props }) {
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

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (values, { resetForm }) => {
    const userName = `${values.firstName} ${values.lastName}`.trim();
    const response = await dispatch(
      userSignUp({
        userName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
    );

    if (!response.error) {
      resetForm();
      navigate("/");
    }
  };

  return (
    <Box sx={registerSx}>
      <Box sx={registerContainerSx}>
        <IconButton
          size="small"
          sx={registerBackIconSx}
          onClick={() => navigate("/")}
          aria-label="Go back to log in"
        >
          <ArrowBackIosNew fontSize="inherit" />
        </IconButton>

        <Typography component="h1" sx={registerTitleSx}>
          Get started on Kinnect
        </Typography>

        <Typography sx={registerSubtitleSx}>
          Create an account to connect with friends, family and communities of
          people who share your interests.
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Box component={Form} sx={registerFormSx}>
              <Stack spacing={2.5}>
                <Stack spacing={0.75}>
                  <Typography sx={fieldLabelSx}>Name</Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <RegisterTextField
                      name="firstName"
                      placeholder="First name"
                      autoComplete="given-name"
                    />
                    <RegisterTextField
                      name="lastName"
                      placeholder="Last name"
                      autoComplete="family-name"
                    />
                  </Stack>
                </Stack>

                <Stack spacing={0.75}>
                  <Typography sx={fieldLabelSx}>
                    Mobile number or email address
                  </Typography>
                  <RegisterTextField
                    name="email"
                    type="email"
                    placeholder="Mobile number or email address"
                    autoComplete="email"
                  />
                  <Typography sx={helperTextSx}>
                    You may receive notifications from us.
                  </Typography>
                </Stack>

                <Stack spacing={0.75}>
                  <Typography sx={fieldLabelSx}>Password</Typography>
                  <RegisterTextField
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
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
                  <Typography sx={fieldLabelSx}>Confirm password</Typography>
                  <RegisterTextField
                    name="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm password"
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

                {error && (
                  <Typography sx={registerErrorSx}>{error}</Typography>
                )}

                <Typography sx={registerTermsSx}>
                  By tapping Submit, you agree to create an account and to
                  Kinnect&apos;s Terms and Privacy Policy.
                </Typography>

                <Box
                  component="button"
                  type="submit"
                  disabled={loading || isSubmitting}
                  sx={registerSubmitButtonSx}
                >
                  {loading || isSubmitting ? "Loading" : "Submit"}
                </Box>

                <Box
                  component="button"
                  type="button"
                  onClick={() => navigate("/")}
                  sx={registerLoginLinkSx}
                >
                  I already have an account
                </Box>
              </Stack>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
