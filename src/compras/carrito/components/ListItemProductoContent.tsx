import { Box } from "@mui/material";
import { Producto } from "../../../interfaces/interfaces";
import { ListItemProductoContentButtons } from "./ListItemProductoContentButtons";
import { ListItemProductoContentDelete } from "./ListItemProductoContentDelete";
import { ListItemProductoContentDescription } from "./ListItemProductoContentDescription";

interface ListItemProductoContentProps {
  producto: Producto;
  cantidad: number;
  agregarItemAlCarrito: (producto: Producto, cantidad: number) => void;
  quitarItemDelCarrito: (producto: Producto) => void;
}

export const ListItemProductoContent = ({
  producto,
  cantidad,
  agregarItemAlCarrito,
  quitarItemDelCarrito,
}: ListItemProductoContentProps) => {
  return (
    <Box sx={{ display: "flex", flex: 1, gap: 1 }}>
      <ListItemProductoContentDescription producto={producto} />
      <ListItemProductoContentButtons
        agregarItemAlCarrito={agregarItemAlCarrito}
        cantidad={cantidad}
        producto={producto}
      />
      <ListItemProductoContentDelete
        producto={producto}
        quitarItemDelCarrito={quitarItemDelCarrito}
      />
    </Box>
  );
};
