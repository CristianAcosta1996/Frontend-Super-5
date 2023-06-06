import { Navigate, Route, Routes } from "react-router-dom";
import { FinalizacionCompraPage } from "../pages/FinalizacionCompraPage";
import { ListarComprasPage } from "../pages/ListarComprasPage";

export const ComprasRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListarComprasPage />} />
      <Route path="finalizar-compra" element={<FinalizacionCompraPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
