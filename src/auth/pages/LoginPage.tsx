import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";

import { LoginLayout } from "../layout/LoginLayout";
import brandLogo from "../../assets/imagenSinFondo2.png";

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

const SocialMediaLoginLabel = () => (
  <Box sx={{ display: { xs: "none", sm: "block" } }}>
    <Typography
      variant="body1"
      component="span"
      color="#fff"
      textAlign="center"
      sx={{
        position: "absolute",
        zIndex: 2,
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#333",
        px: 2,
      }}
    >
      O inicia sesion con
    </Typography>
    <hr />
  </Box>
);

export const LoginPage = () => {
  const handleFormSubmit = (event: any): void => {
    event.preventDefault();
    /* Manejar login submit */
  };

  return (
    <LoginLayout>
      <form onSubmit={handleFormSubmit}>
        <Grid container alignItems="center">
          <Grid container justifyContent="center" mb={3}>
            <img src={brandLogo} alt="brand logo" style={{ width: 300 }} />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              variant="filled"
              fullWidth
              label="Email"
              type="email"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="email"
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
            />
          </Grid>
          <Grid container mb={3} justifyContent="space-between">
            <Grid item xs={12} sm={5}>
              <LoginButton titulo="Iniciar sesion" type="submit" />
            </Grid>
            <Grid item xs={12} sm={5}>
              <LoginButton titulo="Registrarse" />
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3} sx={{ position: "relative" }}>
            <SocialMediaLoginLabel />
            <Grid
              container
              justifyContent="center"
              sx={{
                mt: {
                  xs: 0,
                  sm: 6,
                },
              }}
            >
              <IconButton
                size="large"
                color="primary"
                sx={{
                  backgroundColor: "#fff",
                  "&:hover": {
                    backgroundColor: "#eee",
                  },
                }}
              >
                <Google />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </LoginLayout>
  );
};
