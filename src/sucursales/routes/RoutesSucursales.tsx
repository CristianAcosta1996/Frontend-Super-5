import { Navigate, Route, Routes } from "react-router-dom"
import { ModificarStockPage } from "../pages/ModificarStockPage"
import { ListadoDeStockPage } from "../pages/ListadoDeStockPage"
import { ConfirmacionComprasPage } from "../pages/ConfirmacionComprasPage"
import { FinalizarComprasPage } from "../pages/FinalizarComprasPage"


export const RoutesSucursales = () => {
  return (
    <Routes>  
      <Route path="modificar-stock" element={<ModificarStockPage />}/>
      <Route path="listado-stock" element={<ListadoDeStockPage />}/>
      <Route path="confirmacion-compras" element={<ConfirmacionComprasPage />}/>
      <Route path="finalizar-compras" element={<FinalizarComprasPage />}/>
      <Route path="/*" element={<Navigate replace to="modificar-stock" />}/>
    </Routes>
  )
}
