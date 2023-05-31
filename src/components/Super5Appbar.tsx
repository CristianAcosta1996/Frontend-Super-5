import { MouseEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Button, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Edit,
  LocationOnOutlined,
  Logout,
  ShoppingCart,
} from "@mui/icons-material";

import { useAuth } from "../auth/hooks/useAuth";
import { useAppSelector } from "../hooks/hooks";
import brandLogo from "../assets/super5Balnco2.png";
import { CarritoDrawer } from "../compras/components/CarritoDrawer";
import { useCarrito } from "../compras/carrito/hooks/useCarrito";

export const Super5Appbar = () => {
  const { handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { open, handleOnClose: handleCarrito } = useCarrito();

  const {
    imageUrl,
    status,
    sucursal: { nombre: nombreSucursal },
  } = useAppSelector((state) => ({ ...state.auth, ...state.super5 }));

  const navigate = useNavigate();

  const handleMenu = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/user/profile");
  };
  const handleDireccion = () => {
    navigate("/user/address");
  }

  const handleUserInfo = () => {
    navigate("/user/datospersonales")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon fontSize="small" />
            <Typography variant="caption">Categorias</Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }}>
            <Avatar variant="square" src={brandLogo} sx={{ width: 120 }} />
          </Box>
          <button onClick={() => navigate("/")}>inicio</button>
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
                <MenuItem onClick={handleProfile}>Datos Personales</MenuItem>
                <MenuItem onClick={handleDireccion}>Agregar direccion</MenuItem>
                <MenuItem onClick={handleUserInfo}>User Info</MenuItem>
              </Menu>
              <IconButton color="inherit" onClick={() => handleLogout()}>
                <Logout fontSize="small" />
              </IconButton>
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
            <ShoppingCart fontSize="small" />
          </IconButton>
        </Toolbar>
        <Toolbar variant="dense">
          <Button
            variant="text"
            color="inherit"
            size="small"
            onClick={() => {
              /* //TODO: hacer que pueda cambiar la sucursal.*/
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
