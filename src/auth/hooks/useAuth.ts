import { useAppDispatch } from "../../hooks/hooks";
import {
  useLoginMutation,
  useModificarContrasenaMutation,
  useRecuperarContrasenaMutation,
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

  const [startRecuperarContrasena] = useRecuperarContrasenaMutation();
  const [startModificarContrasena] = useModificarContrasenaMutation();

  const handleRecuperarContrasena = async (email: string) => {
    startRecuperarContrasena({ correo: email })
      .unwrap()
      .then()
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModificarContrasena = async (
    guid: string,
    contrasena: string,
    contrasenaRepeticion: string
  ) => {
    startModificarContrasena({
      guid,
      contrasena,
      contrasenaRepeticion,
    })
      .unwrap()
      .then((resp) => {
        alert(resp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const handleGoogleLogin = async () => {
    dispatch(startGoogleSignIn());
  };

  const handleRegistrarUsuario = async (
    username: string,
    password: string,
    email: string,
    nombre: string,
    apellido: string,
    phone: string,
    birthDate: Date
  ) => {
    startRegistrarUsuario({
      nombre,
      correo: email,
      usuario: username,
      contrasenia: password,
      apellido,
      telefono: phone,
      fechaNacimiento: birthDate,
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
    handleRecuperarContrasena,
    handleModificarContrasena,
  };
};
