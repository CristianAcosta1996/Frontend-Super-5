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
import { useNavigate } from "react-router-dom";

const initialStateForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const {
    handleGoogleLogin,
    handleLogin,
    isAuthenticatingLogin,
    isErrorLogin,
    errorLogin,
    isSuccessLogin,
  } = useAuth();
  const navigate = useNavigate();

  const { username, password, handleInputChange, reset } =
    useForm(initialStateForm);

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!username || !password) return;
    handleLogin(username, password);
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
              Acceso
            </Typography>
            <TextField
              size="small"
              variant="filled"
              fullWidth
              label="Email/Usuario"
              type="text"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="username"
              value={username}
              onChange={handleInputChange}
              disabled={isAuthenticatingLogin}
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              size="small"
              variant="filled"
              fullWidth
              label="Contraseña"
              type="password"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="password"
              value={password}
              onChange={handleInputChange}
              disabled={isAuthenticatingLogin}
            />
          </Grid>
          <Grid container mb={1} justifyContent="space-between">
            <Grid item xs={12}>
              <LoginButton
                titulo="Iniciar sesion"
                type="submit"
                disabled={isAuthenticatingLogin}
              />
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
              <Typography color="#fff" sx={{ fontSize: 12 }}>
                ¿No tienes una cuenta?
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "capitalize", fontSize: 12 }}
                disabled={isAuthenticatingLogin}
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                Regístrate.
              </Button>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <Typography color="#fff" sx={{ fontSize: 12 }}>
                ¿Olvidaste tu contraseña?
              </Typography>
              <Button
                size="small"
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  fontSize: 12,
                  textDecoration: "underline",
                  color: "#fff",
                }}
                disabled={isAuthenticatingLogin}
                onClick={() => navigate("/auth/recuperarcontrasena")}
              >
                recuperar contraseña
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={1} sx={{ position: "relative" }}>
            <SocialMediaLoginLabel />
            <Grid container justifyContent="center">
              <IconButton
                onClick={() => handleGoogleLogin()}
                sx={{
                  backgroundColor: "#fff",
                  color: "rgb(0,130,255)",
                  "&:hover": { backgroundColor: "#ddd" },
                }}
              >
                <FcGoogle />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {isErrorLogin && (
        <Alert
          variant="filled"
          severity="error"
          className="animate__animated animate__fadeIn"
        >
          Email/Usuario o Contraseña invalidos
        </Alert>
      )}
      {isSuccessLogin && (
        <Alert
          variant="filled"
          severity="success"
          className="animate__animated animate__fadeIn"
        >
          Login exitoso!.
        </Alert>
      )}
      {isAuthenticatingLogin && (
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
      variant="subtitle2"
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
  disabled: boolean;
}
const LoginButton = ({
  titulo,
  handleOnClick,
  type,
  disabled,
}: LoginButtonProps) => (
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
