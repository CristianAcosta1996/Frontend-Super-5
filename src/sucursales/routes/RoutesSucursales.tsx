import { Navigate, Route, Routes } from "react-router-dom";

import { ListadoDeStockPage } from "../pages/ListadoDeStockPage";
import { ConfirmacionComprasPage } from "../pages/ConfirmacionComprasPage";
import { FinalizarComprasPage } from "../pages/FinalizarComprasPage";
import { ProductosRoutes } from "../../productos/routes/ProductosRoutes";
import { ComprasRoutes } from "../../compras/routes/ComprasRoutes";
import { ReclamosRoutes } from "../../reclamos/routes/ReclamosRoutes";
import { VentasRoutes } from "../../ventas/routes/VentasRoutes";

export const RoutesSucursales = () => {
  return (
    <Routes>
      <Route path="producto/*" element={<ProductosRoutes />} />
      <Route path="reclamos/*" element={<ReclamosRoutes />} />
      <Route path="/compras/*" element={<ComprasRoutes />} />
      <Route path="finalizar-compra" element={<FinalizarComprasPage />} />
      <Route path="ventas/*" element={<VentasRoutes />} />
      <Route path="/*" element={<Navigate replace to="producto" />} />
    </Routes>
  );
};
