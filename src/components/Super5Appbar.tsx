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
import { Logout, ShoppingCart } from "@mui/icons-material";

import { useAuth } from "../auth/hooks/useAuth";
import { useAppSelector } from "../hooks/hooks";
import brandLogo from "../assets/super5Balnco2.png";

export const Super5Appbar = () => {
  const { status, handleLogout } = useAuth();
  const { imageUrl } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
            <Typography>Categorias</Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }}>
            <Avatar variant="square" src={brandLogo} sx={{ width: 150 }} />
          </Box>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
              <IconButton color="inherit" onClick={() => handleLogout()}>
                <Logout />
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
              Ingresar
            </Button>
          )}
          <IconButton
            color="inherit"
            onClick={() => {
              navigate("");
            }}
          >
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
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
