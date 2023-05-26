import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Sucursal, Token } from "../../interfaces/interfaces";

interface LoginProps {
  usuarioOCorreo: string;
  contrasenia: string;
}

interface SignupProps {
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  telefono: string;
  rol: 0 | 1;
  eliminado: 0 | 1;
  bloqueado: 0 | 1;
  usuario: string;
}

export const super5Api = createApi({
  reducerPath: "super5Api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    login: builder.mutation<Token, LoginProps>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<Token, SignupProps>({
      query: (body) => ({
        url: "cliente/crear",
        method: "POST",
        body,
      }),
    }),
    getProductosPorSucursal: builder.query<any, string>({
      query: (id) => `producto/obtenerPorSucursal/${id}`,
    }),
    getSucursales: builder.query<Sucursal[], void>({
      query: () => "sucursal/obtener",
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProductosPorSucursalQuery,
  useGetSucursalesQuery,
} = super5Api;
