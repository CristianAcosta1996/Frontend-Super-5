import { Navigate, Route, Routes } from "react-router-dom";
import AddressPage from "../pages/AddressPage";
import { HomePage } from "../../pages/HomePage";
import { ComprasRoutes } from "../../compras/routes/ComprasRoutes";
import { Super5Appbar } from "../../components/Super5Appbar";
import { Perfil } from "../pages/Perfil";
import { MisDirecciones } from "../pages/MisDirecciones";
import { MisPedidos } from "../pages/MisPedidos";
import { Box, Toolbar } from "@mui/material";
import { EditarPerfil } from "../pages/EditarPerfil";

import { useAppSelector } from "../../hooks/hooks";
import { SelectorSucursales } from "../../sucursales/components/SelectorSucursales";
import { Footer } from "../components/Footer";

export const RoutesUsuarios = () => {
  const { sucursal } = useAppSelector((state) => state.super5);

  return (
    <>
      {!sucursal.nombre && <SelectorSucursales openDialog={true} />}
      <Super5Appbar />
      <Toolbar variant="dense" />
      <Toolbar variant="dense" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="compra/*" element={<ComprasRoutes />} />
        <Route path="user/address" element={<AddressPage />} />
        <Route path="user/perfil" element={<Perfil />} />
        <Route path="user/perfil/editar" element={<EditarPerfil />} />
        <Route path="user/misdirecciones" element={<MisDirecciones />} />
        <Route path="user/mispedidos" element={<MisPedidos />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
