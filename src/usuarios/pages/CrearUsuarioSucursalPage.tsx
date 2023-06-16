import { Theme } from "@emotion/react";
import {
  SxProps,
  GridSize,
  Grid,
  styled,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";
import { useCrearUsuarioSucursalMutation } from "../../store/super5/super5Api";

export const CrearUsuarioSucursalPage = () => {
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [correo, setCorreo] = useState();
  const [contrasenia, setContrasenia] = useState();
  const [telefono, setTelefono] = useState();
  const [usuario, setUsuario] = useState();
  const [fechaNacimiento, setFechaNacimiento] = useState();
  const [sucursalId, setSucursalId] = useState();

  const [startCrearUsuarioSucursal] = useCrearUsuarioSucursalMutation();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (
      !nombre ||
      !apellido ||
      !correo ||
      !contrasenia ||
      !telefono ||
      !usuario ||
      !fechaNacimiento ||
      !sucursalId
    )
      return;

    startCrearUsuarioSucursal({
      nombre,
      apellido,
      contrasenia,
      correo,
      fechaNacimiento,
      sucursalId,
      telefono,
      usuario,
    })
      .unwrap()
      .then(console.log)
      .catch(console.log);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        sx={{
          minHeight: "98vh",
          maxWidth: 800,
          bgcolor: "#333",
          px: 2,
          py: 2,
          color: "#fff",
          margin: "0 auto",
          borderRadius: 1,
        }}
        flexDirection="column"
      >
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            Agregar Usuario Sucursal
          </Typography>
          <hr />
        </Grid>
        <Grid
          container
          flex={1}
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          gap={3}
        >
          {[
            {
              label: "nombre",
              value: nombre,
              handleOnChange: (event) => {
                setNombre(event.target.value);
              },
              type: "text",
            },
            {
              label: "apellido",
              value: apellido,
              handleOnChange: (event) => {
                setApellido(event.target.value);
              },
              type: "text",
            },
            {
              label: "correo",
              value: correo,
              handleOnChange: (event) => {
                setCorreo(event.target.value);
              },
              type: "text",
            },
            {
              label: "contrasenia",
              value: contrasenia,
              handleOnChange: (event) => {
                setContrasenia(event.target.value);
              },
              type: "password",
            },
            {
              label: "telefono",
              value: telefono,
              handleOnChange: (event) => {
                setTelefono(event.target.value);
              },
              type: "number",
            },
            {
              label: "usuario",
              value: usuario,
              handleOnChange: (event) => {
                setUsuario(event.target.value);
              },
              type: "text",
            },
            {
              label: "fechaNacimiento",
              value: fechaNacimiento,
              handleOnChange: (event) => {
                setFechaNacimiento(event.target.value);
              },
              type: "date",
            },
            {
              label: "sucursalId",
              value: sucursalId,
              handleOnChange: (event) => {
                setSucursalId(event.target.value);
              },
              type: "text",
            },
          ].map((elem) => (
            <TextFieldGridItem
              key={elem.label}
              label={elem.label}
              handleOnChange={elem.handleOnChange}
              value={elem.value}
              type={elem.type}
            />
          ))}
        </Grid>
        <Grid container justifyContent="flex-end" gap={2} pr={1}>
          <Button
            variant="contained"
            sx={{
              border: "1px solid #fff",
              backgroundImage:
                "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
              "&: hover": {
                backgroundImage:
                  "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
              },
              color: "#fff",
            }}
            size="small"
          >
            Cancelar
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              border: "1px solid #fff",
              backgroundImage:
                "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
              "&: hover": {
                backgroundImage:
                  "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
              },
              color: "#fff",
            }}
            type="submit"
          >
            Crear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

interface TextFieldGridItemProps {
  label: string;
  sx?: SxProps<Theme> | undefined;
  sm?: boolean | GridSize | undefined;
  value: string | number | undefined;
  handleOnChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  type: HTMLInputTypeAttribute | undefined;
}

const TextFieldGridItem = ({
  label,
  sx,
  sm = 5,
  value,
  handleOnChange,
  type,
}: TextFieldGridItemProps) => (
  <Grid item xs={12} sm={sm} my={1} sx={sx}>
    <CustomTextField
      type={type}
      fullWidth
      label={label === "contrasenia" ? "contraseña" : label}
      variant="filled"
      size="small"
      value={value || ""}
      onChange={handleOnChange}
      InputLabelProps={{ shrink: true }}
    />
  </Grid>
);

const CustomTextField = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    backgroundColor: "#fff !important",
  },
}));
