import { Navigate, Route, Routes } from "react-router-dom";
import { ListarVentasPage } from "../pages/ListarVentasPage";
import { ConfirmarVentasPage } from "../pages/ConfirmarVentasPage";
import { FinalizarVentasPage } from "../pages/FinalizarVentasPage";

export const VentasRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListarVentasPage />} />
        <Route path="confirmar-ventas" element={<ConfirmarVentasPage />} />
        <Route path="finalizar-ventas" element={<FinalizarVentasPage />} />
        <Route path="*" element={<Navigate to="/sucursal/ventas" />} />
      </Routes>
    </>
  );
};
