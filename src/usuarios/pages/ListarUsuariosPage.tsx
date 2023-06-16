import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetUsuariosQuery } from "../../store/super5/super5Api";

export const ListarUsuariosPage = () => {
  const { data, isLoading } = useGetUsuariosQuery();
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
    headerName: "ID",
    width: 80,
  },
  { field: "usuario", headerName: "Usuario", width: 100 },
  { field: "nombre", headerName: "Nombre", width: 100 },
  { field: "apellido", headerName: "Apellido", width: 100 },
  { field: "eliminado", headerName: "Eliminado", width: 90, type: "boolean" },
  { field: "bloqueado", headerName: "Bloqueado", width: 90, type: "boolean" },
  {
    field: "googleId",
    headerName: "Google ID",
    width: 120,
    valueFormatter: (params) =>
      params.value ? params.value : "No tiene google id",
  },
  { field: "correo", headerName: "Correo", width: 120 },
  { field: "telefono", headerName: "Telefono", width: 120 },
  {
    field: "rol",
    headerName: "Rol",
    valueFormatter: (params) =>
      params.value === 1
        ? "Comprador"
        : params.value === 2
        ? "Sucursal"
        : "Administrador",
    width: 120,
  },
  {
    field: "fechaNacimiento",
    headerName: "Fecha de Nacimiento",
    width: 120,
    valueFormatter: (params) => {
      const fechaFormatted = new Date(params.value);
      return fechaFormatted.toLocaleDateString();
    },
  },
];
