/* eslint-disable prefer-const */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {
  Avatar,
  Button,
  IconButton,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import {
  AddCircleOutline,
  ArrowBack,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { resetearCarrito } from "../../store/super5/super5Slice";
import { limpiarCarrito } from "../../utils/localstorage";
import { useCarrito } from "../carrito/hooks/useCarrito";
import { useNavigate } from "react-router-dom";

interface CarritoDrawerProps {
  cartOpen: boolean;
  handleClose: () => void;
}

export const CarritoDrawer = ({
  cartOpen,
  handleClose,
}: CarritoDrawerProps) => {
  const { carrito } = useAppSelector((state) => state.super5);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { precioTotalCarrito, quitarItemDelCarrito, agregarItemAlCarrito } =
    useCarrito();

  const handlePagarCompra = (): void => {
    handleClose();
    navigate("compra/procesar-pago");
    return;
  };

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      handleClose();
    };

  const list = () => (
    <Box sx={{ width: 450 }} role="presentation">
      <IconButton onClick={toggleDrawer()}>
        <ArrowBack />
      </IconButton>
      <List>
        {carrito.map(({ producto, cantidad }) => (
          <ListItem key={producto.id} disablePadding sx={{ px: 1 }}>
            <ListItemAvatar>
              <Avatar src={producto.imagen} />
            </ListItemAvatar>
            <Box sx={{ display: "flex", flex: 1, gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption">
                  {producto.descripcion}
                </Typography>
              </Box>
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
              <Box>
                <IconButton
                  onClick={() => {
                    quitarItemDelCarrito(producto);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        ))}
        {carrito.length === 0 && (
          <Typography variant="h6" textAlign="center" sx={{ color: "#555" }}>
            No hay nada que mostrar en el carrito
          </Typography>
        )}
      </List>
      <Divider />
      <List>
        <ListItem>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            <Typography variant="h6" color="primary" component="span">
              Precio total:
            </Typography>
            <Typography variant="h6" color="primary" component="span">
              ${precioTotalCarrito}
            </Typography>
          </Box>
        </ListItem>
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={() => {
            limpiarCarrito();
            dispatch(resetearCarrito());
          }}
        >
          Vaciar Carrito
        </Button>
        <Button onClick={handlePagarCompra}>Pagar</Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        anchor="right"
        open={cartOpen}
        onClose={() => {
          /* toggleDrawer(); */
          handleClose();
          return;
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
};
