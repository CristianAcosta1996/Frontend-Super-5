import { Button, Grid, TextField, Typography } from "@mui/material";
import { FormLayout } from "../layout/FormLayout";
import { useForm } from "../../hooks/useForm";
import brandLogo from "../../assets/super5Balnco2.png";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const initialStateForm = {
  username: "",
  password: "",
  email: "",
  name: "",
  surname: "",
  phone: "",
  birthDate: "",
};

export const SignUpPage = () => {
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  const navigate = useNavigate();
  const { handleRegistrarUsuario, handleLogin } = useAuth();
  /* react query: custom hook mutation*/

  const {
    username,
    password,
    email,
    name,
    surname,
    phone,

    handleInputChange,
    reset,
  } = useForm(initialStateForm);

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    //checkear que datos son obligatorios
    if (!email || !password || !name || !surname || !username || !phone) return;

    handleRegistrarUsuario(username, password, email, name, surname, phone);
    reset();
  };

  return (
    // TODO: agregar un stepper para indicar que estan en el paso 1 o 2
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

          <Grid item xs={12} mb={1}>
            <Typography variant="subtitle2" color="primary" mb={1}>
              Crea tu cuenta
            </Typography>
          </Grid>
          {isFirstStep ? (
            <>
              <Grid item xs={12} mb={1}>
                <TextField
                  size="small"
                  variant="filled"
                  fullWidth
                  label="Usuario"
                  type="text"
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} mb={1}>
                <TextField
                  size="small"
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
                  size="small"
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
            </>
          ) : (
            <>
              <Grid item xs={12} mb={1}>
                <TextField
                  size="small"
                  variant="filled"
                  fullWidth
                  label="Nombre"
                  type="text"
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} mb={1}>
                <TextField
                  size="small"
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
                  size="small"
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
            </>
          )}

          <Grid container justifyContent="center">
            <Grid container justifyContent="space-between">
              <Grid item xs={12} sm={5}>
                {!isFirstStep && (
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    onClick={() => {
                      setIsFirstStep(true);
                    }}
                  >
                    Atras
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={5}>
                {isFirstStep ? (
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    onClick={() => {
                      setIsFirstStep(false);
                    }}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <SignupButton titulo="Registrar" type="submit" />
                )}
              </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" mt={2}>
              <Typography color="#fff" sx={{ fontSize: 12 }}>
                ¿Tienes una cuenta?
              </Typography>
              <Button
                size="small"
                variant="text"
                color="primary"
                sx={{ textTransform: "capitalize", fontSize: 12 }}
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
    size="small"
    variant="contained"
    onClick={handleOnClick}
    type={type}
  >
    {titulo}
  </Button>
);
