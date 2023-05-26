import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Producto } from "../../interfaces/interfaces";
import { useProducto } from "../hooks/useProducto";

interface ProductoCardProps {
  producto: Producto;
}

export const ProductoCard = ({ producto }: ProductoCardProps) => {
  const {
    handleAgregarItemAlCarrito,
    aumentarCantidadProducto,
    cantidad,
    reducirCantidadProducto,
  } = useProducto();

  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardMedia
        sx={{ mt: 1 }}
        component="img"
        height={100}
        src={producto.imagen}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingBottom: 0,
        }}
      >
        <Typography variant="caption" fontSize={10} color="#777">
          categoria: {producto.categoriaId}
        </Typography>
        <Typography variant="body2">{producto.descripcion}</Typography>
        <Typography
          variant="body2"
          fontSize={12}
          fontWeight="bold"
          color="primary"
          my={1}
        >
          $ {producto.precio}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingBottom: 0, paddingX: 0 }}>
        <Box
          aria-label="cantidadProducto"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            onClick={() => {
              if (cantidad < 1) return;
              reducirCantidadProducto();
            }}
          >
            -1
          </Button>
          <Typography variant="caption" component="span" marginX={1}>
            {cantidad}
          </Typography>
          <Button
            size="small"
            onClick={() => {
              aumentarCantidadProducto();
            }}
          >
            +1
          </Button>
        </Box>
      </CardActions>
      <CardActions sx={{ paddingTop: 0 }}>
        <Button
          size="small"
          fullWidth
          onClick={() => {
            handleAgregarItemAlCarrito(producto);
          }}
        >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
};
