import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
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
import { useNavigate } from "react-router-dom";

interface ProductoCardProps {
  producto: Producto;
}

export const ProductoCard = ({ producto }: ProductoCardProps) => {
  const { aumentarCantidadProducto, cantidad, reducirCantidadProducto } =
    useProducto(producto.id);

  const navigate = useNavigate();

  const { agregarItemAlCarrito, quitarItemDelCarrito } = useCarrito();

  if (!producto.aplicaDescuento) {
    return (
      <Card sx={{ minWidth: 140, maxWidth: 160, height: 350, boxShadow: 5 }}>
        <Grid container justifyContent={"center"}>
          <CardActionArea
            onClick={() => {
              navigate(`/producto/${producto.id}`, { state: producto });
            }}
          >
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
                sx={{
                  width: 141,
                  height: 60,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  marginLeft: 0,
                }}
                variant="body2"
                title={producto.descripcion}
              >
                {producto.descripcion}
              </Typography>
              <Typography
                textAlign={"left"}
                variant="body2"
                fontSize={16}
                fontWeight="bold"
                color="#ff0056"
                my={1}
                sx={{
                  display: "flex",
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                }}
              >
                ${producto.precio}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions
            sx={{
              paddingBottom: 0,
              paddingX: 0,
              marginBottom: 2 / 5,
              marginTop: 0,
            }}
          >
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
                  size="small"
                  sx={{
                    borderColor: "black",
                    color: "#ff0056",
                    borderRight: 1,
                    fontSize: "14px",
                  }}
                  onClick={() => {
                    if (cantidad < 1) return;
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
                  size="small"
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
                  size="small"
                  onClick={() => {
                    agregarItemAlCarrito(producto, cantidad + 1);
                    aumentarCantidadProducto();
                  }}
                >
                  +
                </Button>
              </Box>
            </ButtonGroup>
          </CardActions>

          <CardActions sx={{ paddingTop: 1, width: "100%", marginTop: 0 }}>
            <Button
              sx={{
                backgroundColor: "#ff0056",
                color: "white",
                gap: 1,
                "&:hover": {
                  color: "#ff0056",
                  borderBlockColor: "#ff0056",
                  border: 2,
                },
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
      </Card>
    );
  }
  return (
    <Card sx={{ minWidth: 140, maxWidth: 160, height: 350, boxShadow: 5 }}>
      <Grid container justifyContent={"center"}>
        <CardActionArea
          onClick={() => {
            navigate(`/producto/${producto.id}`, { state: producto });
          }}
        >
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
              sx={{
                width: 141,
                height: 60,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                marginLeft: 0,
              }}
              variant="body2"
              title={producto.descripcion}
            >
              {producto.descripcion}
            </Typography>

            <div style={{ display: "flex" }}>
              <Typography
                textAlign={"left"}
                variant="body2"
                fontSize={14}
                fontWeight="bold"
                color="#8f8f8f"
                my={1}
                sx={{
                  textDecoration: "line-through",
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                }}
              >
                ${producto.precio}
              </Typography>
              <Typography
                textAlign={"left"}
                variant="body2"
                fontSize={16}
                fontWeight="bold"
                color="#ff0056"
                my={1}
                sx={{
                  paddingLeft: 1,
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                }}
              >
                ${producto.precioDescuento}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            paddingBottom: 0,
            paddingX: 0,
            marginBottom: 2 / 5,
            marginTop: 0,
          }}
        >
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
                size="small"
                sx={{
                  borderColor: "black",
                  color: "#ff0056",
                  borderRight: 1,
                  fontSize: "14px",
                }}
                onClick={() => {
                  if (cantidad < 1) return;
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
                size="small"
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
                size="small"
                onClick={() => {
                  agregarItemAlCarrito(producto, cantidad + 1);
                  aumentarCantidadProducto();
                }}
              >
                +
              </Button>
            </Box>
          </ButtonGroup>
        </CardActions>

        <CardActions sx={{ paddingTop: 1, width: "100%", marginTop: 0 }}>
          <Button
            sx={{
              backgroundColor: "#ff0056",
              color: "white",
              gap: 1,
              "&:hover": {
                color: "#ff0056",
                borderBlockColor: "#ff0056",
                border: 2,
              },
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
    </Card>
  );
};
