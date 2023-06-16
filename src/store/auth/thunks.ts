import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from "./authSlice";
import { RootState } from "../store";
import { signInWithGoogle } from "../../firebase/firebase.providers";
import { getToken, limpiarToken, setToken } from "../../utils/localstorage";

export const startEmailAndPasswordLogin = (
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    setToken(token);
    const decoded = getToken();
    dispatch(
      login({
        email: decoded?.correo,
        apellido: decoded?.apellido,
        nombre: decoded?.nombre,
        googleUser: false,
        tipoUsuario: decoded?.rol,
        usuario: decoded?.usuario,
        token,
        uid: decoded?.uid,
        imageUrl: decoded?.imagenUrl,
        telefono: decoded?.telefono,
        sucursal: decoded?.sucursal || -1,
      })
    );
  };
};

export const startGoogleSignIn = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(checkingCredentials()); // status === 'checking'
    const result = await signInWithGoogle();
    if (!result.ok) {
      dispatch(logout({ errorMessage: result.errorMessage }));
      return;
    }

    /*  
    FALTA SI NO ESTA EL USUARIO REGISTRADO CON GOOGLE EN EL BACKEND
    REGISTRARLO E INICIARLE SESION CON EL TOKEN RECIBIDO
    */

    const nombreCompleto = result.displayName?.split(" ");
    const nombre = nombreCompleto ? nombreCompleto[0] : "";
    const apellido = nombreCompleto ? nombreCompleto[1] : "";

    dispatch(
      login({
        nombre,
        apellido,
        email: result.email,
        imageUrl: result.photoURL,
        uid: result.uid,
        token: null,
        googleUser: true,
        telefono: null,
        sucursal: -1,
      })
    );
  };
};

export const startLogout = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(logout({ errorMessage: null }));
    limpiarToken();
    /* si esta logueado con google llamar a firbease.auth.signout */
    /* llamar a logout y eliminar la info de localstorage */
  };
};
/* 
export const startRegistrarUsuario = ({
  token,
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    startEmailAndPasswordLogin(token);
  };
};
 */
