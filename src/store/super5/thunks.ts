import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CarritoItem,
  CompraDTO,
  Producto,
  Sucursal,
} from "../../interfaces/interfaces";
import {
  quitarProductosAlCarrito,
  resetearCarrito,
  agregarProductosAlCarrito,
  realizarCompraPaypal as realizarCompraPaypalSlice,
} from "./super5Slice";
import {
  guardarCarrito,
  limpiarCarrito as limpiarCarritoStorage,
  guardarcompraPaypal,
  guardarSucursal,
} from "../../utils/localstorage";
import { agregarSucursal } from "./super5Slice";

export const quitarProductoDelCarrito = (
  producto: Producto
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatcher, getState) => {
    dispatcher(quitarProductosAlCarrito(producto));
    guardarCarrito(getState().super5.carrito);
  };
};

export const agregarProductoAlCarrito = (
  producto: CarritoItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatcher, getState) => {
    dispatcher(agregarProductosAlCarrito(producto));
    guardarCarrito(getState().super5.carrito);
  };
};

export const limpiarCarrito = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatcher, getState) => {
    dispatcher(resetearCarrito());
    limpiarCarritoStorage();
  };
};

export const realizarCompraPaypal = ({
  compra,
}: {
  compra: CompraDTO;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(realizarCompraPaypalSlice(compra));
    guardarcompraPaypal(compra);
    window.location.replace(compra.urlPaypal || "");
  };
};

export const startAgregarSucursal = (
  sucursal: Sucursal
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(agregarSucursal(sucursal));
    guardarSucursal(sucursal);
  };
};
