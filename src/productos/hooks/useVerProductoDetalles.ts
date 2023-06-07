import { useLocation, useNavigate } from "react-router-dom";
import { Producto } from "../../interfaces/interfaces";
import { useCallback } from "react";
import { useModificarStockMutation } from "../../store/super5/super5Api";

export const useVerProductoDetalles = () => {
  const location = useLocation();
  const producto: Producto = location.state.producto;
  const editable: boolean = location.state.editable;
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate("/sucursal/producto", { replace: true });
  }, []);
  const [startModificarStock, { isLoading, data, isSuccess, isError, error }] =
    useModificarStockMutation();

  const modificarStock = (productoId: number, nuevoStock: number) => {
    startModificarStock({ cantidad: nuevoStock, productoId })
      .unwrap()
      .then((resp) => console.log(resp, "success"))
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return {
    producto,
    editable,
    goBack,
    isLoading,
    data,
    modificarStock,
    isSuccess,
    isError,
    error,
  };
};
