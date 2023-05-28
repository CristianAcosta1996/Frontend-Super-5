import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CarritoItem, Producto } from "../../interfaces/interfaces";
import {
  quitarProductosAlCarrito,
  resetearCarrito,
  agregarProductosAlCarrito,
} from "./super5Slice";
import {
  guardarCarrito,
  limpiarCarrito as limpiarCarritoStorage,
} from "../../utils/localstorage";

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
