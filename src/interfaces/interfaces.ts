export enum TipoUsuario {
  Invitado = 0,
  Comprador = 1,
  Sucursal = 2,
  Administrador = 3,
}
export interface Token {
  rol: TipoUsuario;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  imagenUrl: string;
  usuario: string;
  uid: string;
  iat: number;
  exp: number;
  sub: string;
  sucursal: number;
}

export interface Direccion {
  id?: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  longitud: string;
  latitud: string;
  aclaracion: string;
  eliminado: boolean;
}
export interface Sucursal {
  id: string;
  nombre: string;
  direccion: Direccion;
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface Producto {
  id: string;
  nombre: string;
  imagen: string;
  precio: number;
  eliminado: boolean;
  categoriaId: number;
  stock: number;
  precioDescuento: number | null;
  aplicaDescuento: number | null;
  descripcion: string;
}
export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

export interface CarritoDto {
  producto_id: number;
  cantidad: number;
}

export interface CompraDTO {
  formaEntrega: "DOMICILIO" | "SUCURSAL";
  direccion_id?: number;
  sucursal_id: number;
  carrito: CarritoDto[];
  id?: number;
  estado?: "PENDIENTE" | "PAGO" | "CANCELADO" | "CONFIRMADO" | "FINALIZADO";
  eliminado?: boolean;
  fechaCompra?: Date;
  fechaConfirmacion?: Date;
  fechaCancelacion?: Date;
  fechaFinalizacion?: Date;
  codigoPayPal?: string;
  precio?: number;
  comprador_id?: number;
  promocion_id?: number;
  urlPaypal?: string;
  correctamenteFinalizado?: boolean;
}

export interface Usuario {
  id: number;
  usuario: string;
  contrasenia: null;
  nombre: string;
  apellido: string;
  eliminado: boolean;
  bloqueado: boolean;
  googleId: string;
  correo: string;
  telefono: string;
  rol: number;
  fechaNacimiento: string;
}

export interface ReclamoDTO {
  id?: number;
  tipo: "ATENCION" | "DEMORA" | "CALIDAD" | "PRECIO" | "OTRO";
  estado: "ATENDIDO" | "CREADO";
  comentario: string;
  comentarioSucursal?: string;
  venta: {
    id: number;
  };
}
