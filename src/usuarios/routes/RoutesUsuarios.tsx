import { Navigate, Route, Routes } from "react-router-dom";
import { Toolbar } from "@mui/material";

import AddressPage from "../pages/AddressPage";
import { HomePage } from "../../pages/HomePage";
import { ComprasRoutes } from "../../compras/routes/ComprasRoutes";
import { Super5Appbar } from "../../components/Super5Appbar";
import { Perfil } from "../pages/Perfil";
import { MisDirecciones } from "../pages/MisDirecciones";
import { MisPedidos } from "../pages/MisPedidos";
import { EditarPerfil } from "../pages/EditarPerfil";
import { useAppSelector } from "../../hooks/hooks";
import { SelectorSucursales } from "../../sucursales/components/SelectorSucursales";
import { HacerReclamo } from "../pages/Reclamar";
import ModificarDireccion from "../pages/ModificarDireccion";
import { MisReclamos } from "../pages/MisReclamos";
import { VerDetallesDelProductoComprador } from "../pages/VerDetallesDelProductoComprador";

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
        <Route
          path="user/misdirecciones/modificar"
          element={<ModificarDireccion />}
        />
        <Route path="user/mispedidos" element={<MisPedidos />} />
        <Route path="user/mispedidos/reclamo" element={<HacerReclamo />} />
        <Route path="user/misreclamos" element={<MisReclamos />} />
        <Route
          path="producto/:id"
          element={<VerDetallesDelProductoComprador />}
        />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
