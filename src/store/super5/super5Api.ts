import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Token } from "../../interfaces/interfaces";

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

interface AddressProps {
  direccion: string,
  ciudad: string,
  departamento: string,
  longitud: string,
  latitud: string,
  aclaracion: string,
}

export const super5Api = createApi({

  reducerPath: "super5Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/",
    prepareHeaders: (Headers) => {
      Headers.set("Authorization", "Bearer " + window.localStorage.getItem("token")?.slice(1, -1) || "")
      return Headers
    }
  }),
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
    addAddress: builder.mutation<Token, AddressProps>({
      query: (body) => ({
        url: "direccion/crear",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProductosPorSucursalQuery,
  useAddAddressMutation,
} = super5Api;
