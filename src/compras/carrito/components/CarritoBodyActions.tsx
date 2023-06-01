import { Box, Button } from "@mui/material";

interface CarritoBodyActionsProps {
  handleOnVaciarCarrito: () => void;
  handlePagarCompra: () => void;
}
export const CarritoBodyActions = ({
  handleOnVaciarCarrito,
  handlePagarCompra,
}: CarritoBodyActionsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Button onClick={handleOnVaciarCarrito}>Vaciar Carrito</Button>
      <Button onClick={handlePagarCompra}>Pagar</Button>
    </Box>
  );
};
