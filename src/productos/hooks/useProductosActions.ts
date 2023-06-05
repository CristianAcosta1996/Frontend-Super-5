import { useNavigate } from "react-router-dom";
import { Producto } from "../../interfaces/interfaces";

export const useProductosActions = () => {
  const navigate = useNavigate();

  const handleOnVerDetalles = (producto: Producto): void => {
    navigate(`/sucursal/producto/${producto.id}`, {
      state: { producto, editable: false },
    });
  };

  const handleOnModificar = (producto: Producto): void => {
    navigate(`/sucursal/producto/${producto.id}`, {
      state: { producto, editable: true },
    });
  };

  const handleOnEliminar = (): void => {
    console.log("handle eliminar");
  };

  return {
    handleOnEliminar,
    handleOnModificar,
    handleOnVerDetalles,
  };
};
