import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { ArrowBack, Check, Clear } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import "../css/VerProductoDetallesPage.css";
import { useVerProductoDetalles } from "../hooks/useVerProductoDetalles";

export const VerProductoDetallesPage = () => {
  const { editable, goBack, producto, isLoading, data, modificarStock } =
    useVerProductoDetalles();
  const [value, setValue] = useState("");

  if (isLoading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      className="animate__animated animate__fadeInLeft"
      sx={{
        minHeight: "95vh",
        width: "100%",
        boxShadow: "1px 7px 13px -2px rgba(0,0,0,0.39);",
        borderRadius: 1,
        backgroundColor: "#333",
        p: 1,
        position: "relative",
      }}
    >
      <IconButton
        sx={{ color: "#fff" }}
        onClick={() => {
          goBack();
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
                justifyContent={!editable ? "space-around" : "space-between"}
              >
                <ProductDetail
                  title="Nombre:"
                  productDetail={producto.nombre}
                />
                <ProductDetail
                  title="Categoria:"
                  productDetail={producto.categoriaId}
                />
                <ProductDetail
                  title="Disponible:"
                  productDetail={producto.eliminado ? "No" : "Si"}
                />
                <Box>
                  <ProductDetail
                    title="Stock:"
                    productDetail={`${producto.stock} unidades`}
                    editable={editable}
                    unidad="Unidades"
                    productDetailInput={value}
                    modificarProductDetailInput={(event) => {
                      setValue(event.target.value);
                    }}
                  />
                </Box>
                <ProductDetail
                  title="Precio:"
                  productDetail={producto.precio}
                />
                <ProductDetail
                  title="Precio descuento:"
                  productDetail={producto.precioDescuento || "No tiene"}
                />
                <ProductDetail
                  title="Aplica descuento:"
                  productDetail={producto.aplicaDescuento || "No tiene"}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ height: { md: "50%", xs: "20%" } }}
          pt={{ md: 1 }}
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
              {editable && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 35,
                    transform: "translateY(-160%);",
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Tooltip title="Cancelar">
                    <IconButton
                      sx={{
                        background: "#ff0056",
                        color: "#fff",
                        "&:hover": {
                          background: "#ca0144",
                        },
                      }}
                      onClick={() => {
                        goBack();
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Confirmar">
                    <IconButton
                      sx={{
                        background: "#ff0056",
                        color: "#fff",

                        "&:hover": {
                          background: "#ca0144",
                        },
                      }}
                      onClick={() => {
                        modificarStock(+producto.id, +value);
                      }}
                    >
                      <Check />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const ProductDetail = ({
  productDetail,
  title,
  editable = false,
  unidad,
  productDetailInput = "",
  modificarProductDetailInput,
}: {
  productDetail: any;
  title: string;
  editable?: boolean;
  unidad?: string;
  productDetailInput?: string;
  modificarProductDetailInput?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box display="flex" alignItems="flex-end" my={1}>
      <Typography variant="h5" ml={2} sx={{ color: "#fff" }}>
        <span style={{ color: "#ff0056" }}>{title} </span>
        {!editable && `${productDetail}`}
      </Typography>
      {editable && (
        <>
          <TextField
            type="text"
            size="small"
            value={productDetailInput}
            onChange={modificarProductDetailInput}
            helperText={
              productDetailInput.length > 0 &&
              !validarEntero(productDetailInput || "") &&
              "debe ser un numero"
            }
            error={
              productDetailInput.length > 0 &&
              !validarEntero(productDetailInput)
            }
            placeholder={`Nuevo ${title.replace(":", "").toLocaleLowerCase()}`}
            sx={{ bgcolor: "#999", borderRadius: 1, ml: 1 }}
          />
          <Typography variant="caption" component="span" ml={1} color="#fff">
            {unidad}
          </Typography>
        </>
      )}
    </Box>
  );
  /*    );
  } */
};

const validarEntero = (entero: string): boolean => {
  return Number.isInteger(+entero);
};
