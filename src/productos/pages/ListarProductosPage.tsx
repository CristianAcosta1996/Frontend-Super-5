import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProductosActions } from "../components/ProductosActions";
import { useProductos } from "../hooks/useProductos";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nombre", headerName: "Nombre", width: 120 },
  { field: "imagen", headerName: "Imagen", width: 130 },
  {
    field: "precio",
    headerName: "Precio",
    type: "number",
    width: 90,
  },
  {
    field: "eliminado",
    headerName: "Eliminado",
    description: "Muestra si el producto fue eliminado",
    sortable: false,
    width: 80,
  },
  {
    field: "categoriaId",
    headerName: "Categoria ID",
    type: "number",
    width: 90,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    width: 75,
  },
  {
    field: "precioDescuento",
    headerName: "Descuento",
    type: "number",
    width: 90,
  },
  {
    field: "aplicaDescuento",
    headerName: "Aplica Descuento",
    width: 140,
    type: "boolean",
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    width: 170,
    description: "Descripcion del producto",
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 150,
    sortable: false,
    type: "actions",
    renderCell: (params) => {
      return <ProductosActions {...{ params }} />;
    },
  },
];

export const ListarProductosPage = () => {
  const { productos } = useProductos();
  return (
    <Box
      sx={{ height: "80vh", width: "100%" }}
      className="animate__animated animate__fadeIn"
    >
      <DataGrid columns={columns} rows={productos || []} autoPageSize />
    </Box>
  );
};
