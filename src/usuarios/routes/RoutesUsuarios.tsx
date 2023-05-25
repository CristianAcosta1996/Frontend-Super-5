import { Route, Routes } from "react-router-dom"
import AddressPage from "../../pages/AddressPage"
import { ProfilePage } from "../pages/ProfilePage"

export const RoutesUsuarios = () => {
    return <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<AddressPage />} />
    </Routes>
}