import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Producto } from "../../interfaces/interfaces";
import { ArrowBack } from "@mui/icons-material";

export const VerProductoDetallesPage = () => {
  const location = useLocation();
  const producto: Producto = location.state;
  const navigate = useNavigate();
  return (
    <Box
      className="animate__animated animate__fadeInLeft"
      sx={{
        height: "100%",
        width: "100%",
        boxShadow: "1px 7px 13px -2px rgba(0,0,0,0.39);",
        borderRadius: 1,
        backgroundColor: "#333",
        p: 1,
      }}
    >
      <IconButton
        sx={{ color: "#fff" }}
        onClick={() => {
          navigate("/sucursal/producto");
        }}
      >
        <ArrowBack />
      </IconButton>
      <Grid container flexDirection="row" sx={{ height: "100%" }}>
        <Grid item xs={12} sx={{ height: { md: "50%" } }}>
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12} md={6} mb={1}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Avatar
                  src={producto.imagen || ""}
                  variant="rounded"
                  sx={{
                    width: {
                      xs: 150,
                      md: 300,
                    },
                    height: {
                      xs: 150,
                      md: 250,
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
                  <span style={{ color: "#ff0056" }}>Nombre: </span>
                  {producto.nombre}
                </Typography>
                <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
                  <span style={{ color: "#ff0056" }}>Categoria: </span>
                  {producto.categoriaId}
                </Typography>
                <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
                  <span style={{ color: "#ff0056" }}>Disponible: </span>
                  {producto.eliminado ? "No" : "Si"}
                </Typography>
                <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
                  <span style={{ color: "#ff0056" }}>Stock: </span>
                  {producto.stock} unidades
                </Typography>
                <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
                  <span style={{ color: "#ff0056" }}> Precio: </span>$
                  {producto.precio}
                </Typography>
                <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
                  Precio descuento: {producto.precioDescuento || "No tiene"}
                </Typography>
                <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
                  Aplica descuento: {producto.aplicaDescuento || "No tiene"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ height: { md: "50%", xs: "20%" } }}
          pt={{ md: 4 }}
          px={2}
        >
          <Grid
            container
            sx={{
              height: { md: "80%" },
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                bgcolor: "#2226",
                borderRadius: 1,
                p: 1,
              }}
            >
              <Typography variant="h5" sx={{ color: "#fff" }}>
                Descripcion del producto:
              </Typography>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                {producto.descripcion}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
