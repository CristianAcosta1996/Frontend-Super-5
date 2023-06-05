import { useGetProductosPorSucursalQuery } from "../../store/super5/super5Api";
import { useAppSelector } from "../../hooks/hooks";

export const useProductos = () => {
  const { sucursal } = useAppSelector((state) => state.super5);

  const { isLoading, data: productos } = useGetProductosPorSucursalQuery(
    sucursal.id
  );

  const obtenerProductoPorCategoria = (categoriaId: string) => {
    const prodPorCategoria = productos?.filter(producto => producto.categoriaId === +categoriaId);
    return prodPorCategoria
  }

  return { isLoading, productos, obtenerProductoPorCategoria };
};
