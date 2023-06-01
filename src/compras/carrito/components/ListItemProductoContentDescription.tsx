import { Box, Typography } from "@mui/material";
import { Producto } from "../../../interfaces/interfaces";

export const ListItemProductoContentDescription = ({
  producto,
}: {
  producto: Producto;
}) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption">{producto.descripcion}</Typography>
    </Box>
  );
};
