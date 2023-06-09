import { Navigate, Route, Routes } from "react-router-dom";
import AddressPage from "../pages/AddressPage";
import { ProfilePage } from "../pages/ProfilePage";
import { HomePage } from "../../pages/HomePage";
import { ComprasRoutes } from "../../compras/routes/ComprasRoutes";
import { Super5Appbar } from "../../components/Super5Appbar";
import { DatosPersonales } from "../pages/DatosPersonales";
import { MisDirecciones } from "../pages/MisDirecciones";
import { MisPedidos } from "../pages/MisPedidos";
import { Toolbar } from "@mui/material";

import { useAppSelector } from "../../hooks/hooks";
import { SelectorSucursales } from "../../sucursales/components/SelectorSucursales";

export const RoutesUsuarios = () => {
  const { sucursal } = useAppSelector((state) => state.super5);

  return (
    <>
      {!sucursal.nombre && <SelectorSucursales openDialog={true} />}
      <Super5Appbar />
      <Toolbar sx={{ mb: 4 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="compra/*" element={<ComprasRoutes />} />
        <Route path="user/profile" element={<ProfilePage />} />
        <Route path="user/address" element={<AddressPage />} />
        <Route path="user/datospersonales" element={<DatosPersonales />} />
        <Route path="user/misdirecciones" element={<MisDirecciones />} />
        <Route path="user/mispedidos" element={<MisPedidos />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
