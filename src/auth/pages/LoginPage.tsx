import { SyntheticEvent, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";

import { FormLayout } from "../layout/FormLayout";
import { useForm } from "../../hooks/useForm";
import brandLogo from "../../assets/super5Balnco2.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { startGoogleSignIn } from "../../store/auth/thunks";

const initialStateForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {
    values: { username, password },
    handleInputChange,
    reset,
  } = useForm(initialStateForm);
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status !== "authenticated") return;
    navigate("/");
  }, [status]);

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    if (!username || !password) return;
    /* Manejar login submit */
    console.log({ username, password });

    reset();
  };

  return (
    <FormLayout>
      <form onSubmit={handleFormSubmit}>
        <Grid container alignItems="center">
          <Grid container justifyContent="center" my={3}>
            <img
              src={brandLogo}
              alt="brand logo"
              style={{ height: 150, width: 600, objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <Typography variant="h6" mb={3} color="primary">
              Acceso
            </Typography>
            <TextField
              variant="filled"
              fullWidth
              label="Email/Usuario"
              type="text"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              variant="filled"
              fullWidth
              label="Contraseña"
              type="password"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid container mb={3} justifyContent="space-between">
            <Grid item xs={12}>
              <LoginButton titulo="Iniciar sesion" type="submit" />
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
              <Typography color="#fff" sx={{ fontSize: 18 }}>
                ¿No tienes una cuenta?
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "capitalize", fontSize: 18 }}
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                Regístrate.
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3} sx={{ position: "relative" }}>
            <SocialMediaLoginLabel />
            <Grid container justifyContent="center">
              <IconButton
                onClick={onGoogleSignIn}
                sx={{
                  backgroundColor: "#fff",
                  color: "rgb(0,130,255)",
                  "&:hover": { backgroundColor: "#ddd" },
                }}
              >
                <Google />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {status === "checking" && (
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -100%)",
          }}
        >
          <LinearProgress />
        </Box>
      )}
    </FormLayout>
  );
};

const SocialMediaLoginLabel = () => (
  <Box
    sx={{
      position: "relative",
      "&::after": {
        content: '""',
        display: "block",
        width: "100%",
        position: "absolute",
        top: "50%",
        borderBottom: "2px solid #fff",
        zIndex: 0,
      },
      mb: 2,
    }}
  >
    <Typography
      variant="h6"
      component="span"
      color="#fff"
      bgcolor="#333"
      textAlign="center"
      sx={{
        position: "relative",
        display: "inline-block",
        zIndex: 1,
        top: 0,
        left: "50%",
        transform: "translateX(-50%);",
        px: 2,
      }}
    >
      O inicia sesion con
    </Typography>
  </Box>
);

interface LoginButtonProps {
  titulo: string;
  handleOnClick?: () => void;
  type?: "submit" | "button" | "reset";
}
const LoginButton = ({ titulo, handleOnClick, type }: LoginButtonProps) => (
  <Button
    fullWidth
    variant="contained"
    sx={{ mb: 2 }}
    onClick={handleOnClick}
    type={type}
  >
    {titulo}
  </Button>
);
