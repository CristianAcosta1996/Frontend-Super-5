import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModificarComprador } from "../hooks/useModificarComprador";

export const DatosPersonales = () => {
    const navigate = useNavigate();
    const { nombre, apellido, email, telefono } = useAppSelector((state) => state.auth);
    const [activado, setActivado] = useState(true);
    const { handleModificarComprador } = useModificarComprador();
    const [name, setName] = useState(nombre);
    const [surname, setSurname] = useState(apellido);
    const [phone, setPhone] = useState(telefono);

    const handleDatosPersonales = () => {
        navigate("/user/datospersonales");
    }
    const handleMisDirecciones = () => {
        navigate("/user/misdirecciones");
    }
    const handleMisPedidos = () => {
        navigate("/user/mispedidos");
    }

    const handleEditar = () => {
        setActivado(!activado);
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
        if (name && surname && phone) {
            handleModificarComprador(name, surname, phone);
        }
        setActivado(!activado)
    }

    const handleCancelar = () => {
        setActivado(!activado);
    }

    return (
        <>

            <Grid container spacing={2} marginTop={1} sx={{ backgroundColor: 'yellow' }} >
                <Grid container alignItems="center" item xs={2} sx={{ backgroundColor: 'blue' }} >

                    <Grid container alignItems="center" sx={{ backgroundColor: 'green' }} item xs={12}>
                        <Button sx={{ backgroundColor: 'red' }} onClick={handleDatosPersonales}>Datos Personales</Button>
                    </Grid>

                    <Grid container alignItems="center" sx={{ backgroundColor: 'green' }} item xs={12}>
                        <Button sx={{ backgroundColor: 'purple' }} onClick={handleMisDirecciones} >Mis Direcciones</Button>
                    </Grid>

                    <Grid container alignItems="center" sx={{ backgroundColor: 'green' }} item xs={12}>
                        <Button sx={{ backgroundColor: 'pink' }} onClick={handleMisPedidos} >Mis Pedidos</Button>
                    </Grid>

                </Grid>



                <Grid sx={{ backgroundColor: 'red' }} item xs={10}>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <TextField
                            disabled={activado}
                            size="small"
                            variant="filled"
                            label="Nombre"
                            type="tex"
                            sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                            name="nombre"
                            defaultValue={nombre}
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <TextField
                            disabled={activado}
                            size="small"
                            variant="filled"
                            label="Apellido"
                            type="text"
                            sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                            name="apellido"
                            defaultValue={apellido}
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
                            sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                            name="email"
                            defaultValue={email}
                        />
                    </Grid>
                    <Grid marginLeft={2} item xs={8} mb={3}>
                        <TextField
                            disabled={activado}
                            size="small"
                            variant="filled"
                            label="Telefono"
                            type="tex"
                            sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                            name="nombre"
                            defaultValue={telefono}
                            onChange={handlePhoneChange}
                        />
                    </Grid>
                    <Button
                        onClick={handleEditar}
                        size="small"
                        variant="text"
                        sx={{
                            textTransform: "capitalize",
                            fontSize: 12,
                            textDecoration: "underline",
                            color: "#fff",
                        }}
                    >
                    </Button>
                    <button hidden={!activado} onClick={handleEditar}>
                        Editar datos
                    </button>
                    <button hidden={activado} onClick={handleGuardar}>
                        Guardar
                    </button>
                    <button hidden={activado} onClick={handleCancelar}>
                        Cancelar
                    </button>
                </Grid>

            </Grid>

        </>
    )
};
