import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "../hooks/hooks";
import { Super5Routes } from "./Super5Routes";

export const AppRouter = () => {
  const { status } = useAppSelector((state) => state.auth);
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<Super5Routes />} />
        {status !== "authenticated" ? (
          <Route path="auth/*" element={<AuthRoutes />} />
        ) : (
          <Route path="auth/*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<Navigate to="/*" />} />
      </Routes>
    </>
  );
};
