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
    {
      isLoading: isAuthenticatingLogin,
      status: statusLogin,
      error: errorLogin,
      isError: isErrorLogin,
      isSuccess: isSuccessLogin,
      data: dataLogin,
    },
  ] = useLoginMutation();

  const [
    startRegistrarUsuario,
    {
      isLoading: isAuthenticatingRegistro,
      status: statusRegistro,
      error: errorSignup,
      isError: isErrorSignup,
      isSuccess: isSuccessSignup,
      data: dataSignup,
    },
  ] = useSignupMutation();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleLogin = async (email: string, password: string) => {
    startLogin({
      usuarioOCorreo: email,
      contrasenia: password,
    })
      .unwrap()
      .then((resp) => {
        setTimeout(() => {
          const token: string = resp;
          dispatch(startEmailAndPasswordLogin(token));
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
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
    startRegistrarUsuario({
      nombre,
      correo: email,
      usuario: username,
      contrasenia: password,
      apellido,
      telefono: phone,
      bloqueado: 0,
      eliminado: 0,
      rol: 1,
    })
      .unwrap()
      .then((resp) => {
        setTimeout(() => {
          const token: string = resp;
          dispatch(startEmailAndPasswordLogin(token));
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
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
    isErrorLogin,
    errorLogin,
    isSuccessLogin,
    isErrorSignup,
    errorSignup,
    isSuccessSignup,
    dataLogin,
    dataSignup,
  };
};
