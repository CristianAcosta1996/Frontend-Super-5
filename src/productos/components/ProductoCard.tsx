import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const ProductoCard = () => {
  const [cantidad, setCantidad] = useState<number>(0);

  const handleAgregarItemAlCarrito = () => {
    console.log("agregue item al carrito");
  };

  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardMedia
        sx={{ mt: 1 }}
        component="img"
        height={120}
        src="https://discouy.vtexassets.com/arquivos/ids/1348524-1600-auto?v=1771421958&width=1600&height=auto&aspect=true"
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
          Categoria
        </Typography>
        <Typography variant="body2">Descripcion</Typography>
        <Typography
          variant="body2"
          fontSize={12}
          fontWeight="bold"
          color="primary"
          my={1}
        >
          $precio
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
              setCantidad(cantidad - 1);
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
              setCantidad(cantidad + 1);
            }}
          >
            +1
          </Button>
        </Box>
      </CardActions>
      <CardActions sx={{ paddingTop: 0 }}>
        <Button size="small" fullWidth onClick={handleAgregarItemAlCarrito}>
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
};
