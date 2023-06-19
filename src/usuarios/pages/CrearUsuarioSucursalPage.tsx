import { Theme } from "@emotion/react";
import {
  SxProps,
  GridSize,
  Grid,
  styled,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";
import {
  useCrearUsuarioSucursalMutation,
  useGetSucursalesQuery,
} from "../../store/super5/super5Api";
import { Sucursal } from "../../interfaces/interfaces";

export const CrearUsuarioSucursalPage = () => {
  const [showMessage, setShowMessage] = useState<{
    isSuccess: boolean;
    message: string;
    show: boolean;
  } | null>();

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [correo, setCorreo] = useState();
  const [contrasenia, setContrasenia] = useState();
  const [telefono, setTelefono] = useState();
  const [usuario, setUsuario] = useState();
  const [fechaNacimiento, setFechaNacimiento] = useState();
  const [sucursal, setSucursal] = useState<Sucursal | null>();

  const [startCrearUsuarioSucursal] = useCrearUsuarioSucursalMutation();
  const { isLoading, data } = useGetSucursalesQuery();

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
      !sucursal
    )
      return;

    startCrearUsuarioSucursal({
      nombre,
      apellido,
      contrasenia,
      correo,
      fechaNacimiento,
      sucursalId: sucursal.id,
      telefono,
      usuario,
    })
      .unwrap()
      .then((resp) => {
        console.log(resp);
        setShowMessage({
          isSuccess: true,
          message: "Usuario sucursal creado!",
          show: true,
        });
      })
      .catch((error) => {
        console.error(error);
        setShowMessage({
          isSuccess: false,
          message: `${error.data}, vuelva a intentarlo mas tarde`,
          show: true,
        });
      });
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
          <Grid item xs={12} sm={5} my={1}>
            <Autocomplete
              size="small"
              loading={isLoading}
              value={sucursal || null}
              onChange={(_, newValue) => {
                setSucursal(newValue);
              }}
              getOptionLabel={(option) => option.nombre}
              noOptionsText="No hay sucursales"
              options={data || []}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label="Sucursal"
                  fullWidth
                  variant="filled"
                />
              )}
            />
          </Grid>
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
      <Snackbar
        open={showMessage?.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => {
          setShowMessage((prev) => {
            if (prev) {
              return {
                isSuccess: prev.isSuccess,
                message: prev.message,
                show: false,
              };
            }
            return null;
          });
        }}
      >
        <Alert
          severity={showMessage && showMessage.isSuccess ? "success" : "error"}
        >
          {showMessage && showMessage.message}
        </Alert>
      </Snackbar>
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
