import { Grid } from "@mui/material";
import { OpcionCard } from "../components/OpcionCard";
import { List, PersonAdd, PersonRemove } from "@mui/icons-material";

export const OpcionesUsuariosPage = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      sx={{ minHeight: "98vh", height: "100%" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <OpcionCard title="Listar usuarios" Icon={List} redirectTo="listar" />
      <OpcionCard
        title="Crear usuario sucursal"
        Icon={PersonAdd}
        redirectTo="crear"
      />
      <OpcionCard
        title="Bloquear / Eliminar usuarios"
        Icon={PersonRemove}
        redirectTo="bloquear"
      />
    </Grid>
  );
};
