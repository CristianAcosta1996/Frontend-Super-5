import { Box, Button } from "@mui/material";
import { useGenerarPagoMutation } from "../../store/super5/super5Api";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { CompraDTO } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export const FinalizacionCompraPage = () => {
  const [startGenerarPago, { isLoading, data }] = useGenerarPagoMutation();
  const [compraDto, setCompraDto] = useState<CompraDTO | null>(null);
  const { compraPaypal } = useAppSelector((state) => state.super5);
  const navigate = useNavigate();
  useEffect(() => {
    startGenerarPago(compraPaypal).then((resp: any) => {
      setCompraDto(resp.data);
    });
  }, []);
  return (
    <Box>
      Finalizacion Compra Page
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
