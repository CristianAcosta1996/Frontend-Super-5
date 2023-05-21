import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  startEmailAndPasswordLogin,
  startGoogleSignIn,
  startLogout,
} from "../../store/auth/thunks";
import { useMemo } from "react";

interface HandleRegistrarUsuarioProps {
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  fechaNacimiento: string;
  password: string;
}

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

  const handleRegistrarUsuario = ({
    nombre,
    apellido,
    username,
    email,
    fechaNacimiento,
    password,
  }: HandleRegistrarUsuarioProps) => {
    dispatch(
      startRegistroUsuario(
        nombre,
        apellido,
        username,
        email,
        fechaNacimiento,
        password
      )
    );
  };

  return {
    handleLogin,
    handleLogout,
    handleGoogleLogin,
    isAuthenticating,
    status,
  };
};
