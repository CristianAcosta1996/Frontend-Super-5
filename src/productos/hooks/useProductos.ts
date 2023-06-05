import {
  useGetCategoriasQuery,
  useLazyGetProductosPorSucursalQuery,
} from "../../store/super5/super5Api";
import { useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";

export const useProductos = () => {
  const { sucursal } = useAppSelector((state) => state.super5);

  const { isLoading: isLoadingCategorias, data: categorias } =
    useGetCategoriasQuery();

  const getProductosCompletos = () => {
    const productosCompletos = productos?.map((producto) => {
      const getNombreCategoria = categorias?.find(
        (categoria) => categoria.id === producto.categoriaId
      )?.nombre;
      return {
        ...producto,
        categoria: getNombreCategoria,
      };
    });
    return productosCompletos;
  };

  const [
    startGettingProducts,
    { data: productos, isLoading: isLoadingProductos },
  ] = useLazyGetProductosPorSucursalQuery();

  useEffect(() => {
    if (!sucursal.id) return;
    startGettingProducts(sucursal.id);
  }, [sucursal]);

  return {
    isLoadingProductos,
    productos,
    categorias,
    isLoadingCategorias,
    getProductosCompletos,
  };
};
