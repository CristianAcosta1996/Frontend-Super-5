import { Navigate, Route, Routes } from "react-router-dom";
import { ListarReclamosPage } from "../pages/ListarReclamosPage";

export const ReclamosRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListarReclamosPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
