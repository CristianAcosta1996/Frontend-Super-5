import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  useGetCategoriasQuery,
  useLazyGetProductosPorSucursalQuery,
} from "../store/super5/super5Api";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

export default function ProductAutocomplete() {
  const { sucursal } = useAppSelector((state) => state.super5);
  const navigate = useNavigate();
  const { data: categorias } = useGetCategoriasQuery();

  const handleChange = (e, selectedOption) => {
    if (productos) {
      const seleccionado = productos.find(producto => producto.id == selectedOption.id)
      if (seleccionado) {
        navigate(`/producto/${seleccionado.id}`, { state: seleccionado })
      }
    }
  }

  const [
    startGettingProducts,
    { data: productos, isLoading: isLoadingProductos },
  ] = useLazyGetProductosPorSucursalQuery();

  useEffect(() => {
    if (!sucursal.id) return;
    startGettingProducts(sucursal.id);
  }, [sucursal]);

  function getNombreCategoria(catID: number) {
    const aRetornar = categorias?.find((categoria) => {
      if (+categoria.id === catID) return categoria.nombre;
    });

    if (aRetornar) {
      return aRetornar.nombre;
    }
    return "Sin categoria";
  }

  return (
    <Autocomplete
      clearOnEscape
      fullWidth
      onChange={handleChange}
      size="small"
      forcePopupIcon={false}
      loadingText={"Cargando productos..."}
      disablePortal
      groupBy={(options) => options.nombreCategoria}
      id="combo-box-demo"
      options={
        productos
          ? productos?.map(({ descripcion, precio, categoriaId, id }) => {
            const nombreCategoria = getNombreCategoria(categoriaId);
            return {
              label: `${descripcion + " $" + precio}`,
              nombreCategoria,
              id
            };
          })
          : [{ label: "Cargando productos", nombreCategoria: "Sin categoria", id: "0" }]
      }
      sx={{ backgroundColor: "white", borderRadius: "5px" }}
      renderInput={(params) => {
        return <TextField {...params} placeholder="Buscar producto" />;
      }}
    />
  );
}
