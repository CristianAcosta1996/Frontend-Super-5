import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { RecuperarContrasena } from "../pages/RecuperarContrasena";
export const AuthRoutes = () => {

  return (
    <Routes>
      <Route path="signup" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="recuperarcontrasena" element={<RecuperarContrasena />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};
