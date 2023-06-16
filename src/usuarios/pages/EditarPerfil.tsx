import { Box, Button, Container, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from "@mui/material";
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

    useEffect(() => {
        if (userData) {
            setName(userData.nombre);
            setSurname(userData.apellido);
            setPhone(userData.telefono);
            setMail(userData.correo);
            setFechaNac((userData?.fechaNacimiento.toString().slice(0, -19)));
            setNacimiento(dayjs(fechaNac))
        }

    }, [userData, fechaNac]);
    console.log(userData?.direcciones);

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

    const handleCancelar = () => {
        navigate("/user/perfil")
    }

    return (
        <>

            <Grid container
                justifyContent={"flex-start"}
                spacing={2}
                marginTop={0}
                xs={12} >
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



                <Grid container sx={{ ml: "5%", borderRadius: 4, border: "2px solid #007aff", padding: 1, mt: 2 }} item xs={6}>
                    <Grid item xs={12}>
                        <Typography
                            width={"75%"}
                            variant="h3"
                            component={"h2"}
                            color={"black"}
                        >
                            Editar Perfil
                        </Typography>
                    </Grid>
                    <Grid marginLeft={2} mt={2} item xs={5} mb={3}>
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
                    <Grid marginLeft={2} item xs={5} mb={3} mt={2}>
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
                    <Grid marginLeft={2} item xs={5} mb={3}>
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
                    <Grid marginLeft={2} item xs={5} mb={3}>
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
                    <Grid marginLeft={2} item xs={5} mb={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                variant="filled"
                                sx={{ backgroundColor: "#white", borderRadius: 2, width: 200 }}
                                size="small"
                                label="Fecha de Nacimiento"
                                value={nacimiento}
                                onChange={(newValue) => setNacimiento(newValue)}
                                format="DD-MM-YYYY"
                            />

                        </LocalizationProvider>
                    </Grid>
                    <Grid xs={8}></Grid>
                    <Grid item xs={4}>
                        <Button
                            onClick={handleGuardar}
                            size="small"
                            variant="text"
                            sx={{
                                ml: 4,
                                fontSize: 14,
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
                                fontSize: 14,
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

                </Grid>

            </Grid >

        </>
    )
};
