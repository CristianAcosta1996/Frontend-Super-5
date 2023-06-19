import { MouseEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Badge, Button, Tooltip, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Edit,
  Home,
  LocationOnOutlined,
  Logout,
  ShoppingCart,
} from "@mui/icons-material";

import { useAuth } from "../auth/hooks/useAuth";
import { useAppSelector } from "../hooks/hooks";
import brandLogo from "../assets/super5Balnco2.png";
import { CarritoDrawer } from "../compras/components/CarritoDrawer";
import { useCarrito } from "../compras/carrito/hooks/useCarrito";
import { SelectorSucursales } from "../sucursales/components/SelectorSucursales";
import ProductAutocomplete from "./ProductAutocomplete";

export const Super5Appbar = () => {
  const { handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { open, handleOnClose: handleCarrito } = useCarrito();
  const [mostrarElegirSucursal, setMostrarElegirSucursal] =
    useState<boolean>(false);

  const {
    imageUrl,
    status,
    sucursal: { nombre: nombreSucursal },
    carrito,
  } = useAppSelector((state) => ({ ...state.auth, ...state.super5 }));

  const navigate = useNavigate();

  const handleMenu = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDireccion = () => {
    setAnchorEl(null);
    navigate("/user/address");
  };

  const handleUserInfo = () => {
    setAnchorEl(null);
    navigate("/user/perfil");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {mostrarElegirSucursal && (
        <SelectorSucursales
          openDialog={true}
          onClose={() => {
            setMostrarElegirSucursal(false);
          }}
        />
      )}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">

          <Box sx={{ flexGrow: 1 }}>
            <Avatar variant="square" src={brandLogo} sx={{ width: 120 }} />
          </Box>
          <Box sx={{ backgroundColor: "007aff", mt: 1, flex: 1 }}>
            <ProductAutocomplete />
          </Box>
          <Tooltip title="Inicio">
            <IconButton onClick={() => navigate("/")} color="inherit">
              <Home />
            </IconButton>
          </Tooltip>
          {status === "authenticated" ? (
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <FotoPerfilUsuario url={imageUrl || ""} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDireccion}>Agregar direccion</MenuItem>
                <MenuItem onClick={handleUserInfo}>Perfil</MenuItem>
              </Menu>
              <Tooltip title="cerrar sesion">
                <IconButton
                  color="inherit"
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                >
                  <Logout fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              <Typography variant="caption">Ingresar</Typography>
            </Button>
          )}
          <IconButton color="inherit" onClick={handleCarrito}>
            <Badge
              badgeContent={
                (carrito.length >= 1 && carrito.length) || undefined
              }
              color="error"
            >
              <ShoppingCart fontSize="small" />
            </Badge>
          </IconButton>
        </Toolbar>
        <Toolbar variant="dense">
          <Button
            variant="text"
            color="inherit"
            size="small"
            onClick={() => {
              setMostrarElegirSucursal(true);
            }}
          >
            <LocationOnOutlined fontSize="inherit" />
            <Typography variant="caption" mx={1}>
              Estas comprando en {nombreSucursal}
            </Typography>
            <Edit fontSize="inherit" />
          </Button>
        </Toolbar>
      </AppBar>
      <CarritoDrawer cartOpen={open} handleClose={handleCarrito} />
    </Box>
  );
};

const FotoPerfilUsuario = ({ url = "" }) => {
  return !url ? (
    <AccountCircle />
  ) : (
    <Avatar src={url} imgProps={{ referrerPolicy: "no-referrer" }} />
  );
};
