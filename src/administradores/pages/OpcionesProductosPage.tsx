import { Add, Clear, Edit, List } from "@mui/icons-material";
import { Grid } from "@mui/material";

import { OpcionCard } from "../components/OpcionCard";

export const OpcionesProductosPage = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      sx={{ minHeight: "98vh", height: "100%" }}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <OpcionCard title="Ver productos" Icon={List} redirectTo="productos" />
      <OpcionCard
        title="Crear producto"
        Icon={Add}
        redirectTo="productos/crear"
      />
      <OpcionCard
        title="Modificar producto"
        Icon={Edit}
        redirectTo="productos/modificar"
      />
      <OpcionCard
        title="Eliminar producto"
        Icon={Clear}
        redirectTo="productos/eliminar"
      />
      <OpcionCard
        title="Crear categoria"
        Icon={Add}
        redirectTo="productos/crear-categoria"
      />
      <OpcionCard
        title="Crear promocion"
        Icon={Add}
        redirectTo="productos/crear-promocion"
      />
    </Grid>
  );
};
