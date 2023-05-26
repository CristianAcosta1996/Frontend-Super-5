export interface Token {
  rol: "admin" | "sucursal" | "comprador";
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  imagenUrl: string;
  usuario: string;
  fechaNac: Date;
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
