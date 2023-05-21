import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  startEmailAndPasswordLogin,
  startGoogleSignIn,
  startLogout,
  startRegistrarUsuario
} from "../../store/auth/thunks";
import { useMemo } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleLogin = (email: string, password: string) => {
    dispatch(startEmailAndPasswordLogin(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleSignIn());
  };

  const handleRegistrarUsuario = (
    username: string,
    password: string,
    email: string,
    nombre: string,
    apellido: string,
    phone: string,
    fechaNacimiento: string
  ) => {
    dispatch(
      startRegistrarUsuario(
        {
          username,
          password,
          email,
          nombre,
          apellido,
          phone,
          fechaNacimiento
        }
      )
    );
  };

  return {
    handleRegistrarUsuario,
    handleLogin,
    handleLogout,
    handleGoogleLogin,
    isAuthenticating,
    status,
  };
};
