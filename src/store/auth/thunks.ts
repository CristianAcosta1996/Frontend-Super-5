import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from "./authSlice";
import { RootState } from "../store";
import { signInWithGoogle } from "../../firebase/firebase.providers";
import { limpiarStorage, setToken } from "../../utils/localstorage";

export const startEmailAndPasswordLogin = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch(checkingCredentials());
    console.log("dentro del thunk startemail: ", email, password);
    //Aca va la peticion de login al backend;
    const user = true;
    if (!user) return dispatch(logout({ errorMessage: "algo salio mal" }));

    dispatch(
      login({
        email,
        nombre: "testnombre",
        apellido: "testapellido",
        googleUser: false,
        imageUrl: "",
        tipoUsuario: "comprador",
        usuario: "testuser",
        uid: "testuid",
        token: "testtoken",
        errorMessage: null,
      })
    );
    //TODO: guardar token en el localstorage
    /* 
      1- Se valida si existe el usuario contra el backend y si la validacion es exitosa se espera el jwt del backend.
      2- Una vez obtenido el jwt se guarda en el localstorage y se hace el decode el jwt.
      3- Se guardan los datos obtenidos del jwt en el redux store.
    */
  };
};

export const startGoogleSignIn = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXBvVXN1YXJpbyI6ImNvbXByYWRvciIsIm5vbWJyZSI6ImNyaXN0aWFuIiwiYXBlbGxpZG8iOiJhY29zdGEiLCJlbWFpbCI6ImNyaXN0aWFudGVjbm9sb2dvaW5mb3JtYXRpYUBnbWFpbC5jb20iLCJpbWFnZW5VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhZMFItN1k5dkJDWFBlWm9PUDMtdEtuYnExYWtiWGpFYUJuMy1tMT1zOTYtYyIsInVzdWFyaW8iOiJjcmlzMTk5NiIsInVpZCI6MTIzfQ.dbMT5cdxtGBjPvCH9BLm1TThGLEDrRRDqLqaw8NDO18";
    setToken(token);

    dispatch(
      login({
        nombre,
        apellido,
        email: result.email,
        imageUrl: result.photoURL,
        uid: result.uid,
        token,
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
  return async (dispatch, getState) => {
    dispatch(logout({ errorMessage: null }));
    limpiarStorage();
    /* si esta logueado con google llamar a firbease.auth.signout */
    /* llamar a logout y eliminar la info de localstorage */
  };
};

export const startRegistrarUsuario = ({
  nombre,
  apellido,
  username,
  email,
  fechaNacimiento,
  password,
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch(checkingCredentials());
    /* Logica del registrar usuario */

    /* dispatch(login(nombre, apellido, username, email)) */
    // en caso de error hacer un dispatch(logout)
  };
};
