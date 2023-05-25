import { useAppDispatch } from "../../hooks/hooks";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../store/super5/super5Api";
import {
  startEmailAndPasswordLogin,
  startGoogleSignIn,
  startLogout,
} from "../../store/auth/thunks";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const [
    startLogin,
    { isLoading: isAuthenticatingLogin, status: statusLogin },
  ] = useLoginMutation();

  const [
    startRegistrarUsuario,
    { isLoading: isAuthenticatingRegistro, status: statusRegistro },
  ] = useSignupMutation();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleLogin = async (email: string, password: string) => {
    const resp: any = await startLogin({
      usuarioOCorreo: email,
      contrasenia: password,
    });
    const token: string = resp.data.token;
    dispatch(startEmailAndPasswordLogin(token));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleSignIn());
  };

  const handleRegistrarUsuario = async (
    username: string,
    password: string,
    email: string,
    nombre: string,
    apellido: string,
    phone: string
  ) => {
    const resp = await startRegistrarUsuario({
      nombre,
      correo: email,
      usuario: username,
      contrasenia: password,
      apellido,
      telefono: phone,
      bloqueado: 0,
      eliminado: 0,
      rol: 1,
    });
    console.log(resp);
  };

  return {
    handleRegistrarUsuario,
    handleLogin,
    handleLogout,
    handleGoogleLogin,
    isAuthenticatingLogin,
    statusLogin,
    isAuthenticatingRegistro,
    statusRegistro,
  };
};
