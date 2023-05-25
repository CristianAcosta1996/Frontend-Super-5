import { Button, Grid, TextField } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useState } from "react";


export const ProfilePage = () => {
    const { nombre, apellido, email, } = useAppSelector((state) => state.auth);
    const [activado, setActivado] = useState(true)

    const handleClick = () => {
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
                    />
                </Grid>
                <Grid item xs={12} mb={3}>
                    <TextField
                        disabled={activado}
                        size="small"
                        variant="filled"
                        label="Email"
                        type="text"
                        sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                        name="email"
                        defaultValue={email}
                    />
                </Grid>
                <Button
                    onClick={handleClick}
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
                <button onClick={handleClick}>
                    Editar datos
                </button>
            </Grid>
        </>

    )
};
