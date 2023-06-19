import {
  Snackbar,
  Alert,
  Grid,
  Typography,
  TextField,
  styled,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Producto } from "../../interfaces/interfaces";
import { Clear, Check } from "@mui/icons-material";
import { useCrearPromocionProductoMutation } from "../../store/super5/super5Api";

export const CrearPromocionProducto = () => {
  const { id: productoID } = useParams();

  const [fechaInicio, setFechaInicio] = useState<string>();
  const [fechaFin, setFechaFin] = useState<string>();
  const [porcentajeDescuento, setPorcentajeDescuento] = useState<string>();
  const [productoId, setProductoId] = useState<string | undefined>(productoID);

  const [startCrearPromocion] = useCrearPromocionProductoMutation();

  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState<{
    show: boolean;
    isError: boolean;
    message: string;
  } | null>(null);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!fechaInicio || !fechaFin || !porcentajeDescuento || !productoId) {
      setShowSnackbar({
        show: true,
        isError: true,
        message: "Todos los campos son obligatorios",
      });
      return;
    }
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);

    if (isNaN(Number(porcentajeDescuento)) || fechaInicioDate > fechaFinDate) {
      setShowSnackbar({
        show: true,
        isError: true,
        message: `El porcentaje de descuento debe ser un numero y
           la fecha de inicio de la promocion debe ser anterior a la fecha de fin`,
      });
      return;
    }
    startCrearPromocion({
      fechaDesde: fechaInicio,
      fechaHasta: fechaFin,
      porcDescuentoProducto: +porcentajeDescuento,
      producto: { id: +productoId! },
      tipoPromo: "PRODUCTO",
    })
      .unwrap()
      .then((resp) => {
        console.log(resp);
        setShowSnackbar({
          isError: false,
          show: true,
          message: "La promoción ha sido creada",
        });
      })
      .catch((err) => {
        console.log(err);
        setShowSnackbar({
          show: true,
          isError: true,
          message: "Algo ha salido mal al crear la promoción",
        });
      });
  };
  useEffect(() => {
    if (productoID) return;
    navigate(-1);
  }, [productoID]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Snackbar
        open={showSnackbar?.show || undefined}
        autoHideDuration={2000}
        onClose={() => {
          setShowSnackbar((prev) => ({
            isError: prev?.isError || false,
            message: prev?.message || "",
            show: false,
          }));
        }}
      >
        <Alert
          sx={{ fontSize: 11 }}
          severity={showSnackbar?.isError ? "error" : "success"}
          variant="filled"
        >
          {showSnackbar?.message}
        </Alert>
      </Snackbar>
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
            Crear promoción
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
            <CustomTextField
              fullWidth
              label="Fecha de inicio"
              variant="filled"
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={fechaInicio || ""}
              onChange={(event) => {
                setFechaInicio(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5} my={1}>
            <CustomTextField
              fullWidth
              label="Fecha de fin"
              variant="filled"
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={fechaFin || ""}
              onChange={(event) => {
                setFechaFin(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5} my={1}>
            <CustomTextField
              autoComplete="off"
              fullWidth
              label="Porcentaje de descuento"
              variant="filled"
              size="small"
              type="number"
              InputLabelProps={{ shrink: true }}
              value={porcentajeDescuento || ""}
              onChange={(event) => {
                setPorcentajeDescuento(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5} my={1}>
            <CustomTextField
              disabled
              value={productoId || ""}
              fullWidth
              label="Producto id"
              variant="filled"
              size="small"
              type="text"
              InputLabelProps={{ shrink: true }}
            />
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
    </form>
  );
};

const CustomTextField = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    backgroundColor: "#fff !important",
  },
}));
