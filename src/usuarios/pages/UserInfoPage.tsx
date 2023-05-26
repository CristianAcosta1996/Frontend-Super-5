import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useState } from "react";

export const UserInfoPage = () => {
    const { nombre, apellido, email, } = useAppSelector((state) => state.auth);
    const [selected, setSelected] = useState("")


    const handleDatosPersonales = () => {
        setSelected("Datos Personales");
        console.log(selected)
    }
    const handleMisDirecciones = () => {
        setSelected("Mis Direcciones");
        console.log(selected)
    }
    const handleMisPedidos = () => {
        setSelected("Mis Pedidos");
        console.log(selected)
    }
    return (
        <>
            <Grid container spacing={2} marginTop={1}>
                <Grid item xs={4}>
                    <Button sx={{ backgroundColor: 'red' }} onClick={handleDatosPersonales}>Datos Personales</Button>
                    <Button sx={{ backgroundColor: 'purple' }} onClick={handleMisDirecciones} >Mis Direcciones</Button>
                    <Button sx={{ backgroundColor: 'pink' }} onClick={handleMisPedidos} >Mis Pedidos</Button>
                </Grid>
                <Grid sx={{ backgroundColor: 'red' }} item xs={12}>

                </Grid>
            </Grid>

        </>
    )
};
