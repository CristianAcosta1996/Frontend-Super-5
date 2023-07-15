import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  useGetCategoriasQuery,
  useLazyGetProductosPorSucursalQuery,
} from "../store/super5/super5Api";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useProducto } from "../productos/hooks/useProducto";
import { Box, Button, ButtonGroup } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useCarrito } from "../compras/carrito/hooks/useCarrito";
import { loadOptions } from "@babel/core";
import { Producto } from "../interfaces/interfaces";

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

  const opciones = productos ? productos?.map(({ descripcion, precio, categoriaId, id }) => {
    const nombreCategoria = getNombreCategoria(categoriaId);
    return {
      label: `${descripcion + " $" + precio}`,
      nombreCategoria,
      id
    };
  })
    : [{ label: "Cargando productos", nombreCategoria: "Sin categoria", id: "0" }]


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
      renderOption={(props, option) => (
        <li {...props}>
          <div style={{ width: "600px" }}>
            {option.label}
          </div>
          <BotonDeAgregarProducto opcionBoton={option} />
        </li>
      )}
      options={opciones}
      sx={{ backgroundColor: "white", borderRadius: "5px" }}
      renderInput={(params) => {
        return <TextField {...params} placeholder="Buscar producto" />;
      }}
    />
  );
}


const BotonDeAgregarProducto = ({ opcionBoton }) => {

  const [theProduct, setTheProduct] = useState<Producto | undefined>()

  const { sucursal } = useAppSelector((state) => state.super5);

  const [
    startGettingProducts,
    { data: productos, isLoading: isLoadingProductos },
  ] = useLazyGetProductosPorSucursalQuery();

  useEffect(() => {
    if (!sucursal.id) return;
    startGettingProducts(sucursal.id);
  }, [sucursal]);

  useEffect(() => {
    if (productos) {
      const miProducto = productos.find(
        (producto) => producto.id == opcionBoton.id
      );
      setTheProduct(miProducto);
    }
  }, [productos, opcionBoton.id]);




  const { aumentarCantidadProducto, cantidad, reducirCantidadProducto } =
    useProducto(opcionBoton.id);
  const { agregarItemAlCarrito, quitarItemDelCarrito } = useCarrito();
  return (
    <>
      {cantidad === 0 ? (
        <Button
          size="small"
          variant="contained"
          sx={{
            mr: 0,
            width: "200px",
            backgroundColor: "#e6004d",
            color: "#fff",
            "&: hover": { backgroundColor: "#cc0045", color: "#fff" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (theProduct)
              agregarItemAlCarrito(theProduct, 1);
          }}
        >
          <ShoppingCart /> Agregar
        </Button>
      ) : (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Box
            aria-label="cantidadProducto"
            sx={{
              color: "#ff0056",
              display: "flex",
              alignItems: "center",
              borderColor: "black",
            }}
          >
            <Button
              size="small"
              sx={{
                borderColor: "black",
                color: "#ff0056",
                borderRight: 1,
                fontSize: "14px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (cantidad === 1) {
                  if (theProduct)
                    quitarItemDelCarrito(theProduct);
                  return;
                }
                if (theProduct)
                  agregarItemAlCarrito(theProduct, cantidad - 1);
                reducirCantidadProducto();
              }}
            >
              -
            </Button>
            <Button
              sx={{
                borderColor: "black",
                fontSize: "14px",
                color: "#ff0056",
              }}
              size="small"
              disableRipple
              disableFocusRipple
            >
              {cantidad}
            </Button>
            <Button
              sx={{
                borderColor: "black",
                color: "#ff0056",
                fontSize: "14px",
              }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                if (theProduct)
                  agregarItemAlCarrito(theProduct, cantidad + 1);
                aumentarCantidadProducto();
              }}
            >
              +
            </Button>
          </Box>
        </ButtonGroup>
      )}
    </>
  );
};