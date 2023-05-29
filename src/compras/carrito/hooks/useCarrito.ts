/* eslint-disable prefer-const */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  agregarProductoAlCarrito,
  limpiarCarrito,
  quitarProductoDelCarrito,
  realizarCompraPaypal,
} from "../../../store/super5/thunks";
import {
  CarritoDto,
  CarritoItem,
  Producto,
} from "../../../interfaces/interfaces";
import { CompraDTO } from "../../../interfaces/interfaces";

import { useGenerarCompraPaypalMutation } from "../../../store/super5/super5Api";

export const useCarrito = () => {
  const [open, setOpen] = useState(false);
  const [precioTotalCarrito, setPrecioTotalCarrito] = useState<number>(0);
  const dispatch = useAppDispatch();

  const { carrito } = useAppSelector((state) => state.super5);
  const [startCompraPaypal, { data }] = useGenerarCompraPaypalMutation();
  const { sucursal } = useAppSelector((state) => state.super5);

  useEffect(() => {
    if (carrito.length === 0) {
      setPrecioTotalCarrito(0);
      return;
    }
    setPrecioTotalCarrito(calcularPrecioTotalCarrito());
  }, [carrito]);

  const handleOnClose = () => {
    setOpen(!open);
  };

  const agregarItemAlCarrito = (producto: Producto, cantidad: number) => {
    const carritoItem: CarritoItem = { producto, cantidad };
    dispatch(agregarProductoAlCarrito(carritoItem));
  };

  const quitarItemDelCarrito = (producto: Producto) => {
    dispatch(quitarProductoDelCarrito(producto));
  };

  const limpiarElCarrito = () => {
    dispatch(limpiarCarrito());
  };

  const calcularPrecioTotalCarrito = (): number => {
    let contador = 0;
    carrito.forEach((carritoItem) => {
      contador += carritoItem.producto.precio * carritoItem.cantidad;
    });
    return contador;
  };

  const handlePagarCompra = (): void => {
    let arregloCompra: CarritoDto[] = [];
    carrito.forEach(({ producto, cantidad }) => {
      arregloCompra.push({ producto_id: +producto.id, cantidad });
    });
    const compra: CompraDTO = {
      carrito: arregloCompra,
      formaEntrega: "SUCURSAL",
      sucursal_id: +sucursal.id,
    };
    startCompraPaypal(compra).then((resp: any) => {
      dispatch(realizarCompraPaypal(resp));
    });
  };

  return {
    open,
    handleOnClose,
    agregarItemAlCarrito,
    quitarItemDelCarrito,
    limpiarElCarrito,
    calcularPrecioTotalCarrito,
    precioTotalCarrito,
    handlePagarCompra,
  };
};
