import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Producto } from "../../../interfaces/interfaces";

interface ListItemProductoContentDeleteProps {
  producto: Producto;
  quitarItemDelCarrito: (producto: Producto) => void;
}

export const ListItemProductoContentDelete = ({
  producto,
  quitarItemDelCarrito,
}: ListItemProductoContentDeleteProps) => {
  return (
    <Box>
      <IconButton
        onClick={() => {
          quitarItemDelCarrito(producto);
        }}
      >
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  );
};
