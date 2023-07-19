import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  useGetCategoriasQuery,
  useModificarProductoMutation,
} from "../../store/super5/super5Api";
import { Clear, Check } from "@mui/icons-material";
import {
  Box,
  Grid,
  Tooltip,
  IconButton,
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
  Typography,
} from "@mui/material";
import { Producto } from "../../interfaces/interfaces";

export const ModificarProductoPage = () => {
  const location = useLocation();
  const producto: Producto = location.state;
  const navigate = useNavigate();
  const [startModificarProducto] = useModificarProductoMutation();
  const { handleInputChange, values, descripcion, nombre, precio, reset } =
    useForm({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
    });
  const [image, setImage] = useState<string>(producto.imagen);
  const [categoria, setCategoria] = useState<{ id: number; nombre: string }>({
    id: producto.categoriaId,
    nombre: "",
  });
  const handleOnChangeFile = (imageURL: string) => {
    setImage(imageURL);
  };
  const handleOnChangeAutocomplete = (value) => {
    setCategoria(value);
  };
  const inputs: ProductoInputProps[] = [
    {
      label: "nombre",
      handleInputChange,
      name: "nombre",
      value: values.nombre,
      type: "text",
    },
    {
      label: "descripcion",
      handleInputChange,
      name: "descripcion",
      value: values.descripcion,
      type: "text",
    },
    {
      label: "precio",
      handleInputChange,
      name: "precio",
      value: values.precio + "",
      type: "number",
    },
  ];

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!categoria || !descripcion || !nombre || !precio) return;
    if (precio < 0) {
      alert("El precio no puede ser negativo");
      return;
    }
    const categoriaID = categoria.id;

    startModificarProducto({
      ...producto,
      nombre: values.nombre,
      descripcion: values.descripcion,
      precio: values.precio,
      categoriaId: categoriaID,
      imagen: image,
    })
      .unwrap()
      .then((resp) => {
        navigate("/administrador/productos/modificar", {
          state: { accionExitosa: true, mensajeError: null },
        });
      })
      .catch((error) => {
        console.log(error);
        navigate("/administrador/productos/modificar", {
          state: { accionExitosa: false, mensajeError: error },
        });
      });
    reset();
  };
  if (!producto) navigate("/");
  return (
    <Box
      className="animate__animated animate__fadeIn"
      sx={{
        width: "100%",
        minHeight: "98vh",

        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleOnSubmit}>
        <Grid
          sx={{
            bgcolor: "#333",
            color: "#fff",
            borderRadius: 1,
          }}
          container
          p={2}
          justifyContent="space-between"
          alignItems="center"
          pt={4}
          pb={2}
          gap={2}
        >
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              {" "}
              Modificar Producto
            </Typography>
            <hr />
          </Grid>
          <Grid container>
            <Grid item xs={12} md={4} mb={2}>
              <ImageTextField
                handleOnChangeFile={handleOnChangeFile}
                defaultValue={producto.imagen}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container sx={{ px: 1 }} gap={4}>
                {inputs.map((input) => (
                  <Grid item xs={12} key={input.name}>
                    <ProductoInput
                      type={input.type}
                      name={input.name}
                      handleInputChange={input.handleInputChange}
                      label={input.label}
                      value={input.value}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <CrearProductoAutocomplete
                    handleOnAutocompleteChange={handleOnChangeAutocomplete}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justifyContent="flex-end"
                gap={2}
                pr={5}
                mt={2}
                alignItems="center"
              >
                <Box>
                  <Tooltip title="Cancelar">
                    <IconButton
                      onClick={() => {
                        navigate(-1);
                      }}
                      size="small"
                      sx={{
                        border: "1px solid #fff",
                        backgroundImage:
                          "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
                        "&: hover": {
                          backgroundImage:
                            "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
                        },
                      }}
                    >
                      <Clear sx={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title="Confirmar">
                    <IconButton
                      size="small"
                      type="submit"
                      sx={{
                        border: "1px solid #fff",
                        backgroundImage:
                          "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
                        "&: hover": {
                          backgroundImage:
                            "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
                        },
                      }}
                    >
                      <Check sx={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

type ProductoInputProps = {
  name: string;
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: "text" | "number";
};

const ProductoInput = ({
  name,
  value,
  handleInputChange,
  label,
  type,
}: ProductoInputProps) => {
  return (
    <CustomTextField
      fullWidth
      label={label}
      variant="filled"
      name={name}
      value={value}
      onChange={handleInputChange}
      type={type}
      autoComplete="off"
    />
  );
};

const ImageTextField = ({
  handleOnChangeFile,
  defaultValue,
}: {
  handleOnChangeFile: (image: string) => void;
  defaultValue: string;
}) => {
  const [imageURL, setImageURL] = useState<string>(defaultValue);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!imageURL) return;
    handleOnChangeFile(imageURL);
  }, [imageURL]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1,
      }}
    >
      <Avatar
        src={imageURL}
        variant="rounded"
        sx={{ width: { xs: 150, sm: 200 }, height: { xs: 150, sm: 200 } }}
      />
      <Dialog open={showDialog}>
        <DialogTitle textAlign="center">Agregar imagen URL</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            variant="filled"
            placeholder="imagenURL"
            value={value}
            sx={{ width: 350 }}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowDialog(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setImageURL(value);
              setShowDialog(false);
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        sx={{
          border: "1px solid #fff",
          backgroundImage:
            "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
          "&: hover": {
            backgroundImage:
              "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
          },
        }}
        size="small"
        component="label"
        variant="contained"
        onClick={() => {
          setShowDialog(true);
        }}
      >
        Agregar Imagen
      </Button>
    </Box>
  );
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    backgroundColor: "#fff !important",
  },
}));

const CrearProductoAutocomplete = ({
  handleOnAutocompleteChange,
}: {
  handleOnAutocompleteChange: (value: any) => void;
}) => {
  const { isLoading, data } = useGetCategoriasQuery();
  return (
    <Autocomplete
      loading={isLoading}
      onChange={(event, newValue) => {
        handleOnAutocompleteChange(newValue);
      }}
      getOptionLabel={(option: any) => option.nombre}
      id="combo-box"
      options={data || []}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          variant="filled"
          label="Categorias"
          fullWidth
        />
      )}
    />
  );
};
