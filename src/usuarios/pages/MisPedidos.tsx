import { Box, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { MisComprasList } from "../components/MisComprasList";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export const MisPedidos = () => {
    const navigate = useNavigate();

    const handleDatosPersonales = () => {
        navigate("/user/perfil");
    }
    const handleMisDirecciones = () => {
        navigate("/user/misdirecciones")
    }
    const handleMisPedidos = () => {
        navigate("/user/mispedidos")
    }
    const handleMisReclamos = () => {
        navigate("/user/misreclamos")
    }


    return (
        <>

            <Grid container spacing={2} marginTop={1} >
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar variant="dense" />
                    <Toolbar variant="dense" />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleDatosPersonales}>
                                    <ListItemIcon>
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Datos Personales"} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={handleMisDirecciones} >
                                    <ListItemIcon>
                                        <MapIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Mis Direcciones"} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem sx={{ backgroundColor: "#ff0056" }} disablePadding>
                                <ListItemButton sx={{ color: "#fff" }} onClick={handleMisPedidos}>
                                    <ListItemIcon sx={{ color: "#fff" }}>
                                        <CreditCardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Mis Pedidos"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleMisReclamos}>
                                    <ListItemIcon >
                                        <ContactSupportIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Mis Reclamos"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>


                <Grid sx={{ ml: "20%" }} item xs={10}>
                    <MisComprasList />
                </Grid>

            </Grid>

        </>
    )
};
