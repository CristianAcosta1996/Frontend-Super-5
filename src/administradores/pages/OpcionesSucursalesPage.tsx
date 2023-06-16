import { Grid } from "@mui/material";
import { OpcionCard } from "../components/OpcionCard";
import { AddBusiness, List } from "@mui/icons-material";

export const OpcionesSucursalesPage = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      sx={{ minHeight: "98vh", height: "100%" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <OpcionCard title="Listar sucursales" Icon={List} redirectTo="listar" />
      <OpcionCard
        title="Crear sucursal"
        Icon={AddBusiness}
        redirectTo="crear"
      />
    </Grid>
  );
};
