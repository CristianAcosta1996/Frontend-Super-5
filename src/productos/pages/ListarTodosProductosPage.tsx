import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetProductosQuery } from "../../store/super5/super5Api";

export const ListarTodosProductosPage = () => {
  const { data, isLoading } = useGetProductosQuery();
  return (
    <Box className="animate__animated animate__fadeIn" sx={{ height: "98vh" }}>
      <DataGrid
        columns={columns}
        rows={data || []}
        loading={isLoading}
        slots={{
          noRowsOverlay: () => (
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography textAlign="center" variant="h6" component="h6">
                No hay datos
              </Typography>
            </Box>
          ),
        }}
      />
    </Box>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "imagen",
    headerName: "Imagen",
    renderCell: (params) => {
      return <Avatar src={params.row.imagen} />;
    },
    width: 70,
  },
  { field: "nombre", headerName: "Nombre", width: 180 },
  {
    field: "precio",
    headerName: "Precio",
    width: 90,
    type: "number",
    valueGetter: (params) => `$${params.row.precio}`,
  },
  {
    field: "descripcion",
    headerName: "Descripcion",
    width: 180,
  },
  {
    field: "eliminado",
    headerName: "Eliminado",
    width: 90,
    type: "boolean",
  },
  {
    field: "categoriaId",
    headerName: "Categoria ID",
    width: 90,
    type: "number",
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 85,
    type: "number",
  },
  {
    field: "precioDescuento",
    headerName: "Precio aplicado descuento",
    width: 120,
  },
  {
    field: "aplicaDescuento",
    headerName: "Aplica descuento",
    width: 100,
    type: "boolean",
  },
];
