import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CssBaseline } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Super5Routes } from "./Super5Routes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/firebase.config";
import { login } from "../store/auth/authSlice";
import { TipoUsuario } from "../interfaces/interfaces";
import { useLoginGoogleMutation } from "../store/super5/super5Api";
import { setToken } from "../utils/localstorage";

export const AppRouter = () => {
  const { status, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [startGoogleLogin, { isLoading }] = useLoginGoogleMutation();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        return;
      }
      const { displayName, email, photoURL, uid, phoneNumber } = user;
      const nombreCompleto = displayName?.split(" ");
      const nombre = nombreCompleto ? nombreCompleto[0] : "";
      const apellido = nombreCompleto ? nombreCompleto[1] : "";

      if (token) {
        dispatch(
          login({
            nombre,
            apellido,
            email: email,
            imageUrl: photoURL,
            uid: uid,
            token,
            googleUser: true,
            telefono: phoneNumber || null,
            sucursal: -1,
            tipoUsuario: TipoUsuario.Comprador,
          })
        );
        return;
      }

      if (!email || !displayName) return;
      startGoogleLogin({
        correo: email,
        googleId: uid,
        nombre: displayName,
      })
        .unwrap()
        .then((resp) => {
          dispatch(
            login({
              nombre,
              apellido,
              email: email,
              imageUrl: photoURL,
              uid: uid,
              token: resp,
              googleUser: true,
              telefono: null,
              sucursal: -1,
              tipoUsuario: TipoUsuario.Comprador,
            })
          );
          setToken(resp);
        })
        .catch(console.log);
    });
  }, []);
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<Super5Routes />} />
        {status !== "authenticated" ? (
          <Route path="auth/*" element={<AuthRoutes />} />
        ) : (
          <Route path="auth/*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<Navigate to="/*" />} />
      </Routes>
    </>
  );
};
