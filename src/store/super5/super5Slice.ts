import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Producto, Sucursal } from "../../interfaces/interfaces";
import { obtenerSucursalStorage } from "../../utils/localstorage";

interface Super5InitialState {
  sucursal: Sucursal;
  carrito: Producto[];
}

const initialState = (): Super5InitialState => {
  const sucursal = obtenerSucursalStorage();
  if (sucursal) return { sucursal, carrito: [] };
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
    agregarProductosAlCarrito: (state, action: PayloadAction<Producto>) => {
      state.carrito.push(action.payload);
    },
  },
});

export const { agregarProductosAlCarrito, agregarSucursal } =
  super5Slice.actions;
