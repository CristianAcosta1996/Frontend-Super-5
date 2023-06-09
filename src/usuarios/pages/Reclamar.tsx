import { Autocomplete, Box, Button, Container, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, TextareaAutosize, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCrearReclamo } from "../hooks/useCrearReclamo";
import Textarea from '@mui/joy/Textarea';

export const HacerReclamo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [comentario, setComentario] = useState("");
    const compra = location.state?.compraID;
    const { handleCrearReclamo } = useCrearReclamo();
    const [elTipaso, setElTipaso] = useState<TipoConsulta>();
    interface TipoConsulta {
        title: "ATENCION" | "DEMORA" | "CALIDAD" | "PRECIO" | "OTRO";
    }

    const handleGuardar = () => {
        if (!elTipaso) {
            alert("Seleccione un tipo de reclamo válido")
        }
        if (elTipaso) {
            handleCrearReclamo(compra, elTipaso.title, comentario);
            navigate("/user/mispedidos");
        }

    }

    const obtenerTipo = (dato) => {
        return tipoReclamo.find(element => element.title === dato)
    }

    const handleCancelar = () => {
        navigate("/user/mispedidos")
    }

    const handleComentario = (e) => {
        setComentario(e.target.value);
    }
    const tipoReclamo: TipoConsulta[] = [
        { title: "ATENCION" },
        { title: "DEMORA" },
        { title: "CALIDAD" },
        { title: "PRECIO" },
        { title: "OTRO" },
    ]

    const handleSelect = (e) => {
        setElTipaso(obtenerTipo(e.target.value))
    }

    return (
        <>

            <Grid container sx={{ ml: "5%", borderRadius: 4, border: "2px solid #007aff", padding: 1, mt: 2 }} xs={4}>
                <Grid item xs={12}>
                    <Typography
                        width={"75%"}
                        variant="h3"
                        component={"h2"}
                        color={"black"}
                    >
                        Crear Reclamo
                    </Typography>
                </Grid>
                <Grid item sx={{ mt: 2, mb: 2 }} xs={4}>
                    <Autocomplete
                        options={tipoReclamo.map(({ title }) => {
                            return { label: title }
                        })}
                        id="combo-box-demo"
                        onSelect={handleSelect}
                        renderInput={(params) => (
                            <TextField {...params} label="Tipo de Consulta" variant="standard" />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        size="small"
                        variant="filled"
                        label="ID de la Compra"
                        type="text"
                        disabled={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, width: 200 }}
                        value={compra}
                        name="compraID"
                    />
                </Grid>

                <Grid marginLeft={0} item xs={5} mb={3} mt={2}>
                    <Textarea
                        placeholder="Escriba su reclamo"
                        name="comentario"
                        value={comentario}
                        onChange={handleComentario}
                    />

                </Grid>
                <Grid xs={12}></Grid>
                <Grid item xs={12}>
                    <div>
                        <Button
                            onClick={handleGuardar}
                            size="small"
                            variant="text"
                            sx={{

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
                    </div>

                </Grid>

            </Grid>


        </>
    )
};
