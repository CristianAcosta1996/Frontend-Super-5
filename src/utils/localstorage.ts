import jwt_decode from "jwt-decode";
import {
  CarritoItem,
  CompraDTO,
  Sucursal,
  Token,
} from "../interfaces/interfaces";

export const getToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (!token) return;
    const decoded: Token = jwt_decode(token);

    const { sub, iat, exp, ...rest } = decoded;
    return {
      ...rest,
      token,
    };
  } catch (error) {
    return;
  }
};

export const setToken = (token: string) => {
  window.localStorage.setItem("token", JSON.stringify(token));
};

export const limpiarStorage = () => {
  localStorage.clear();
};

export const guardarSucursal = (sucursal: Sucursal): void => {
  localStorage.setItem("sucursal", JSON.stringify(sucursal));
};

export const obtenerSucursalStorage = (): Sucursal | undefined => {
  try {
    const sucursal = JSON.parse(localStorage.getItem("sucursal") || "");
    return sucursal;
  } catch (error) {
    return;
  }
};

export const guardarCarrito = (carrito: CarritoItem[]) => {
  try {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } catch (error) {
    console.log(error);
    return;
  }
};

export const obtenerCarritoStorage = () => {
  try {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "");
    return carrito;
  } catch (error) {
    return;
  }
};

export const limpiarCarrito = () => {
  try {
    localStorage.removeItem("carrito");
  } catch (error) {
    return;
  }
};

export const guardarcompraPaypal = (compraPaypal: CompraDTO) => {
  try {
    localStorage.setItem("compraPaypal", JSON.stringify(compraPaypal));
  } catch (error) {
    console.log(error);
    return;
  }
};

export const obtenerCompraPaypal = () => {
  try {
    const carrito = JSON.parse(localStorage.getItem("compraPaypal") || "");
    return carrito;
  } catch (error) {
    return;
  }
};
