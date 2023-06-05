export interface Token {
  rol: "admin" | "sucursal" | "comprador";
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
}

export interface Direccion {
  id: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  longitud: string;
  latitud: string;
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
}
