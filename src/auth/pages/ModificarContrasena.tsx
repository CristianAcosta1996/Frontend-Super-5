//http://localhost:5173/asdasdaddsddf
import { SyntheticEvent, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";

import { FormLayout } from "../layout/FormLayout";
import { useForm } from "../../hooks/useForm";
import brandLogo from "../../assets/super5Balnco2.png";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const initialStateForm = {
  password1: "",
  password2: "",
};

export const ModificarContrasena = () => {

  const navigate = useNavigate();
  const { handleModificarContrasena } = useAuth();
  const { password1, password2, handleInputChange, reset } = useForm(initialStateForm);
  const [miGuid, setMiGuid] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const Guid = params.get('Guid');

    if (Guid) {
      // Do something with the extracted value

      console.log("este es el Guid", Guid);
      setMiGuid(Guid);
    }
  }, []);

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!password1 || !password2) return;
    if (password1 != password2) alert("Las contraseñas deben coincidir")
    if (miGuid) {
      handleModificarContrasena(miGuid, password1, password2)
      alert("Contraseña actualizada con éxito");
    }
    navigate("/auth/login");
    reset();
  };

  return (
    <FormLayout>
      <form onSubmit={handleFormSubmit}>
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
              Escriba una nueva contraseña
            </Typography>
            <TextField
              size="small"
              variant="filled"
              fullWidth
              label="Contraseña"
              type="password"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="password1"
              value={password1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="subtitle2" mb={1} color="primary">
              Escriba una nueva contraseña
            </Typography>
            <TextField
              size="small"
              variant="filled"
              fullWidth
              label="Repetir Contraseña"
              type="password"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid container mb={1} justifyContent="space-between">
            <Grid item xs={12}>
              <ConfirmarButton
                titulo="Confirmar"
                type="submit"
                disabled={false} />
            </Grid>
          </Grid>
        </Grid>
      </form>

    </FormLayout>
  );
};


interface ConfirmarButtonProps {
  titulo: string;
  handleOnClick?: () => void;
  type?: "submit" | "button" | "reset";
  disabled: boolean;
}
const ConfirmarButton = ({
  titulo,
  handleOnClick,
  type,
  disabled,
}: ConfirmarButtonProps) => (
  <Button
    size="small"
    fullWidth
    variant="contained"
    sx={{ mb: 1 }}
    onClick={handleOnClick}
    type={type}
    disabled={disabled}
  >
    {titulo}
  </Button>
);
