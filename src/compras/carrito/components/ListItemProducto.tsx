import { ListItem } from "@mui/material";
import { Producto } from "../../../interfaces/interfaces";
import { ListItemProductoContent } from "./ListItemProductoContent";
import { ListItemProductoImage } from "./ListItemProductoImage";

interface ListItemProductoProps {
  producto: Producto;
  cantidad: number;
  agregarItemAlCarrito: (producto: Producto, cantidad: number) => void;
  quitarItemDelCarrito: (producto: Producto) => void;
}

export const ListItemProducto = ({
  agregarItemAlCarrito,
  cantidad,
  producto,
  quitarItemDelCarrito,
}: ListItemProductoProps) => {
  return (
    <ListItem disablePadding sx={{ px: 1 }}>
      <ListItemProductoImage />
      <ListItemProductoContent
        agregarItemAlCarrito={agregarItemAlCarrito}
        cantidad={cantidad}
        producto={producto}
        quitarItemDelCarrito={quitarItemDelCarrito}
      />
    </ListItem>
  );
};
