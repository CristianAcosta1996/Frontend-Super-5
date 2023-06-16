import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  CarritoItem,
  CompraDTO,
  Producto,
  Sucursal,
} from "../../interfaces/interfaces";
import {
  obtenerCarritoStorage,
  obtenerCompraPaypal,
  obtenerSucursalStorage,
} from "../../utils/localstorage";

interface Super5InitialState {
  sucursal: Sucursal;
  carrito: CarritoItem[];
  compraPaypal: CompraDTO;
}

const initialStateCompraPaypal: CompraDTO = {
  formaEntrega: "SUCURSAL",
  sucursal_id: 0,
  carrito: [],
};

const initialState = (): Super5InitialState => {
  const sucursal = obtenerSucursalStorage();
  const carrito = obtenerCarritoStorage();
  const compraPaypal = obtenerCompraPaypal();
  if (sucursal)
    return {
      sucursal,
      carrito: carrito !== undefined ? carrito : [],
      compraPaypal:
        compraPaypal !== undefined ? compraPaypal : initialStateCompraPaypal,
    };
  return {
    sucursal: {
      id: "",
      nombre: "",
      direccion: {
        id: "",
        ciudad: "",
        departamento: "",
        direccion: "",
        latitud: "",
        longitud: "",
        aclaracion: "",
      },
    },
    carrito: [],
    compraPaypal:
      compraPaypal !== undefined ? compraPaypal : initialStateCompraPaypal,
  };
};

export const super5Slice = createSlice({
  name: "super5Slice",
  initialState,
  reducers: {
    agregarSucursal: (state, action: PayloadAction<Sucursal>) => {
      state.sucursal.direccion = action.payload.direccion;
      state.sucursal.nombre = action.payload.nombre;
      state.sucursal.id = action.payload.id;
    },
    agregarProductosAlCarrito: (state, action: PayloadAction<CarritoItem>) => {
      if (action.payload.cantidad <= 0) return;
      let estaRepetido = false;
      state.carrito = state.carrito.map((carritoItem) => {
        if (carritoItem.producto.id !== action.payload.producto.id)
          return carritoItem;
        estaRepetido = true;
        return action.payload;
      });

      if (!estaRepetido) state.carrito.push(action.payload);
    },
    quitarProductosAlCarrito: (state, action: PayloadAction<Producto>) => {
      state.carrito = state.carrito.filter(
        (carritoItem) => carritoItem.producto.id !== action.payload.id
      );
    },
    resetearCarrito: (state) => {
      state.carrito = [];
    },
    realizarCompraPaypal: (state, action: PayloadAction<CompraDTO>) => {
      state.compraPaypal = action.payload;
    },
  },
});

export const {
  agregarProductosAlCarrito,
  agregarSucursal,
  realizarCompraPaypal,
  resetearCarrito,
  quitarProductosAlCarrito,
} = super5Slice.actions;
