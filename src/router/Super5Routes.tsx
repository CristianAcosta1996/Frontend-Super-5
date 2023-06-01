import { Navigate, Route, Routes } from "react-router-dom";
import { SelectorSucursales } from "../sucursales/components/SelectorSucursales";
import { useAppSelector } from "../hooks/hooks";
import { RoutesUsuarios } from "../usuarios/routes/RoutesUsuarios";
import { DashboardSucursalesPage } from "../sucursales/pages/DashboardSucursalesPage";

export const Super5Routes = () => {
  const { sucursal } = useAppSelector((state) => state.super5);
  return (
    <>
      {!sucursal.nombre && <SelectorSucursales openDialog={true} />}
      <Routes>
        <Route path="user/*" element={<RoutesUsuarios />} />
        <Route path="sucursal/*" element={<DashboardSucursalesPage />} />
        <Route path="/*" element={<Navigate to="user" />} />
      </Routes>
    </>
  );
};
