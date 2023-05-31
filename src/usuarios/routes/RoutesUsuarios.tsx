import { Route, Routes } from "react-router-dom"
import AddressPage from "../pages/AddressPage"
import { ProfilePage } from "../pages/ProfilePage"
import { DatosPersonales } from "../pages/DatosPersonales"
import { MisDirecciones } from "../pages/MisDirecciones"
import { MisPedidos } from "../pages/MisPedidos"

export const RoutesUsuarios = () => {
    return <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="datospersonales" element={<DatosPersonales />} />
        <Route path="misdirecciones" element={<MisDirecciones />} />
        <Route path="mispedidos" element={<MisPedidos />} />
    </Routes>
}