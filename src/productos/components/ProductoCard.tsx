import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Producto } from "../../interfaces/interfaces";
import { useProducto } from "../hooks/useProducto";
import { useCarrito } from "../../compras/carrito/hooks/useCarrito";
import { ShoppingCart } from "@mui/icons-material";

interface ProductoCardProps {
  producto: Producto;
}

export const ProductoCard = ({ producto }: ProductoCardProps) => {
  const { aumentarCantidadProducto, cantidad, reducirCantidadProducto } =
    useProducto();

  const { agregarItemAlCarrito } = useCarrito();

  return (
    <Card sx={{ maxWidth: 160, height: 360, boxShadow: 5 }}>
      <Grid container justifyContent={"center"} >
        <CardMedia
          sx={{ mt: 1, width: 150, height: 150 }}
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

          <Typography
            textAlign={"left"}
            sx={{ height: 60, width: 141, backgroundColor: "white" }}
            variant="body2"
            textOverflow={"clip"}
          >
            {producto.descripcion}
          </Typography>
          <Typography
            textAlign={"left"}
            variant="body2"
            fontSize={16}
            fontWeight="bold"
            color="primary"
            my={1}
          >
            $ {producto.precio}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingBottom: 0, paddingX: 0, marginBottom: 1 }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Box
              aria-label="cantidadProducto"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                sx={{ borderRight: 1 }}
                onClick={() => {
                  if (cantidad < 1) return;
                  reducirCantidadProducto();
                }}
              >
                -1
              </Button>
              <Button size="small">
                {cantidad}
              </Button>
              <Button
                size="small"
                onClick={() => {
                  aumentarCantidadProducto();
                }}
              >
                +1
              </Button>
            </Box>
          </ButtonGroup>
        </CardActions>

        <CardActions sx={{ paddingTop: 0, width: "100%" }}>
          <Button
            sx={{
              backgroundColor: "#007aff", color: "white", gap: 1, '&:hover': { color: "#007aff", borderBlockColor: "#007aff", border: 2 }
            }}
            size="small"
            fullWidth
            onClick={() => {
              agregarItemAlCarrito(producto, cantidad);
            }}
          >
            <ShoppingCart fontSize="small" /> Agregar
          </Button>
        </CardActions>
      </Grid>

    </Card >
  );
};
