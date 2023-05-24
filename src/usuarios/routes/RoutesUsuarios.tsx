import { Route, Routes } from "react-router-dom"
import AddressPage from "../../pages/AddressPage"

export const RoutesUsuarios = () => {
    return <Routes>
        <Route path="address" element={<AddressPage />} />
    </Routes>
}