import { Navigate, Route, Routes } from "react-router-dom";
import AddressPage from "../pages/AddressPage";
import { ProfilePage } from "../pages/ProfilePage";
import { HomePage } from "../../pages/HomePage";
import { ComprasRoutes } from "../../compras/routes/ComprasRoutes";
import { Super5Appbar } from "../../components/Super5Appbar";

export const RoutesUsuarios = () => {
  return (
    <>
      <Super5Appbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="compra/*" element={<ComprasRoutes />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};
