import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CssBaseline } from "@mui/material";

export const AppRouter = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
