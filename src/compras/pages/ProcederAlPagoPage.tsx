import {
  ConfirmationNumber,
  Delete,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  SvgIconTypeMap,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { CarritoItem, Direccion, Producto } from "../../interfaces/interfaces";
import { useAppSelector } from "../../hooks/hooks";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useGetDireccionesQuery } from "../../store/super5/super5Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../carrito/hooks/useCarrito";

const showSnackbarInitialState = {
  isError: false,
  show: false,
  message: "",
};

export const ProcederAlPagoPage = () => {
  const [showSnackbar, setShowSnackbar] = useState<{
    isError: boolean;
    show: boolean;
    message: string;
  }>(showSnackbarInitialState);
  const { status } = useAppSelector((state) => state.auth);
  const { carrito } = useAppSelector((state) => state.super5);
  const [direccion, setDireccion] = useState<Direccion | null>(null);
  const [tipoEnvio, setTipoEnvio] = useState<"DOMICILIO" | "SUCURSAL" | null>();
  const {
    agregarItemAlCarrito,
    calcularPrecioTotalCarrito,
    quitarItemDelCarrito,
    handlePagarCompra,
    isError,
    error,
  } = useCarrito();

  useEffect(() => {
    if (!error) return;
    setShowSnackbar({
      isError: true,
      message: error,
      show: true,
    });
  }, [error, isError]);

  const handleOnSelectInformacionAdicional = (
    tipoEnvio: "DOMICILIO" | "SUCURSAL",
    direccion: Direccion | null
  ) => {
    setDireccion(direccion);
    setTipoEnvio(tipoEnvio);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (status === "not-authenticated") {
      setShowSnackbar({
        isError: true,
        message:
          "Debe estar logueado para poder realizar una compra, por favor ingrese con su cuenta o registrese",
        show: true,
      });
      return;
    }
    if (!tipoEnvio || carrito.length <= 0) {
      setShowSnackbar({
        isError: true,
        message:
          "Debe seleccionar el tipo de envio ademas tener productos en el carrito para proceder con la compra",
        show: true,
      });
      return;
    }
    console.log(direccion);
    if (!direccion && tipoEnvio === "DOMICILIO") {
      setShowSnackbar({
        isError: true,
        message:
          " Es necesario agregar un domicilio antes de realizar la compra",
        show: true,
      });
      return;
    }
    if (tipoEnvio === "DOMICILIO") {
      const id = direccion?.id;
      if (!id) {
        setShowSnackbar({
          isError: true,
          message:
            " Es necesario agregar un domicilio antes de realizar la compra",
          show: true,
        });
        return;
      }
      handlePagarCompra(tipoEnvio, +id);
    } else {
      handlePagarCompra(tipoEnvio);
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <Grid container py={5} px={4} gap={1}>
        <Grid container gap={4}>
          <Grid item xs={12} sm={6}>
            <Grid container gap={2}>
              <Grid item xs={12} mb={1}>
                <SectionTitle title="Mi Carrito" Icon={ShoppingCart} />
                <ProductList
                  products={carrito}
                  modificarCarrito={agregarItemAlCarrito}
                  quitarProductoDelCarrito={quitarItemDelCarrito}
                />
              </Grid>
              <Grid item xs={12} mb={1}>
                <SectionTitle title="Informacion adicional" Icon={Person} />
                <InformacionAdicionalSection
                  handleOnSelectInformacionAdicional={
                    handleOnSelectInformacionAdicional
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={5}>
            <PagoFinal subTotal={calcularPrecioTotalCarrito()} />
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={showSnackbar?.show}
        autoHideDuration={4000}
        onClose={() => {
          setShowSnackbar((prev) => ({
            isError: prev.isError,
            message: prev.message,
            show: false,
          }));
        }}
      >
        <Alert
          severity={showSnackbar.isError ? "error" : "success"}
          variant="filled"
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
interface SectionTitleProps {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}
const SectionTitle = ({ title, Icon }: SectionTitleProps) => {
  return (
    <Grid container alignItems="center" mb={1}>
      <Icon fontSize="large" sx={{ color: "#cc0045" }} />
      <Typography variant="h5" component="h5">
        {title}
      </Typography>
    </Grid>
  );
};

const PagoFinal = ({
  subTotal,
  precioEnvio,
}: {
  subTotal: number;
  precioEnvio?: number;
}) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={4}>
      <Grid container flexDirection="column" p={1} gap={1}>
        <Grid item xs={12}>
          <AplicarCupon />
        </Grid>
        <Divider />
        <Grid container>
          <Grid container justifyContent="space-between">
            <Typography>Subtotal:</Typography>
            <Typography>{subTotal}</Typography>
          </Grid>
          <Grid container justifyContent="space-between">
            <Typography>Costo del envio:</Typography>
            <Typography>{precioEnvio ? precioEnvio : "Gratis"}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container flexDirection="column" gap={1}>
          <Grid container justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography>
              {precioEnvio ? precioEnvio + subTotal : subTotal}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#e6004d",
                color: "#fff",
                "&: hover": { backgroundColor: "#cc0045", color: "#fff" },
              }}
              type="submit"
            >
              Proceder al pago
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#e6004d",
                color: "#e6004d",
                "&: hover": {
                  borderColor: "#cc0045",
                  color: "#cc0045",
                },
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Seguir comprando
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const AplicarCupon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { sm: "center" },
        gap: 1,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <ConfirmationNumber
        fontSize="large"
        sx={{
          color: "#e6004d",
        }}
      />
      <CustomTextField fullWidth size="small" variant="outlined" />
      <Button
        size="small"
        sx={{
          backgroundColor: "#e6004d",
          color: "#fff",
          "&: hover": { backgroundColor: "#cc0045", color: "#fff" },
        }}
      >
        aplicar
      </Button>
    </Box>
  );
};

const CustomTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    height: "10px",
  },
}));

interface ProductListProps {
  products: CarritoItem[];
  modificarCarrito: (producto: Producto, cantidad: number) => void;
  quitarProductoDelCarrito: (producto: Producto) => void;
}

const ProductList = ({
  products,
  modificarCarrito,
  quitarProductoDelCarrito,
}: ProductListProps) => {
  return (
    <Paper>
      {products.length <= 0 ? (
        <Typography variant="body1" component="h6" pt={2} pl={2}>
          No hay productos para mostrar
        </Typography>
      ) : (
        ""
      )}
      <List sx={{ py: { xs: 0, sm: 1 }, px: 0 }}>
        {products.map(({ cantidad, producto }, index) => (
          <Box key={producto.id}>
            <ListItem
              key={producto.id}
              sx={{
                px: { xs: 0, sm: 1 },
                flex: 1,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <ListItemAvatar sx={{ minWidth: { xs: 43, sm: 56 } }}>
                <Avatar
                  src={producto.imagen}
                  sx={{ width: { xs: 60, sm: 40 }, height: { xs: 60, sm: 40 } }}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography variant="caption">
                  {producto.descripcion}
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <ButtonGroup size="small">
                    <Button
                      onClick={() => {
                        modificarCarrito(producto, cantidad - 1);
                      }}
                    >
                      -1
                    </Button>
                    <Button>{cantidad}</Button>
                    <Button
                      onClick={() => {
                        modificarCarrito(producto, cantidad + 1);
                      }}
                    >
                      +1
                    </Button>
                  </ButtonGroup>
                </Box>
              </ListItemText>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: "100%",
                  alignSelf: { sm: "flex-end", xs: "center" },
                }}
              >
                <Box sx={{ position: "absolute", top: 0, right: { xs: 1 } }}>
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      onClick={() => {
                        quitarProductoDelCarrito(producto);
                      }}
                    >
                      <Delete fontSize="small" sx={{ color: "#cc0045" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography
                  variant="caption"
                  component="span"
                  mr={{ xs: 1, sm: 0 }}
                  sx={{ color: "#cc0045" }}
                >
                  {producto.precioDescuento || producto.precio}
                </Typography>
              </Box>
            </ListItem>
            {!(index === products.length - 1) && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

const InformacionAdicionalSection = ({
  handleOnSelectInformacionAdicional,
}: {
  handleOnSelectInformacionAdicional: (
    tipoEnvio: "DOMICILIO" | "SUCURSAL",
    direccion: Direccion | null
  ) => void;
}) => {
  const { isLoading, data } = useGetDireccionesQuery();
  const [tipoEnvio, setTipoEnvio] = useState<"DOMICILIO" | "SUCURSAL">(
    "DOMICILIO"
  );
  const [direccion, setDireccion] = useState<Direccion | null>(null);

  useEffect(() => {
    handleOnSelectInformacionAdicional(tipoEnvio, direccion);
  }, [tipoEnvio, direccion]);

  const navigate = useNavigate();
  const handleCambioTipoEnvio = (
    _: React.MouseEvent<HTMLElement>,
    newTipoEnvio: "DOMICILIO" | "SUCURSAL"
  ) => {
    setTipoEnvio(newTipoEnvio);
    handleOnSelectInformacionAdicional(tipoEnvio, direccion);
  };
  return (
    <Paper>
      <Box
        sx={{
          py: 2,
          px: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <StyledToggleButtonGroup
          color="primary"
          size="small"
          value={tipoEnvio}
          exclusive
          onChange={handleCambioTipoEnvio}
        >
          <ToggleButton value="DOMICILIO">Domicilio</ToggleButton>
          <ToggleButton value="SUCURSAL">Sucursal</ToggleButton>
        </StyledToggleButtonGroup>
        <Typography>Seleccionar direccion:</Typography>
        <Autocomplete
          disabled={tipoEnvio !== "DOMICILIO"}
          value={direccion || null}
          onChange={(_, newDireccion) => {
            setDireccion(newDireccion);
          }}
          getOptionLabel={(props) => props.direccion}
          loading={isLoading}
          noOptionsText="No hay direcciones"
          options={data || []}
          renderInput={(props) => (
            <CustomTextField2 {...props} label="Mis direcciones" />
          )}
        />
        <Button
          disabled={tipoEnvio !== "DOMICILIO"}
          size="small"
          onClick={() => {
            navigate("/user/address");
          }}
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#e6004d",
            color: "#fff",
            "&: hover": { backgroundColor: "#cc0045", color: "#fff" },
          }}
        >
          Agregar direccion
        </Button>
      </Box>
    </Paper>
  );
};
const CustomTextField2 = styled(TextField)(() => ({}));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  /*  "& .MuiToggleButtonGroup-groupedHorizontal": {
    color: "#cc0045",
  }, */
}));
