import {
  SupportAgent,
  AssignmentTurnedIn,
  ChecklistRtl,
  Fastfood,
  Home,
  Logout,
  Login,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Tooltip,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import brandLogo from "../../assets/super5Balnco2.png";
import { useNavigate } from "react-router-dom";
import { RoutesSucursales } from "../routes/RoutesSucursales";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useAppSelector } from "../../hooks/hooks";
import { useAuth } from "../../auth/hooks/useAuth";

const drawerWidth = 170;

export const DashboardSucursalesPage = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{
            py: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Tooltip title="Inicio">
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                navigate("/");
              }}
            >
              <Home fontSize="small" />
            </IconButton>
          </Tooltip>
          {status === "authenticated" ? (
            <Tooltip
              title="Cerrar Sesion"
              onClick={() => {
                handleLogout();
              }}
            >
              <IconButton color="inherit" size="small">
                <Logout fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              title="Iniciar Sesion"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              <IconButton color="inherit" size="small">
                <Login fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider color="#555" />
        <Avatar
          variant="square"
          src={brandLogo}
          sx={{ width: "80%", height: 100, alignSelf: "center" }}
        />
        <Divider color="#555" />
        <List>
          <DashboardListItem
            Icon={Fastfood}
            titulo="Productos"
            handleOnClick={() => {
              navigate("/sucursal/productos");
            }}
          />
          <DashboardListItem
            Icon={SupportAgent}
            titulo="Reclamos"
            handleOnClick={() => {
              navigate("/sucursal/reclamos");
            }}
          />

          <DashboardListItem
            Icon={ChecklistRtl}
            titulo="Confirmación de compras por clientes."
            handleOnClick={() => {
              navigate("/sucursal/confirmar-compras");
            }}
          />
          <DashboardListItem
            Icon={AssignmentTurnedIn}
            titulo="Finalizar compra."
            handleOnClick={() => {
              navigate("/sucursal/finalizar-compras");
            }}
          />
        </List>
      </Drawer>
      <Box
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#eee",
          minHeight: "100vh",
          overflow: "auto",
          py: 1,
          px: 2,
        }}
      >
        <RoutesSucursales />
      </Box>
    </>
  );
};

interface DashboardListItem {
  titulo: string;
  handleOnClick: () => void;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}

const DashboardListItem = ({
  Icon,
  handleOnClick,
  titulo,
}: DashboardListItem) => {
  return (
    <ListItemButton onClick={handleOnClick}>
      <ListItemIcon sx={{ color: "inherit", minWidth: 35 }}>
        <Icon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: 12 }}>
        {titulo}
      </ListItemText>
    </ListItemButton>
  );
};
