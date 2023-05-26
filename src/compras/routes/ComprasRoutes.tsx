import { Navigate, Route, Routes } from "react-router-dom";
import { FinalizacionCompraPage } from "../pages/FinalizacionCompraPage";

export const ComprasRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FinalizacionCompraPage />} />
      <Route path="*" element={<Navigate to="/*" />} />
    </Routes>
  );
};
