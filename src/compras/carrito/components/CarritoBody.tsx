import { Box, Divider, IconButton, List } from "@mui/material";
import { useAppSelector } from "../../../hooks/hooks";
import { useCarrito } from "../hooks/useCarrito";
import { ArrowBack } from "@mui/icons-material";
import { CarritoEmptyMessage } from "./CarritoEmptyMessage";
import { CarritoBodyActions } from "./CarritoBodyActions";
import { CarritoBodyDisplay } from "./CarritoBodyDisplay";
import { ListItemProducto } from "./ListItemProducto";

export const CarritoBody = ({
  toggleDrawer,
}: {
  toggleDrawer: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => {
  const {
    precioTotalCarrito,
    quitarItemDelCarrito,
    agregarItemAlCarrito,
    limpiarElCarrito,
    handlePagarCompra,
  } = useCarrito();
  const { carrito } = useAppSelector((state) => state.super5);

  return (
    <Box sx={{ width: 450 }} role="presentation">
      <IconButton onClick={toggleDrawer()}>
        <ArrowBack />
      </IconButton>
      <List>
        {carrito.map(({ producto, cantidad }) => (
          <ListItemProducto
            agregarItemAlCarrito={agregarItemAlCarrito}
            cantidad={cantidad}
            producto={producto}
            quitarItemDelCarrito={quitarItemDelCarrito}
            key={producto.id}
          />
        ))}
        <CarritoEmptyMessage carrito={carrito} />
      </List>
      <Divider />
      <CarritoBodyDisplay precioTotalCarrito={precioTotalCarrito} />
      <CarritoBodyActions
        handleOnVaciarCarrito={() => {
          limpiarElCarrito();
        }}
        handlePagarCompra={handlePagarCompra}
      />
    </Box>
  );
};
