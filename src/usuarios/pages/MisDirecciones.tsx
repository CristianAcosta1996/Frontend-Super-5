import { Box, Button, Container, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export const MisDirecciones = () => {
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



    return (
        <>

            <Grid container spacing={2} marginTop={1} sx={{ backgroundColor: 'yellow' }} >
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

                            <ListItem sx={{ backgroundColor: "#ff0056" }} disablePadding>
                                <ListItemButton sx={{ color: "#fff" }} onClick={handleMisDirecciones} >
                                    <ListItemIcon sx={{ color: "#fff" }}>
                                        <MapIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Mis Direcciones"} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={handleMisPedidos}>
                                    <ListItemIcon>
                                        <CreditCardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Mis Pedidos"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>


                <Grid sx={{ backgroundColor: 'red' }} item xs={10}>

                </Grid>

            </Grid>

        </>
    )
};
