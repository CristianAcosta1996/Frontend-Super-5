import { useState } from "react";

export const useProducto = () => {
  const [cantidad, setCantidad] = useState<number>(0);

  const aumentarCantidadProducto = () => {
    setCantidad(cantidad + 1);
  };

  const reducirCantidadProducto = () => {
    setCantidad(cantidad - 1);
  };

  return {
    aumentarCantidadProducto,
    reducirCantidadProducto,
    cantidad,
  };
};
