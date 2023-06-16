import { Box, Button, Typography } from "@mui/material";
import { useGenerarPagoMutation } from "../../store/super5/super5Api";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CompraDTO } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { Cancel, Check } from "@mui/icons-material";
import { limpiarCarrito } from "../../store/super5/thunks";

export const FinalizacionCompraPage = () => {
  const [startGenerarPago, { isLoading, data }] = useGenerarPagoMutation();
  const [compraDto, setCompraDto] = useState<CompraDTO | null>(null);
  const [error, setError] = useState<boolean>(false);
  const { compraPaypal } = useAppSelector((state) => state.super5);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    startGenerarPago(compraPaypal)
      .unwrap()
      .then((resp: any) => {
        setCompraDto(resp.data);
        dispatch(limpiarCarrito());
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      {!error ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Check fontSize="large" color="success" />
          <Typography variant="h6" component="h6" ml={1}>
            Compra realizada con exito
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Cancel fontSize="large" color="error" />
          <Typography variant="h6" component="h6" ml={1}>
            Fallo intento de compra, comuniquese con la tienda...
          </Typography>
        </Box>
      )}
      <Box>{isLoading ? "Cargando..." : JSON.stringify(compraDto)}</Box>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        ir al home
      </Button>
    </Box>
  );
};
