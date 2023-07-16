import { render, screen, fireEvent } from "@testing-library/react";
import { LoginPage } from "../../src/auth/pages/LoginPage";
import React from "react";

import { useAuth } from "../../src/auth/hooks/useAuth";

jest.mock("react-router-dom");
jest.mock("../../src/auth/hooks/useAuth");
jest.mock(
  "../../src/assets/super5Balnco2.png",
  () => "../../src/assets/super5Balnco2.png"
);

describe("Pruebas en el componente <LoginPage/>", () => {
  test("Loguear un usuario correctamente", () => {
    const handleLoginMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      handleGoogleLogin: jest.fn(),
      handleLogin: handleLoginMock,
      isAuthenticatingLogin: false,
      isErrorLogin: false,
      isSuccessLogin: false,
    });

    render(<LoginPage />);

    const correo = "test@example.com";
    const password = "password";
    const usernameInput = screen.getByLabelText("Email/Usuario");
    const passwordInput = screen.getByLabelText("Contraseña");
    const loginButton = screen.getByRole("button", { name: "Iniciar sesion" });

    fireEvent.change(usernameInput, { target: { value: correo } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(loginButton);

    expect(handleLoginMock).toBeCalled();
    expect(handleLoginMock).toBeCalledTimes(1);
    expect(handleLoginMock).toBeCalledWith(correo, password);
  });

  test("Mostrar mensaje de usuario logueado correctamente", () => {
    const handleLoginMock = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      handleGoogleLogin: jest.fn(),
      handleLogin: handleLoginMock,
      isAuthenticatingLogin: false,
      isErrorLogin: false,
      isSuccessLogin: true,
    });

    render(<LoginPage />);

    const successfulLoginMessage = screen.getByLabelText(
      "successful-login-message"
    );
    expect(successfulLoginMessage).toBeTruthy();
    expect(successfulLoginMessage.textContent).toBe(
      "Usuario logueado correctamente!"
    );
  });

  test("comparar <LoginPage /> con su snapshot", () => {
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
