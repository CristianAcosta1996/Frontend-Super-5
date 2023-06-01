import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MisDirecciones = () => {
    const navigate = useNavigate();

    const handleDatosPersonales = () => {
        navigate("/user/datospersonales");
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

                </Grid>

            </Grid>

        </>
    )
};
