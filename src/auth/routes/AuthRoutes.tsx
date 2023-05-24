import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import AddressPage from "../../pages/AddressPage"
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="address" element={<AddressPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};
