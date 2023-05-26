import { Route, Routes } from "react-router-dom";
import { RoutesUsuarios } from "../usuarios/routes/RoutesUsuarios";
import { HomePage } from "../pages/HomePage";
import { Super5Appbar } from "../components/Super5Appbar";
import { SelectorSucursales } from "../sucursales/components/SelectorSucursales";
import { useAppSelector } from "../hooks/hooks";

export const Super5Routes = () => {
  const { sucursal } = useAppSelector((state) => state.super5);

  return (
    <>
      {!sucursal.nombre && <SelectorSucursales openDialog={true} />}
      <Super5Appbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="user/*" element={<RoutesUsuarios />} />
      </Routes>
    </>
  );
};
