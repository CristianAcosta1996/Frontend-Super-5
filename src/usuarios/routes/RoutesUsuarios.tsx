import { Route, Routes } from "react-router-dom"
import AddressPage from "../pages/AddressPage"
import { ProfilePage } from "../pages/ProfilePage"
import { UserInfoPage } from "../pages/UserInfoPage"

export const RoutesUsuarios = () => {
    return <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="userinfo" element={<UserInfoPage />} />
    </Routes>
}