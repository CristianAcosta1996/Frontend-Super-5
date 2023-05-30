import { Add, AssignmentTurnedIn, ChecklistRtl, FormatListNumbered, Iso } from '@mui/icons-material';
import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer'
import brandLogo from "../../assets/super5Balnco2.png";
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { ModificarStockPage } from './ModificarStockPage';
import { RoutesSucursales } from '../routes/RoutesSucursales';

const drawerWidth = 280;

export const DashboardSucursalesPage = () => {
    const navigate = useNavigate();
  return (
    <>
    <Drawer variant="permanent" anchor="left"
     sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: "#333",
        color: "#fff"
        },
    
    }}
    >
        <Avatar variant='square' src={brandLogo} sx={{width: '100%', height: 100}} />
        <Divider color='#777'/>
      <List>
        <ListItemButton onClick={() => {navigate('/sucursal/modificar-stock')}}>
            <ListItemIcon sx={{color: 'inherit'}}>
                <Iso/>
            </ListItemIcon>
            <ListItemText>
                
                Ingreso/Baja de unidades de stock 
                
            </ListItemText>
        </ListItemButton>
        <ListItemButton >
            <ListItemIcon sx={{color: 'inherit'}}>
                <FormatListNumbered />
            </ListItemIcon>
            <ListItemText>
                Listado de stock
            </ListItemText>
        </ListItemButton>
        <ListItemButton >
            <ListItemIcon sx={{color: 'inherit'}}>
                <ChecklistRtl />
            </ListItemIcon>
            <ListItemText>
        Confirmación de compras por clientes.
            </ListItemText>
        </ListItemButton>
        <ListItemButton >
            <ListItemIcon sx={{color: 'inherit'}}>
                <AssignmentTurnedIn />
            </ListItemIcon>
            <ListItemText>
            Finalizar compra.
            </ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
    <Box sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: "#eee", height: '100vh', overflow: 'auto' }}>
        <RoutesSucursales />
    </Box>
    </>
  )
}
