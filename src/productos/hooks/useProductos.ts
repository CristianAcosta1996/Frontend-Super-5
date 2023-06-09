import {
  useGetCategoriasQuery,
  useLazyGetProductosPorSucursalQuery,
} from "../../store/super5/super5Api";
import { useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";

export const useProductos = () => {
  const { sucursal } = useAppSelector((state) => state.auth);

  const { isLoading: isLoadingCategorias, data: categorias } =
    useGetCategoriasQuery();

  const [
    startGettingProducts,
    {
      data: productos,
      isLoading: isLoadingProductos,
      isError: isErrorProductos,
      error: errorProductos,
    },
  ] = useLazyGetProductosPorSucursalQuery();

  const obtenerProductoPorCategoria = (categoriaId: string) => {
    const prodPorCategoria = productos?.filter(
      (producto) => producto.categoriaId === +categoriaId
    );
    return prodPorCategoria;
  };
  const getProductosCompletos = () => {
    const productosCompletos = productos?.map((producto) => {
      const getNombreCategoria = categorias?.find(
        (categoria) => +categoria.id === producto.categoriaId
      )?.nombre;
      return {
        ...producto,
        categoria: getNombreCategoria,
      };
    });
    return productosCompletos;
  };

  useEffect(() => {
    if (!sucursal) return;
    startGettingProducts(sucursal + "");
  }, [sucursal]);

  return {
    isLoadingProductos,
    productos,
    categorias,
    isLoadingCategorias,
    getProductosCompletos,
    obtenerProductoPorCategoria,
    isErrorProductos,
    errorProductos,
  };
};
