//http://localhost:5173/modificarcontrasena?guid=asdasdaddsddf
import { SyntheticEvent, useEffect, useState } from "react";
import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { FormLayout } from "../layout/FormLayout";
import brandLogo from "../../assets/super5Balnco2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RecuperarContrasena = () => {

    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const { handleRecuperarContrasena } = useAuth();
    const handleInputChange = (e) => {
        setCorreo(e.target.value);
    }
    const handleOnClick = () => {
        if (!correo) return;
        handleRecuperarContrasena(correo);
        alert("Chequee su buzon de correo");
    }

    return (
        <FormLayout>
            <Grid container alignItems="center">
                <Grid container justifyContent="center">
                    <img
                        src={brandLogo}
                        alt="brand logo"
                        style={{ height: 100, width: 300, objectFit: "cover" }}
                    />
                </Grid>
                <Grid item xs={12} mb={2}>
                    <Typography variant="subtitle2" mb={1} color="primary">
                        Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.
                    </Typography>
                    <TextField
                        size="small"
                        variant="filled"
                        fullWidth
                        label="email"
                        type="email"
                        sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                        name="correo"
                        value={correo}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid container mb={1} justifyContent="space-between">
                    <Grid item xs={12}>
                        <Button
                            size="small"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 1 }}
                            onClick={handleOnClick}
                        >
                            Enviar correo de recuperacion
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </FormLayout>
    );
};


