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
      if (state.carrito.length === 0) {
        state.carrito.push(action.payload);
        return;
      }
      state.carrito = state.carrito.map((caritoItem) => {
        if (caritoItem.producto.id !== action.payload.producto.id) {
          return caritoItem;
        }

        return action.payload;
      });
    },
    quitarProductosAlCarrito: (state, action: PayloadAction<CarritoItem>) => {},
    realizarCompraPaypal: (state, action) => {
      state.compraPaypal = action.payload;
    },
  },
});

export const {
  agregarProductosAlCarrito,
  agregarSucursal,
  realizarCompraPaypal,
} = super5Slice.actions;
