import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Categoria,
  CompraDTO,
  Direccion,
  Producto,
  PromocionDTO,
  ReclamoDTO,
  Sucursal,
  Token,
  Usuario,
} from "../../interfaces/interfaces";
import { RootState } from "../store";

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
  fechaNacimiento: Date;
  rol: 0 | 1;
  eliminado: 0 | 1;
  bloqueado: 0 | 1;
  usuario: string;
}

interface AddressProps {
  direccion: string;
  ciudad: string;
  departamento: string;
  longitud: string;
  latitud: string;
  aclaracion: string;
}
interface CrearProductoProps {
  nombre: string;
  imagen: string;
  precio: number;
  eliminado: boolean;
  categoriaId: number;
  descripcion: string;
}

interface ModificarCompradorProps {
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento: Date;
}

interface ModificarStockProps {
  productoId: number;
  cantidad: number;
}
type AuthResponse = {
  token: string;
};

interface UserDataProps {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaNacimiento: Date;
  rol: 0 | 1;
  eliminado: 0 | 1;
  bloqueado: 0 | 1;
  usuario: string;
  direcciones: Direccion[];
}
interface ModificarContrasenaProps {
  guid: string;
  contrasena: string;
  contrasenaRepeticion: string;
}

interface EliminarProductoProps {
  id: number;
}

interface CrearUsuarioSucursalProps {
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  telefono: number;
  usuario: string;
  fechaNacimiento: string;
  sucursalId: string;
}
interface CrearSucursalProps {
  nombre: string;
  direccion: {
    direccion: string;
    ciudad: string;
    departamento: string;
    longitud: string;
    latitud: string;
  };
}

interface EliminarOBloquearUsuarioProps {
  correo: string;
}

interface CrearPromocionProductoProps {
  fechaDesde: string;
  fechaHasta: string;
  tipoPromo: "PRODUCTO";
  porcDescuentoProducto: number;
  producto: {
    id: number;
  };
}

interface RecuperarContrasenaProps {
  correo: string;
}

export const super5Api = createApi({
  reducerPath: "super5Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "VentasPagadas",
    "VentasConfirmadas",
    "UserData",
    "AtenderReclamo",
    "Producto",
    "Sucursal",
    "Direccion",
    "Compras",
  ],
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginProps>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "UserData",
        "Compras",
        "VentasConfirmadas",
        "VentasPagadas",
      ],
      transformResponse: (response: AuthResponse, meta, arg) => {
        return response.token;
      },
    }),
    signup: builder.mutation<string, SignupProps>({
      query: (body) => ({
        url: "cliente/crear",
        method: "POST",
        body,
      }),
      transformResponse: (resp: AuthResponse, meta) => resp.token,
      invalidatesTags: [
        "UserData",
        "Compras",
        "VentasConfirmadas",
        "VentasPagadas",
      ],
    }),
    recuperarContrasena: builder.mutation<string, RecuperarContrasenaProps>({
      query: (body) => ({
        url: "auth/generarRecuperacionContrasena",
        method: "POST",
        body,
      }),
    }),
    modificarContrasena: builder.mutation<any, ModificarContrasenaProps>({
      query: (body) => ({
        url: "auth/modificarContrasena",
        method: "POST",
        body,
      }),
    }),
    getProductos: builder.query<Producto[], void>({
      query: () => "producto/obtenerPorSucursal/1",
      providesTags: ["Producto"],
    }),
    getProductosPorSucursal: builder.query<Producto[], string>({
      query: (id) => `producto/obtenerPorSucursal/${id}`,
      providesTags: ["Producto"],
    }),
    getCategorias: builder.query<Categoria[], void>({
      query: () => "producto/listarCategorias",
    }),
    getSucursales: builder.query<Sucursal[], void>({
      query: () => "sucursal/obtener",
      providesTags: ["Sucursal"],
    }),
    getUserData: builder.query<UserDataProps, void>({
      query: () => "usuario/obtenerUsuario",
      providesTags: ["UserData"],
    }),
    addAddress: builder.mutation<Token, AddressProps>({
      query: (body) => ({
        url: "direccion/crear",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Direccion"],
    }),
    getDirecciones: builder.query<Direccion[], void>({
      query: () => "direccion/listar",
      providesTags: ["Direccion"],
    }),
    eliminarDireccion: builder.mutation<Direccion, any>({
      query: (body) => ({
        url: "direccion/eliminar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Direccion"],
    }),
    generarCompraPaypal: builder.mutation<CompraDTO, CompraDTO>({
      query: (body) => ({
        url: "paypal/crear",
        method: "POST",
        body,
      }),
    }),
    generarPago: builder.mutation<CompraDTO | undefined, CompraDTO>({
      query: (body) => ({
        url: "venta/generarPago",
        method: "POST",
        body,
      }),
    }),
    crearReclamo: builder.mutation<Token, ReclamoDTO>({
      query: (body) => ({
        url: "reclamo/crear",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserData", "AtenderReclamo"],
    }),
    modificarComprador: builder.mutation<Token, ModificarCompradorProps>({
      query: (body) => ({
        url: "cliente/modificarComprador",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserData"],
    }),
    modificarDireccion: builder.mutation<Token, Direccion>({
      query: (body) => ({
        url: "direccion/modificar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Direccion"],
    }),
    modificarStock: builder.mutation<string, ModificarStockProps>({
      query: (body) => ({
        url: "producto/modificarStock",
        method: "POST",
        body,
        responseHandler: (response) => response.text(),
      }),
      transformErrorResponse: (
        response: { status: number; data: string },
        meta,
        arg
      ) => {
        return response.data;
      },
      invalidatesTags: ["Producto"],
    }),
    getVentas: builder.query<any[], void>({
      query: () => "venta/obtenerVentasPagas",
      providesTags: ["VentasPagadas"],
    }),
    getCompras: builder.query<any[], void>({
      query: () => "venta/listar",
      providesTags: ["Compras"],
    }),
    getVentasConfirmadas: builder.query<any[], void>({
      query: () => "venta/obtenerVentasConfirmadas",
      providesTags: ["VentasConfirmadas"],
    }),
    confirmarVenta: builder.mutation<CompraDTO, CompraDTO>({
      query: (body) => ({
        url: "venta/confirmar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["VentasPagadas", "VentasConfirmadas"],
    }),
    finalizarVenta: builder.mutation<CompraDTO, CompraDTO>({
      query: (body) => ({
        url: "venta/finalizar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["VentasConfirmadas"],
    }),
    cancelarCompra: builder.mutation<CompraDTO, CompraDTO>({
      query: (body) => ({
        url: "venta/cancelar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Compras"],
    }),
    getReclamos: builder.query<ReclamoDTO[], void>({
      query: () => "reclamo/listar",
      providesTags: ["AtenderReclamo"],
    }),
    atenderReclamo: builder.mutation<ReclamoDTO, ReclamoDTO>({
      query: (body) => ({
        url: "reclamo/atender",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AtenderReclamo"],
    }),
    crearProducto: builder.mutation<Producto, CrearProductoProps>({
      query: (body) => ({
        url: "producto/crear",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Producto"],
    }),
    eliminarProducto: builder.mutation<Producto, EliminarProductoProps>({
      query: (body) => ({
        url: "producto/eliminar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Producto"],
    }),
    modificarProducto: builder.mutation<Producto, Producto>({
      query: (body) => ({
        url: "producto/modificar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Producto"],
    }),
    getUsuarios: builder.query<Usuario[], void>({
      query: () => "usuario/listar",
      providesTags: ["UserData"],
    }),
    crearSucursal: builder.mutation<Sucursal, CrearSucursalProps>({
      query: (body) => ({
        url: "sucursal/crear",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sucursal"],
    }),
    crearUsuarioSucursal: builder.mutation<Usuario, CrearUsuarioSucursalProps>({
      query: (body) => ({
        url: "usuario/crearUsuarioSucursal",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserData"],
    }),
    eliminarUsuario: builder.mutation<Usuario, EliminarOBloquearUsuarioProps>({
      query: (body) => ({
        url: "usuario/eliminar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserData"],
    }),
    bloquearUsuario: builder.mutation<Usuario, EliminarOBloquearUsuarioProps>({
      query: (body) => ({
        url: "usuario/bloquear",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserData"],
    }),
    crearPromocionProducto: builder.mutation<
      PromocionDTO,
      CrearPromocionProductoProps
    >({
      query: (body) => ({
        url: "promocion/crearPromocionProducto",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Producto"],
    }),
    validarCupon: builder.mutation<
      PromocionDTO | string,
      { cuponDescuentoVenta: string }
    >({
      query: (body) => ({
        url: "promocion/validarCupon",
        method: "POST",
        body,
        responseHandler: async (response) => {
          if (!response.ok) {
            const error = await response.text();
            return error;
          }
          return response.json();
        },
      }),
    }),
  }),
});

export const {
  useValidarCuponMutation,
  useCrearPromocionProductoMutation,
  useEliminarUsuarioMutation,
  useBloquearUsuarioMutation,
  useLoginMutation,
  useSignupMutation,
  useGetProductosPorSucursalQuery,
  useLazyGetProductosPorSucursalQuery,
  useAddAddressMutation,
  useGetSucursalesQuery,
  useGenerarCompraPaypalMutation,
  useGenerarPagoMutation,
  useModificarCompradorMutation,
  useGetCategoriasQuery,
  useModificarStockMutation,
  useGetUserDataQuery,
  useGetVentasQuery,
  useGetVentasConfirmadasQuery,
  useConfirmarVentaMutation,
  useFinalizarVentaMutation,
  useGetComprasQuery,
  useCrearReclamoMutation,
  useGetDireccionesQuery,
  useEliminarDireccionMutation,
  useModificarDireccionMutation,
  useGetReclamosQuery,
  useAtenderReclamoMutation,
  useRecuperarContrasenaMutation,
  useModificarContrasenaMutation,
  useGetProductosQuery,
  useCrearProductoMutation,
  useEliminarProductoMutation,
  useModificarProductoMutation,
  useGetUsuariosQuery,
  useCrearSucursalMutation,
  useCrearUsuarioSucursalMutation,
  useCancelarCompraMutation,
} = super5Api;