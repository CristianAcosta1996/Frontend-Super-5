import { useGetProductosPorSucursalQuery } from "../../store/super5/super5Api";
import { useAppSelector } from "../../hooks/hooks";

export const useProductos = () => {
  const { sucursal } = useAppSelector((state) => state.super5);

  const { isLoading, data: productos } = useGetProductosPorSucursalQuery(
    sucursal.id
  );

  return { isLoading, productos };
};
