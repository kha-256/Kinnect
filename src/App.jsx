import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import VerifyCode from "./pages/forgotPassword/VerifyCode";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import { hydrateAuth } from "./store/slices/Userslice";

function ProtectedRoute({ children }) {
  const { user, token } = useSelector((state) => state.user);
  return user && token ? children : <Navigate to="/" replace />;
}

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={user && token ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/verify" element={<VerifyCode />} />
      <Route path="/forgot-password/reset" element={<ResetPassword />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
