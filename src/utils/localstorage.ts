import jwt_decode from "jwt-decode";
import { Token } from "../interfaces/interfaces";

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
  return {
    getToken,
    setToken,
  };
};

export const limpiarStorage = () => {
  localStorage.clear();
};

export const guardarSucursal = (sucursalID: string) => {};
