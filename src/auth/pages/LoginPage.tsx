import { SyntheticEvent } from "react";

import {
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

const initialStateForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const { handleGoogleLogin, handleLogin, isAuthenticating } = useAuth();

  const { username, password, handleInputChange, reset } =
    useForm(initialStateForm);

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (!username || !password) return;

    handleLogin(username, password);
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
              disabled={isAuthenticating}
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
              disabled={isAuthenticating}
            />
          </Grid>
          <Grid container mb={3} justifyContent="space-between">
            <Grid item xs={12}>
              <LoginButton
                titulo="Iniciar sesion"
                type="submit"
                disabled={isAuthenticating}
              />
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
              <Typography color="#fff" sx={{ fontSize: 18 }}>
                ¿No tienes una cuenta?
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "capitalize", fontSize: 18 }}
                disabled={isAuthenticating}
              >
                Regístrate.
              </Button>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <Typography color="#fff" sx={{ fontSize: 14 }}>
                ¿Olvidaste tu contraseña?
              </Typography>
              <Button
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  fontSize: 14,
                  textDecoration: "underline",
                  color: "#fff",
                }}
                disabled={isAuthenticating}
              >
                recuperar contraseña
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3} sx={{ position: "relative" }}>
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
      {isAuthenticating && (
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
  disabled: boolean;
}
const LoginButton = ({
  titulo,
  handleOnClick,
  type,
  disabled,
}: LoginButtonProps) => (
  <Button
    fullWidth
    variant="contained"
    sx={{ mb: 2 }}
    onClick={handleOnClick}
    type={type}
    disabled={disabled}
  >
    {titulo}
  </Button>
);
