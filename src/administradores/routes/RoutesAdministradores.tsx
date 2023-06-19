import { Navigate, Route, Routes } from "react-router-dom";
import { OpcionesProductosPage } from "../pages/OpcionesProductosPage";
import { ListarTodosProductosPage } from "../../productos/pages/ListarTodosProductosPage";
import { CrearProductoPage } from "../../productos/pages/CrearProductoPage";
import { ListarYModificarProductoPage } from "../../productos/pages/ListarYModificarProductosPage";
import { EliminarProductoPage } from "../../productos/pages/EliminarProductoPage";
import { CrearCategoriaPage } from "../../productos/pages/CrearCategoriaPage";
import { CrearUsuarioSucursalPage } from "../../usuarios/pages/CrearUsuarioSucursalPage";
import { CrearSucursalPage } from "../pages/CrearSucursalPage";
import { OpcionesSucursalesPage } from "../pages/OpcionesSucursalesPage";
import { OpcionesUsuariosPage } from "../pages/OpcionesUsuariosPage";
import { ListarSucursalesPage } from "../../sucursales/pages/ListarSucursalesPage";
import { ListarUsuariosPage } from "../../usuarios/pages/ListarUsuariosPage";
import { ModificarProductoPage } from "../../productos/pages/ModificarProductoPage";
import { BloquearUsuariosPage } from "../pages/BloquearUsuariosPage";
import { CrearPromocionProducto } from "../pages/CrearPromocionProducto";
import { ListarYCrearPromocionPage } from "../../productos/pages/ListarYCrearPromocionPage";
import { EstadisticasPage } from "../pages/EstadisticasPage";

export const RoutesAdministradores = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<OpcionesProductosPage />} />
        <Route path="productos" element={<ListarTodosProductosPage />} />
        <Route path="productos/crear" element={<CrearProductoPage />} />
        <Route
          path="productos/modificar"
          element={<ListarYModificarProductoPage />}
        />
        <Route
          path="productos/modificar/:id"
          element={<ModificarProductoPage />}
        />
        <Route path="productos/eliminar" element={<EliminarProductoPage />} />
        <Route
          path="productos/crear-categoria"
          element={<CrearCategoriaPage />}
        />
        <Route
          path="productos/crear-promocion"
          element={<ListarYCrearPromocionPage />}
        />
        <Route
          path="productos/crear-promocion/:id"
          element={<CrearPromocionProducto />}
        />
        <Route path="usuarios" element={<OpcionesUsuariosPage />} />
        <Route path="usuarios/crear" element={<CrearUsuarioSucursalPage />} />
        <Route path="usuarios/listar" element={<ListarUsuariosPage />} />
        <Route path="usuarios/bloquear" element={<BloquearUsuariosPage />} />
        <Route path="sucursal" element={<OpcionesSucursalesPage />} />
        <Route path="sucursal/listar" element={<ListarSucursalesPage />} />
        <Route path="sucursal/crear" element={<CrearSucursalPage />} />
        <Route path="estadisticas" element={<EstadisticasPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
