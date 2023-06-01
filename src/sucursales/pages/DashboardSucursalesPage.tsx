import {
  SupportAgent,
  AssignmentTurnedIn,
  ChecklistRtl,
  Fastfood,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import brandLogo from "../../assets/super5Balnco2.png";
import { useNavigate } from "react-router-dom";
import { RoutesSucursales } from "../routes/RoutesSucursales";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const drawerWidth = 230;

export const DashboardSucursalesPage = () => {
  const navigate = useNavigate();
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
          height: "100vh",
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
