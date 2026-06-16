import "./Login.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../store/slices/Userslice";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LOGIN_HERO_IMAGE =
  "https://static.xx.fbcdn.net/rsrc.php/yB/r/83zWJdc6PJI.webp";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const loginMainSx = {
  flex: 1,
  width: "100%",
  minHeight: 0,
  alignItems: { xs: "stretch", sm: "center", md: "flex-start" },
  justifyContent: { md: "center", sm: "flex-start" },
  flexDirection: { xs: "column", md: "row" },
  marginBottom: 3,
};

const loginLeftSx = {
  flex: 1,
  minWidth: 0,
  maxWidth: { lg: "60%", md: "60%" },
  justifyContent: "flex-start",
  alignItems: "center",
  display: "flex",
  marginTop: { lg: -6, md: 0 },
};

const loginLeftContentSx = {
  minWidth: 0,
};

const loginHeadlineWrapSx = {
  flex: "0 0 auto",
  minWidth: 0,
};

const loginRightSx = {
  flex: { xs: "0 0 auto", md: 1 },
  width: { xs: "100%", md: "auto" },
  minWidth: 0,
  maxWidth: { xs: "100%", sm: "500px", md: "40%", lg: "40%" },
  justifyContent: { xs: "center", md: "flex-start" },
  alignItems: "center",
  marginTop: { md: 0, sm: 5, xs: 5 },
};

const loginRightContentSx = {
  width: { xs: "100%", md: "100%" },
  maxWidth: { xs: "100%", sm: "500px", md: "396px" },
  alignItems: "stretch",
};

const loginFormTitleSx = {
  width: "100%",
  mb: 4,
  textAlign: "left",
  fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "22px",
  fontWeight: 500,
  lineHeight: 1.2,
  color: "#1c1e21",
};

const loginFormSx = {
  width: "100%",
};

const fieldLabelSx = {
  fontWeight: 500,
  fontSize: "0.9375rem",
  color: "#1c1e21",
  lineHeight: 1.3,
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

const loginErrorSx = {
  color: "#d32f2f",
  fontSize: "0.875rem",
  lineHeight: 1.4,
};

const loginSuccessSx = {
  color: "#2e7d32",
  fontSize: "0.875rem",
  lineHeight: 1.4,
  width: "100%",
};

const loginSubmitButtonSx = {
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

const loginForgetLinkSx = {
  width: "100%",
  py: 1,
  border: "none",
  bgcolor: "transparent",
  color: "#1877f2",
  fontSize: "0.9375rem",
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
  },
};

const loginCreateAccountButtonSx = {
  width: "100%",
  // minHeight: 48,
  py: 1.5,
  px: 2,
  borderRadius: "24px",
  border: "1px solid #1877f2",
  bgcolor: "#fff",
  color: "#1877f2",
  fontSize: "1.0625rem",
  fontWeight: 400,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  "&:hover": {
    bgcolor: "rgba(24, 119, 242, 0.08)",
  },
};

function LoginTextField({ name, ...props }) {
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

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const theme = useTheme();
  const showLeftSection = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const location = useLocation();
 
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (values, { resetForm }) => {
    const response = await dispatch(userLogin(values));

    if (!response.error) {
      resetForm();
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <img src="/assets/logo.png" alt="Kinnect" className="loginLogo" />

      <Stack sx={loginMainSx} component="div">
        {showLeftSection && (
          <Stack sx={loginLeftSx} component="div">
            <Stack
              sx={loginLeftContentSx}
              direction="row"
              alignItems="center"
              component="div"
            >
              <Stack sx={loginHeadlineWrapSx}>
                <h1 className="loginHeadline">
                  <span>Connect</span>
                  <span>with</span>
                  <span>friends on</span>
                  <span className="loginHeadlineAccent">Kinnect.</span>
                </h1>
              </Stack>
              <img src={LOGIN_HERO_IMAGE} alt="" className="loginHero" />
            </Stack>
          </Stack>
        )}

        <Stack sx={loginRightSx} component="div">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Stack sx={loginRightContentSx} component="div">
                <Typography component="h1" sx={loginFormTitleSx}>
                  Log in to Kinnect
                </Typography>

                <Box component={Form} sx={loginFormSx}>
                  <Stack spacing={2}>
                    <Stack spacing={0.75}>
                      <Typography sx={fieldLabelSx}>
                        Email or mobile number
                      </Typography>
                      <LoginTextField
                        name="email"
                        type="email"
                        placeholder="Email or mobile number"
                        autoComplete="email"
                      />
                    </Stack>

                    <Stack spacing={0.75}>
                      <Typography sx={fieldLabelSx}>Password</Typography>
                      <LoginTextField
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="current-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setPasswordVisible(!passwordVisible)
                                }
                                edge="end"
                                aria-label={
                                  passwordVisible
                                    ? "Hide password"
                                    : "Show password"
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

                  
                    {error && (
                      <Typography sx={loginErrorSx}>{error}</Typography>
                    )}

                    <Box
                      component="button"
                      type="submit"
                      disabled={loading || isSubmitting}
                      sx={loginSubmitButtonSx}
                    >
                      {loading || isSubmitting ? "Loading" : "Log in"}
                    </Box>

                    <Box
                      component="button"
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      sx={loginForgetLinkSx}
                    >
                      Forgot password?
                    </Box>

                    <Box
                      component="button"
                      type="button"
                      onClick={() => navigate("/register")}
                      sx={loginCreateAccountButtonSx}
                    >
                      Create new account
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            )}
          </Formik>
        </Stack>
      </Stack>
    </div>
  );
}
