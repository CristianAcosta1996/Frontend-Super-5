import { Button, Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useState } from "react";


export const ProfilePage = () => {
    const { nombre, apellido, email, telefono } = useAppSelector((state) => state.auth);
    console.log(nombre, apellido, email, telefono)
    const [activado, setActivado] = useState(true);
    const [nuevoNombre, setNuevoNombre] = useState(nombre);
    const [nuevoApellido, setNuevoApellido] = useState(apellido);
    const [nuevoEmail, setNuevoEmail] = useState(email);
    const [nuevoTelefono, setNuevoTelefono] = useState(telefono)
    //NOMBRE APELLLIDO TELEFONO FECHA 

    const handleEditar = () => {
        setActivado(!activado)
    }
    const handleGuardar = () => {
        console.log(nuevoNombre, nuevoApellido, nuevoEmail, nuevoTelefono,)
        setActivado(!activado)

    }
    return (
        <>
            <div>PERFIL DE USUARIO</div>
            <Grid container alignItems="center">
                <Grid item xs={12} mb={3}>
                    <TextField
                        disabled={activado}
                        size="small"
                        variant="filled"
                        label="Nombre"
                        type="tex"
                        sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                        name="nombre"
                        defaultValue={nombre}
                        onChange={(e) => { setNuevoNombre(e.target.value) }}
                    />
                </Grid>
                <Grid item xs={12} mb={3}>
                    <TextField
                        disabled={activado}
                        size="small"
                        variant="filled"
                        label="Apellido"
                        type="text"
                        sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                        name="apellido"
                        defaultValue={apellido}
                        onChange={(e) => { setNuevoApellido(e.target.value) }}
                    />
                </Grid>
                <Grid item xs={12} mb={3}>
                    <TextField
                        disabled={true}
                        size="small"
                        variant="filled"
                        label="Email"
                        type="text"
                        sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                        name="email"
                        defaultValue={email}
                        onChange={(e) => { setNuevoEmail(e.target.value) }}
                    />
                </Grid>
                <Grid item xs={12} mb={3}>
                    <TextField
                        disabled={activado}
                        size="small"
                        variant="filled"
                        label="Telefono"
                        type="text"
                        sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                        name="telefono"
                        defaultValue={telefono}
                        onChange={(e) => { setNuevoTelefono(e.target.value) }}
                    />
                </Grid>

                <button onClick={handleEditar} hidden={!activado}>
                    Editar datos
                </button>
                <button hidden={activado} onClick={handleGuardar}>
                    Guardar
                </button>
            </Grid>
        </>

    )
};
