import { Button, Grid, TextField, Typography } from "@mui/material";
import { FormLayout } from "../layout/FormLayout";
import { useForm } from "../../hooks/useForm";
import brandLogo from "../../assets/super5Balnco2.png";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

const initialStateForm = {
  user: "",
  email: "",
  password: "",
  name: "",
  surname: "",
  phone: "",
  birthDate: "",
};

export const SignUpPage = () => {
  const navigate = useNavigate();

  /* react query: custom hook mutation*/

  const {
    values: { email, password, name, surname, phone, birthDate, user },
    handleInputChange,
    reset,
  } = useForm(initialStateForm);

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (!email || !password || !name || !surname) return;
    /* Manejar login submit */
    console.log({ email, password, name, surname, phone, birthDate });

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
            <Typography variant="h6" color="primary" mb={3}>
              Crea tu cuenta
            </Typography>
            <TextField
              variant="filled"
              fullWidth
              label="Usuario"
              type="text"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="user"
              value={user}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} mb={3}>
            <TextField
              variant="filled"
              fullWidth
              label="Email"
              type="email"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="email"
              value={email}
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
          <Grid item xs={12} mb={3}>
            <TextField
              variant="filled"
              fullWidth
              label="Nombre"
              type="text"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="email"
              value={name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              variant="filled"
              fullWidth
              label="Apellido"
              type="text"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="surname"
              value={surname}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} mb={3}>
            <TextField
              variant="filled"
              fullWidth
              label="Telefono"
              type="text"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              variant="filled"
              fullWidth
              label="Fecha de Nacimiento"
              type="date"
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              name="birthDate"
              value={birthDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={5}>
              <SignupButton titulo="Registrar" type="submit" />
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <Typography color="#fff" sx={{ fontSize: 18 }}>
                ¿Tienes una cuenta?
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "capitalize", fontSize: 18 }}
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                Inicia sesión.
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  );
};

interface SignupButtonProps {
  titulo: string;
  handleOnClick?: () => void;
  type?: "submit" | "button" | "reset";
}
const SignupButton = ({ titulo, handleOnClick, type }: SignupButtonProps) => (
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
