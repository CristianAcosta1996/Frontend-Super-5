import { HomePage } from "../../src/pages/HomePage";
import { render } from "@testing-library/react";
import React from "react";
import Swiper from "swiper";
import { useGetCategoriasQuery } from "../../src/store/super5/super5Api";

jest.mock("../../src/store/super5/super5Api");
describe("Pruebas sobre el componente <HomePage/>", () => {
  test("Mostrar productos por categorias", () => {
    (useGetCategoriasQuery as jest.Mock).mockReturnValue({
      data: [],
    });
    render(<HomePage />);
  });
});
