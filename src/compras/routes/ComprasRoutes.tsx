import { Navigate, Route, Routes } from "react-router-dom";
import { FinalizacionCompraPage } from "../pages/FinalizacionCompraPage";
import { ListarComprasPage } from "../pages/ListarComprasPage";
import { ProcederAlPagoPage } from "../pages/ProcederAlPagoPage";
import { Footer } from "../../usuarios/components/Footer";
import { Box } from "@mui/material";

export const ComprasRoutes = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<ListarComprasPage />} />
          <Route path="finalizar-compra" element={<FinalizacionCompraPage />} />
          <Route path="procesar-pago" element={<ProcederAlPagoPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};
