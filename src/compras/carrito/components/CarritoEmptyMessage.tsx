import { Box, Typography } from "@mui/material";
import { CarritoItem } from "../../../interfaces/interfaces";

export const CarritoEmptyMessage = ({
  carrito,
}: {
  carrito: CarritoItem[];
}) => {
  return (
    <Box>
      {carrito.length === 0 && (
        <Typography variant="h6" textAlign="center">
          No hay nada que mostrar en el carrito
        </Typography>
      )}
    </Box>
  );
};
