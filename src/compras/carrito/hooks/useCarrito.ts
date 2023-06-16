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
import { guardarcompraPaypal } from "../../../utils/localstorage";

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
    carrito.forEach(({ producto: { precio, precioDescuento }, cantidad }) => {
      contador += !precioDescuento
        ? precio * cantidad
        : precioDescuento * cantidad;
    });
    return contador;
  };

  const handlePagarCompra = (
    formaEntrega: "SUCURSAL" | "DOMICILIO" = "SUCURSAL",
    direccionId?: number
  ): void => {
    const carritoDto = carrito.map(({ producto, cantidad }) => ({
      producto_id: +producto.id,
      cantidad,
    }));

    const compra: CompraDTO = {
      carrito: carritoDto,
      formaEntrega: formaEntrega,
      sucursal_id: +sucursal.id,
      direccion_id: formaEntrega === "DOMICILIO" ? direccionId : undefined,
    };
    startCompraPaypal(compra)
      .unwrap()
      .then((resp: any) => {
        console.log(resp);
        dispatch(realizarCompraPaypal(resp));
        guardarcompraPaypal(resp);
        window.location.replace(resp.urlPaypal);
      })
      .catch(console.log);
  };
  /*  /* let arregloCompra: CarritoDto[] = [];
    carrito.forEach(({ producto, cantidad }) => {
      arregloCompra.push({ producto_id: +producto.id, cantidad });
    });
    const compra: CompraDTO = {
      carrito: arregloCompra,
      formaEntrega: "SUCURSAL",
      sucursal_id: +sucursal.id,
    };
    startCompraPaypal(compra)
      .unwrap()
      .then((resp: any) => {
        console.log(resp);

        dispatch(realizarCompraPaypal(resp));
        guardarcompraPaypal(resp);
        window.location.replace(resp.urlPaypal);
      })
      .catch((error) => {
        alert(JSON.stringify(error.data));
      }); */

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
