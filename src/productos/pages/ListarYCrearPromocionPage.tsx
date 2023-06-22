import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetProductosQuery } from "../../store/super5/super5Api";
import { useState } from "react";
import { Add, Create, CreateOutlined, Edit } from "@mui/icons-material";

export const ListarYCrearPromocionPage = () => {
  const { data: productos, isLoading } = useGetProductosQuery();
  const location = useLocation();

  const [showSnackbar, setShowSnackbar] = useState<boolean>(
    location.state !== null
  );
  return (
    <Box className="animate__animated animate__fadeIn" sx={{ height: "98vh" }}>
      <DataGrid
        columns={columns}
        rows={productos || []}
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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => {
          setShowSnackbar(false);
          window.history.replaceState(null, document.title);
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          severity={
            location.state !== null
              ? location.state.accionExitosa
                ? "success"
                : "error"
              : undefined
          }
          variant="filled"
        >
          {location.state && location.state.accionExitosa
            ? "Producto modificado correctamente"
            : location.state && location.state.mensajeError
            ? "Hubo un error al modificar el producto"
            : ""}
        </Alert>
      </Snackbar>
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
    width: 110,
    type: "boolean",
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 150,
    sortable: false,
    type: "actions",
    renderCell: (params) => {
      return <CrearPromocionActions params={params} />;
    },
  },
];

const CrearPromocionActions = ({
  params,
}: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/administrador/productos/crear-promocion/${params.row.id}`, {
      state: params.row,
    });
  };
  return (
    <>
      <Tooltip title="Crear promocion">
        <IconButton onClick={handleOnClick} size="small">
          <Add fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};
