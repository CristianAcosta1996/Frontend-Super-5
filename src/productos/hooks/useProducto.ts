import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";

export const useProducto = (productoId: string) => {
  const [cantidad, setCantidad] = useState<number>(0);
  const { carrito } = useAppSelector((state) => state.super5);

  useEffect(() => {
    obtenerCantidadDelCarrito(productoId);
  }, [carrito]);

  const aumentarCantidadProducto = () => {
    setCantidad(cantidad + 1);
  };

  const reducirCantidadProducto = () => {
    setCantidad(cantidad - 1);
  };

  const obtenerCantidadDelCarrito = (productoId: string) => {
    const producto = carrito.find(
      (carritoItem) => carritoItem.producto.id === productoId
    );
    if (!producto) {
      setCantidad(0);
      return;
    }

    setCantidad(producto.cantidad);
  };

  return {
    aumentarCantidadProducto,
    reducirCantidadProducto,
    cantidad,
    obtenerCantidadDelCarrito,
  };
};
