import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCrearCategoriaMutation } from "../../store/super5/super5Api";

export const CrearCategoriaPage = () => {
  const [snackbar, setSnackbar] = useState<{
    isSuccess: boolean;
    message: string;
    show: boolean;
  } | null>(null);

  const navigate = useNavigate();
  const [nombreCategoria, setNombreCategoria] = useState<string | null>(null);
  const [startCrearCategoria, { isLoading }] = useCrearCategoriaMutation();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!nombreCategoria) return;

    startCrearCategoria({ nombre: nombreCategoria })
      .unwrap()
      .then((_) => {
        setSnackbar({
          isSuccess: true,
          message: "Categoria creada",
          show: true,
        });
      })
      .catch((err) => {
        setSnackbar({ isSuccess: false, message: err.data, show: true });
      });
    setNombreCategoria(null);
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
              Crear Categoria
            </Typography>
            <hr />
          </Grid>
          <Grid item xs={12} py={1}>
            <CustomTextField
              variant="filled"
              label="Nombre de la categoria"
              fullWidth
              value={nombreCategoria || ""}
              onChange={(event) => {
                setNombreCategoria(event.target.value);
              }}
            />
          </Grid>
          <Grid container justifyContent="flex-end" gap={1}>
            {isLoading && (
              <Grid container flex={1} justifyContent="center">
                <CircularProgress size={30} />
              </Grid>
            )}
            <Button
              color="inherit"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancelar
            </Button>
            <Button color="inherit" type="submit">
              Agregar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbar?.show || false}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={() => {
          setSnackbar((prev) => {
            const message = prev?.message || "";
            const isSuccess = prev?.isSuccess || false;
            return {
              message,
              isSuccess,
              show: false,
            };
          });
        }}
        autoHideDuration={3000}
      >
        <Alert
          severity={snackbar && snackbar.isSuccess ? "success" : "error"}
          variant="filled"
        >
          {snackbar && snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const CustomTextField = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    backgroundColor: "#fff !important",
  },
}));
