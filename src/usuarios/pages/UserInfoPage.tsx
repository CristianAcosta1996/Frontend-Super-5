import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useState, useEffect } from "react";

export const UserInfoPage = () => {
    const { nombre, apellido, email, telefono } = useAppSelector((state) => state.auth);
    const [selected, setSelected] = useState("Datos Personales")
    const [activado, setActivado] = useState(true)
    const [mostrar, setMostrar] = useState("No hay datos")

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

    const handleEditar = () => {
        setActivado(!activado)
    }

    const handleGuardar = () => {
        setActivado(!activado)

    }

    useEffect(() => {
        if (selected == "Datos Personales") {
            setMostrar(`Nombre: ${nombre} |  Apellido:  ${apellido} | Email:${email}`)
        }
        if (selected == "Mis Direcciones") {
            setMostrar("LAS DIRECCIONES")
        }
        if (selected == "Mis Pedidos") {
            setMostrar("LOS PEDIDOS")
        }
    }, [selected])

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
                </Grid>

            </Grid>

        </>
    )
};
