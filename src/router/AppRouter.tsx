import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "../hooks/hooks";

export const AppRouter = () => {
  const { status } = useAppSelector((state) => state.auth);
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {status !== "authenticated" && (
          <Route path="auth/*" element={<AuthRoutes />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
