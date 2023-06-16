import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetSucursalesQuery } from "../../store/super5/super5Api";

export const ListarSucursalesPage = () => {
  const { data, isLoading } = useGetSucursalesQuery();
  return (
    <Box className="animate__animated animate__fadeIn" sx={{ height: "98vh" }}>
      <DataGrid
        columns={columns}
        loading={isLoading}
        rows={data || []}
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
  {
    field: "id",
    headerName: "ID Sucursal",
    width: 100,
  },
  { field: "nombre", headerName: "Nombre", width: 200 },
  {
    field: "direccionId",
    headerName: "Direccion ID",
    width: 140,
    valueGetter: (params) => params.row.direccion.id,
  },
  {
    field: "direccion",
    headerName: "Direccion",
    width: 220,
    valueGetter: (params) => params.row.direccion.direccion,
  },
  {
    field: "ciudad",
    headerName: "Ciudad",
    width: 140,
    valueGetter: (params) => params.row.direccion.ciudad,
  },
  {
    field: "departamento",
    headerName: "Departamento",
    width: 140,
    valueGetter: (params) => params.row.direccion.departamento,
  },
];
