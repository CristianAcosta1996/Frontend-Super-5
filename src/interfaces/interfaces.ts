
export interface Token {
  rol: "admin" | "sucursal" | "comprador";
  nombre: string;
  apellido: string;
  correo: string;
  imagenUrl: string;
  usuario: string;
  uid: string;
  iat: number;
  exp: number;
  sub: string;
}

export interface Sucursal {
  sucursalID: string;
  nombreSucursal: string;
  direccionSucursal: string;
}
export interface Producto {
  nombre: string;
}
