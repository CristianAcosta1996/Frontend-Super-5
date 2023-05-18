import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from "./authSlice";
import { RootState } from "../store";
import { signInWithGoogle } from "../../firebase/firebase.providers";

export const checkingAuthentication = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch(checkingCredentials());
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
      })
    );
  };
};
