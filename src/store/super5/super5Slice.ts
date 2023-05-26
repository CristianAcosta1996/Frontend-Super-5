import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CarritoItem, Producto, Sucursal } from "../../interfaces/interfaces";
import {
  obtenerCarritoStorage,
  obtenerSucursalStorage,
} from "../../utils/localstorage";

interface Super5InitialState {
  sucursal: Sucursal;
  carrito: CarritoItem[];
}

const initialState = (): Super5InitialState => {
  const sucursal = obtenerSucursalStorage();
  const carrito = obtenerCarritoStorage();
  if (sucursal)
    return { sucursal, carrito: carrito !== undefined ? carrito : [] };
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
      },
    },
    carrito: [],
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
      if (state.carrito.length === 0) state.carrito.push(action.payload);

      state.carrito.map((caritoItem) => {
        if (caritoItem.producto.id !== action.payload.producto.id) {
          return caritoItem;
        }

        return action.payload;
      });
    },
    quitarProductosAlCarrito: (state, action: PayloadAction<CarritoItem>) => {},
  },
});

export const { agregarProductosAlCarrito, agregarSucursal } =
  super5Slice.actions;
