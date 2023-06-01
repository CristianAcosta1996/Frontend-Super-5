import { Navigate, Route, Routes } from "react-router-dom";

import { ListadoDeStockPage } from "../pages/ListadoDeStockPage";
import { ConfirmacionComprasPage } from "../pages/ConfirmacionComprasPage";
import { FinalizarComprasPage } from "../pages/FinalizarComprasPage";
import { ReclamosPage } from "../../compras/pages/ReclamosPage";
import { ProductosRoutes } from "../../productos/routes/ProductosRoutes";

export const RoutesSucursales = () => {
  return (
    <Routes>
      <Route path="producto/*" element={<ProductosRoutes />} />
      <Route path="reclamo" element={<ReclamosPage />} />
      <Route
        path="confirmacion-compras"
        element={<ConfirmacionComprasPage />}
      />
      <Route path="finalizar-compras" element={<FinalizarComprasPage />} />
      <Route path="/*" element={<Navigate replace to="producto" />} />
    </Routes>
  );
};
