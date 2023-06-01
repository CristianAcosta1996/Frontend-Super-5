import { Navigate, Route, Routes } from "react-router-dom";
import { ListarProductosPage } from "../pages/ListarProductosPage";
import { VerProductoDetallesPage } from "../pages/VerProductoDetallesPage";

export const ProductosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListarProductosPage />} />
      <Route path="/:id" element={<VerProductoDetallesPage />} />
      <Route path="/*" element={<Navigate to="/sucursal/producto" replace />} />
    </Routes>
  );
};
