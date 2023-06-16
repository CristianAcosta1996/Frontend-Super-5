import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Check, Clear } from "@mui/icons-material";
import {
  useCrearProductoMutation,
  useGetCategoriasQuery,
} from "../../store/super5/super5Api";
import { useNavigate } from "react-router-dom";

export const CrearProductoPage = () => {
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [startCrearProducto, { isSuccess, isError }] =
    useCrearProductoMutation();
  const { handleInputChange, values, descripcion, nombre, precio, reset } =
    useForm({
      nombre: "",
      precio: "",
      descripcion: "",
    });
  const [image, setImage] = useState<string>();
  const [categoria, setCategoria] = useState<{ id: number; nombre: string }>();
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
    const categoriaID = categoria.id;
    startCrearProducto({
      categoriaId: categoriaID,
      descripcion,
      eliminado: false,
      imagen: image || "",
      nombre,
      precio: +precio,
    })
      .unwrap()
      .then((resp) => {
        console.log(resp);
        setShowSnackbar(true);
        setMessage("Producto creado correctamente!");
      })
      .catch((error) => {
        console.log(error);
        setShowSnackbar(true);
        setMessage(error.data);
      });
    reset();
  };
  return (
    <Box
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
          className="animate__animated animate__fadeIn"
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
              Crear Producto
            </Typography>
            <hr />
          </Grid>
          <Grid container>
            <Grid item xs={12} md={4} mb={2}>
              <ImageTextField handleOnChangeFile={handleOnChangeFile} />
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
        <Snackbar
          open={showSnackbar}
          onClose={() => {
            setShowSnackbar(false);
          }}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={isSuccess ? "success" : isError ? "error" : undefined}
            variant="filled"
          >
            {message}
          </Alert>
        </Snackbar>
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
}: {
  handleOnChangeFile: (image: string) => void;
}) => {
  const [imageURL, setImageURL] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  /* const { image, preview, handleFileChange } = useImageTextField(); */
  /* useEffect(() => {
    if (!image) return;
    handleOnChangeFile(image);
  }, [image]); */
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
        {/*  <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/*"
        /> */}
      </Button>
    </Box>
  );
};

const useImageTextField = () => {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
      return;
    }
    setPreview("");
  }, [image]);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  return {
    handleFileChange,
    image,
    preview,
  };
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
      getOptionLabel={(option) => option.nombre}
      id="combo-box"
      options={data || []}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="Categorias"
          fullWidth
          variant="filled"
        />
      )}
    />
  );
};
