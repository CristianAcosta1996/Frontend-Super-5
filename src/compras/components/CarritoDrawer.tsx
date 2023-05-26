/* eslint-disable prefer-const */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import {
  Add,
  AddCircleOutline,
  ArrowBack,
  Close,
  Delete,
  PlusOne,
  RemoveCircle,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CarritoDto, CompraDTO } from "../../interfaces/interfaces";
import { useGenerarCompraPaypalMutation } from "../../store/super5/super5Api";
import { realizarCompraPaypal } from "../../store/super5/super5Slice";

interface CarritoDrawerProps {
  cartOpen: boolean;
  handleClose: () => void;
}

export const CarritoDrawer = ({
  cartOpen,
  handleClose,
}: CarritoDrawerProps) => {
  /* const [open, setOpen] = useState(false); */
  const { carrito } = useAppSelector((state) => state.super5);
  const { sucursal } = useAppSelector((state) => state.super5);
  const [startCompraPaypal, { data }] = useGenerarCompraPaypalMutation();
  const dispatch = useAppDispatch();

  const handlePagarCompra = (event: any): void => {
    let arregloCompra: CarritoDto[] = [];
    carrito.forEach(({ producto, cantidad }) => {
      arregloCompra.push({ producto_id: +producto.id, cantidad });
    });
    const compra: CompraDTO = {
      carrito: arregloCompra,
      formaEntrega: "SUCURSAL",
      sucursal_id: +sucursal.id,
    };
    startCompraPaypal(compra).then((resp: any) => {
      dispatch(realizarCompraPaypal(resp.data));
      window.location.replace(resp.data.urlPaypal);
    });
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
        {carrito.map(({ producto, cantidad }, index) => (
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
                <IconButton disabled>
                  <RemoveCircleOutline fontSize="small" />
                </IconButton>
                <Typography variant="body1" component="span">
                  {cantidad}
                </Typography>
                <IconButton disabled>
                  <AddCircleOutline fontSize="small" />
                </IconButton>
              </Box>
              <Box>
                <IconButton disabled>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        ))}
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
              $0
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
        <Button>Vaciar Carrito</Button>
        <Button onClick={handlePagarCompra}>Pagar</Button>
      </Box>
    </Box>
  );

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
        {list()}
      </Drawer>
    </div>
  );
};
