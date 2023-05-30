import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Producto } from "../../../interfaces/interfaces";

interface ListItemProductoContentButtonsProps {
  producto: Producto;
  cantidad: number;
  agregarItemAlCarrito: (producto: Producto, cantidad: number) => void;
}

export const ListItemProductoContentButtons = ({
  producto,
  cantidad,
  agregarItemAlCarrito,
}: ListItemProductoContentButtonsProps) => {
  return (
    <Box sx={{ borderRadius: 4 }}>
      <IconButton
        onClick={() => {
          agregarItemAlCarrito(producto, cantidad - 1);
        }}
      >
        <RemoveCircleOutline fontSize="small" />
      </IconButton>
      <Typography variant="body1" component="span">
        {cantidad}
      </Typography>
      <IconButton
        onClick={() => {
          agregarItemAlCarrito(producto, cantidad + 1);
        }}
      >
        <AddCircleOutline fontSize="small" />
      </IconButton>
    </Box>
  );
};
