import { Box, Button, Container, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModificarComprador } from "../hooks/useModificarComprador";
import { useGetUserDataQuery } from "../../store/super5/super5Api";
import MapIcon from '@mui/icons-material/Map';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export const EditarPerfil = () => {
    const navigate = useNavigate();
    const { data: userData } = useGetUserDataQuery();
    const { handleModificarComprador } = useModificarComprador();
    const [name, setName] = useState(userData?.nombre);
    const [surname, setSurname] = useState(userData?.apellido);
    const [phone, setPhone] = useState(userData?.telefono);
    const [mail, setMail] = useState(userData?.correo);
    const [fechaNac, setFechaNac] = useState((userData?.fechaNacimiento.toString().slice(0, -19)));

    const [nacimiento, setNacimiento] = useState<Dayjs | null>(dayjs(fechaNac));



    const handleDatosPersonales = () => {
        navigate("/user/datospersonales");
    }
    const handleMisDirecciones = () => {
        navigate("/user/misdirecciones");
    }
    const handleMisPedidos = () => {
        navigate("/user/mispedidos");
    }


    const handleSurnameChange = (e) => {
        setSurname(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleGuardar = () => {
        if (name && surname && phone && nacimiento) {
            handleModificarComprador(name, surname, phone, nacimiento.toDate());
            navigate("/user/perfil")
        }
    }
    const handleFechaNac = (e) => {
        console.log(e.target.value)
        setNacimiento(e.target.value);
    }

    const handleCancelar = () => {
        navigate("/user/perfil")
    }

    return (
        <>

            <Grid container spacing={2} marginTop={0} >
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
                            <ListItem sx={{ backgroundColor: "#ff0056" }} disablePadding>
                                <ListItemButton sx={{ color: "#fff" }} onClick={handleDatosPersonales}>
                                    <ListItemIcon sx={{ color: "#fff" }}>
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Datos Personales"} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={handleMisDirecciones} >
                                    <ListItemIcon >
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



                <Grid sx={{ marginLeft: "240px" }} item xs={10}>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <TextField
                            size="small"
                            variant="filled"
                            label="Nombre"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                            name="nombre"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <TextField
                            size="small"
                            variant="filled"
                            label="Apellido"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                            name="apellido"
                            value={surname}
                            onChange={handleSurnameChange}
                        />
                    </Grid>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <TextField
                            disabled={true}
                            size="small"
                            variant="filled"
                            label="Email"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                            name="email"
                            value={mail}
                        />
                    </Grid>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <TextField
                            size="small"
                            variant="filled"
                            label="Telefono"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ backgroundColor: "white", borderRadius: 2, width: 200 }}
                            name="telefono"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </Grid>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                variant="filled"
                                sx={{ backgroundColor: "#white", borderRadius: 2, width: 200 }}
                                size="small"
                                label="Fecha de Nacimiento"
                                value={nacimiento}
                                onChange={handleFechaNac}
                                format="DD-MM-YYYY"
                            />

                        </LocalizationProvider>
                    </Grid>

                    <Button
                        onClick={handleGuardar}
                        size="small"
                        variant="text"
                        sx={{
                            ml: 4,
                            textTransform: "capitalize",
                            fontSize: 14,
                            textDecoration: "underline",
                            color: "white",
                            backgroundColor: "#007aff",
                            "&:hover": {
                                color: "#007aff",
                                borderBlockColor: "#007aff",
                                border: 1,
                            },
                        }}
                    >
                        Guardar
                    </Button>
                    <Button
                        onClick={handleCancelar}
                        size="small"
                        variant="text"
                        sx={{
                            ml: 5,
                            textTransform: "capitalize",
                            fontSize: 14,
                            textDecoration: "underline",
                            color: "white",
                            backgroundColor: "#007aff",
                            "&:hover": {
                                color: "#007aff",
                                borderBlockColor: "#007aff",
                                border: 1,
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                </Grid>

            </Grid >

        </>
    )
};
