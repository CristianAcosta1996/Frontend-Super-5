import jwt_decode from "jwt-decode";

interface TokenInfo {
  token: string;
  infoToken: {
    tipoUsuario: "admin" | "sucursal" | "comprador";
    nombreUsuario: string;
    apellidoUsuario: string;
    emailUsuario: string;
    imageUrlUsuario: string;
    usuario: string;
    uid: string;
  };
}

export const getToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "");
    const decoded: any = jwt_decode(token);
    if (!token) return;
    const {
      tipoUsuario,
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      email: emailUsuario,
      imagenUrl: imageUrlUsuario,
      usuario,
      uid,
    } = decoded;

    return {
      token,
      tipoUsuario,
      nombreUsuario,
      apellidoUsuario,
      emailUsuario,
      imageUrlUsuario,
      usuario,
      uid,
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
