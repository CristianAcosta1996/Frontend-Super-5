import { Navigate, Route, Routes } from "react-router-dom";
import { ListarVentasPage } from "../pages/ListarVentasPage";

export const VentasRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListarVentasPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
