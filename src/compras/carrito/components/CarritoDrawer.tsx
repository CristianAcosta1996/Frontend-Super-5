import {
  Avatar,
  Button,
  IconButton,
  ListItemAvatar,
  Typography,
  Divider,
  Drawer,
  Box,
  List,
  ListItem,
} from "@mui/material";
import {
  AddCircleOutline,
  ArrowBack,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { useAppSelector } from "../../../hooks/hooks";
import { CarritoItem, Producto } from "../../../interfaces/interfaces";
import { useCarrito } from "../hooks/useCarrito";

interface CarritoDrawerProps {
  cartOpen: boolean;
  handleClose: () => void;
}

export const CarritoDrawer = ({
  cartOpen,
  handleClose,
}: CarritoDrawerProps) => {
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

  return (
    <div>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={(event, reason) => {
          console.log(event, reason);
          return;
          toggleDrawer();
        }}
      >
        <CarritoBody toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};
/* ELIMINAR TODO DEL ESTADO DE REDUX AL LOGOUT  */

const CarritoBody = ({
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
        {carrito.map(({ producto, cantidad }, index) => (
          <ListItemProducto
            agregarItemAlCarrito={agregarItemAlCarrito}
            cantidad={cantidad}
            producto={producto}
            quitarItemDelCarrito={quitarItemDelCarrito}
            key={producto.id}
          />
        ))}
        <EmptyCarritoMessage carrito={carrito} />
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

const EmptyCarritoMessage = ({ carrito }: { carrito: CarritoItem[] }) => {
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

interface CarritoBodyActionsProps {
  handleOnVaciarCarrito: () => void;
  handlePagarCompra: () => void;
}

const CarritoBodyActions = ({
  handleOnVaciarCarrito,
  handlePagarCompra,
}: CarritoBodyActionsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Button onClick={handleOnVaciarCarrito}>Vaciar Carrito</Button>
      <Button onClick={handlePagarCompra}>Pagar</Button>
    </Box>
  );
};

const CarritoBodyDisplay = ({ precioTotalCarrito = 0 }) => {
  return (
    <List>
      <ListItem>
        <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
          <Typography variant="h6" color="primary" component="span">
            Precio total:
          </Typography>
          <Typography variant="h6" color="primary" component="span">
            ${precioTotalCarrito}
          </Typography>
        </Box>
      </ListItem>
    </List>
  );
};

interface ListItemProductoProps {
  producto: Producto;
  cantidad: number;
  agregarItemAlCarrito: (producto: Producto, cantidad: number) => void;
  quitarItemDelCarrito: (producto: Producto) => void;
}

const ListItemProducto = ({
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

const ListItemProductoImage = ({ productoImage = "" }) => {
  return (
    <ListItemAvatar>
      <Avatar src={/* producto.imagen */ productoImage} />
    </ListItemAvatar>
  );
};
interface ListItemProductoContentProps {
  producto: Producto;
  cantidad: number;
  agregarItemAlCarrito: (producto: Producto, cantidad: number) => void;
  quitarItemDelCarrito: (producto: Producto) => void;
}

const ListItemProductoContent = ({
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

interface ListItemProductoContentButtonsProps {
  producto: Producto;
  cantidad: number;
  agregarItemAlCarrito: (producto: Producto, cantidad: number) => void;
}

const ListItemProductoContentButtons = ({
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

const ListItemProductoContentDescription = ({
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

interface ListItemProductoContentDeleteProps {
  producto: Producto;
  quitarItemDelCarrito: (producto: Producto) => void;
}

const ListItemProductoContentDelete = ({
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
