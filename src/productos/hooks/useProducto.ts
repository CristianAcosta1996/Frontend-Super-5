import { useState } from "react";
import { Producto } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { agregarProductosAlCarrito } from "../../store/super5/super5Slice";
import { guardarCarrito } from "../../utils/localstorage";

export const useProducto = () => {
  const [cantidad, setCantidad] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { carrito } = useAppSelector((state) => state.super5);

  const handleAgregarItemAlCarrito = (producto: Producto) => {
    dispatch(agregarProductosAlCarrito({ producto, cantidad }));
    guardarCarrito(carrito);
  };

  const aumentarCantidadProducto = () => {
    setCantidad(cantidad + 1);
  };

  const reducirCantidadProducto = () => {
    setCantidad(cantidad - 1);
  };

  return {
    handleAgregarItemAlCarrito,
    aumentarCantidadProducto,
    reducirCantidadProducto,
    cantidad,
  };
};
