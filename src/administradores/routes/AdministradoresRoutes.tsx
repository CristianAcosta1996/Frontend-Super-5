import { Route, Routes } from "react-router-dom";
import { DashboardAdministradores } from "../pages/DashboardAdministradores";

export const RoutesAdministradores = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardAdministradores />} />
      </Routes>
    </>
  );
};
