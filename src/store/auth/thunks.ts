import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from "./authSlice";
import { RootState } from "../store";
import { signInWithGoogle } from "../../firebase/firebase.providers";
import { getToken, limpiarStorage, setToken } from "../../utils/localstorage";

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
    
    1- Si el usuario no esta registrado con google en el servidor se envia los datos necesarios para registrarlo.
    2- Se espera confirmacion y jwt.
    3- Una vez obtenido el jwt se guarda en el localstorage.
    4- Se hace el decode del jwt para obtener los otros datos como lo seria el tipo de usuario el cual es importante para la proteccion de rutas
       y datos de informacion del usuario adicionales.
    5- se guardan esos datos obtenidos en el estado de redux.
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
    limpiarStorage();
    /* si esta logueado con google llamar a firbease.auth.signout */
    /* llamar a logout y eliminar la info de localstorage */
  };
};

export const startRegistrarUsuario = ({
  username,
  password,
  email,
  nombre,
  apellido,
  phone,
  fechaNacimiento,
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    /* Logica del registrar usuario 
      Peticion de registro al back, si todo ok guardo el token en el localstorage
      luego login con los datos enviados al back
    */
    window.localStorage.setItem("nombre", nombre);
    window.localStorage.setItem("apellido", apellido);
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("fechaNacimiento", fechaNacimiento);
    window.localStorage.setItem("password", password);
    window.localStorage.setItem("phone", phone);

    /* dispatch(login(nombre, apellido, username, email)) */
    // en caso de error hacer un dispatch(logout)
  };
};
