import { Info, ShoppingCart, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { Producto } from "../../interfaces/interfaces";
import { Footer } from "../components/Footer";
import { useProducto } from "../../productos/hooks/useProducto";
import { useCarrito } from "../../compras/carrito/hooks/useCarrito";
import { ProductosSlideRecomendados } from "../../productos/components/ProductosSlideRecomendados";
import { useEffect } from "react";

export const VerDetallesDelProductoComprador = () => {
  const { id } = useParams();
  const location = useLocation();
  const producto: Producto = location.state;

  useEffect(() => {
    scrollTo(0, 0);
  }, [producto]);

  if (!producto)
    return <Skeleton variant="rectangular" width="100%" height="100vh" />;

  return (
    <>
      <Grid
        container
        gap={4}
        py={2}
        px={{ xs: 1, sm: 2 }}
        minHeight="100vh"
        flexDirection="column"
        className="animate__animated animate__fadeInLeft"
      >
        <Grid container gap={{ xs: 1, md: 0 }}>
          <Grid item xs={12} md={6} px={{ sm: 8, xs: 1, lg: 11 }} height={460}>
            <MediaDelProducto imagen={producto.imagen} />
          </Grid>
          <Grid item xs={12} md={6} px={{ md: 4 }}>
            <IdentificacionDelProducto producto={producto} />
          </Grid>
        </Grid>
        <Grid item xs={12} bgcolor="beige">
          <DescripcionDelProducto descripcion={producto.descripcion} />
        </Grid>
        <Grid container flex={1}>
          <Grid item xs={12}>
            <ProductosSlideRecomendados
              categoria={{
                id: producto.categoriaId + "",
                nombre: "Productos similares",
              }}
              productoId={producto.id}
            />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

const MediaDelProducto = ({ imagen }: { imagen: string }) => {
  return (
    <Paper
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      elevation={4}
    >
      <Avatar
        variant="square"
        src={imagen || ""}
        sx={{
          width: "100%",
          maxWidth: 400,
          height: "auto",
        }}
      />
    </Paper>
  );
};

interface IdentificacionDelProductoProps {
  producto: Producto;
}

const IdentificacionDelProducto = ({
  producto,
}: IdentificacionDelProductoProps) => {
  const { nombre, precio, precioDescuento } = producto;
  return (
    <Grid container flexDirection="column" gap={1}>
      <Grid item xs={12} md={8}>
        <Typography variant="h5">{nombre}</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container alignItems="center" gap={1}>
          {precioDescuento && precioDescuento !== precio && (
            <Typography
              variant="h6"
              component="span"
              mr={1}
              sx={{ textDecoration: "line-through", color: "#8F8F8F" }}
            >
              ${precio}
            </Typography>
          )}
          {precioDescuento && precioDescuento !== precio && (
            <Typography
              variant="body2"
              component="span"
              sx={{
                bgcolor: "#40AA60",
                py: 0.5,
                px: 1.5,
                borderRadius: 1,
                color: "#fff",
              }}
            >
              {`%${
                precioDescuento
                  ? ((precio - precioDescuento) / precio) * 100
                  : ""
              }`}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" component="span" fontWeight="medium">
          $
          {precioDescuento && precioDescuento !== precio
            ? precioDescuento
            : precio}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <BotonDeAgregarProducto producto={producto} />
      </Grid>
      <Grid container alignItems="center">
        <Info fontSize="small" color="primary" />
        <Typography>Producto sujeto a disponibilidad de stock.</Typography>
      </Grid>
    </Grid>
  );
};

const BotonDeAgregarProducto = ({ producto }: { producto: Producto }) => {
  const { aumentarCantidadProducto, cantidad, reducirCantidadProducto } =
    useProducto(producto.id);
  const { agregarItemAlCarrito, quitarItemDelCarrito } = useCarrito();
  return (
    <>
      {cantidad === 0 ? (
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#e6004d",
            color: "#fff",
            "&: hover": { backgroundColor: "#cc0045", color: "#fff" },
          }}
          onClick={() => {
            agregarItemAlCarrito(producto, 1);
          }}
        >
          <ShoppingCart /> Agregar
        </Button>
      ) : (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Box
            aria-label="cantidadProducto"
            sx={{
              color: "#ff0056",
              display: "flex",
              alignItems: "center",
              borderColor: "black",
            }}
          >
            <Button
              size="large"
              sx={{
                borderColor: "black",
                color: "#ff0056",
                borderRight: 1,
                fontSize: "14px",
              }}
              onClick={() => {
                if (cantidad === 1) {
                  quitarItemDelCarrito(producto);
                  return;
                }
                agregarItemAlCarrito(producto, cantidad - 1);
                reducirCantidadProducto();
              }}
            >
              -
            </Button>
            <Button
              sx={{
                borderColor: "black",
                fontSize: "14px",
                color: "#ff0056",
              }}
              size="large"
              disableRipple
              disableFocusRipple
            >
              {cantidad}
            </Button>
            <Button
              sx={{
                borderColor: "black",
                color: "#ff0056",
                fontSize: "14px",
              }}
              size="large"
              onClick={() => {
                agregarItemAlCarrito(producto, cantidad + 1);
                aumentarCantidadProducto();
              }}
            >
              +
            </Button>
          </Box>
        </ButtonGroup>
      )}
    </>
  );
};

const DescripcionDelProducto = ({ descripcion }: { descripcion: string }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Descripción</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{descripcion}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
