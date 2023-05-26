
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
export interface Producto {
  nombre: string;
}
