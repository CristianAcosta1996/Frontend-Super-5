import { createContext, useContext } from "react";
import { Delete } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import {
  useEliminarProductoMutation,
  useGetProductosQuery,
} from "../../store/super5/super5Api";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "imagen",
    headerName: "Imagen",
    width: 65,
    renderCell: (params) => <Avatar src={params.row.imagen} />,
  },
  { field: "nombre", headerName: "Nombre", width: 120 },
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
    type: "boolean",
  },
  {
    field: "categoriaId",
    headerName: "Categoria ID",
    type: "number",
    width: 80,
  },
  {
    field: "categoria",
    headerName: "Categoria",
    type: "string",
    width: 110,
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
      return <EliminarProductoAction {...{ params }} />;
    },
  },
];

export const EliminarProductoPage = () => {
  return (
    <EliminarProductoContextProvider>
      <EliminarProductoContent />
    </EliminarProductoContextProvider>
  );
};
const EliminarProductoContent = () => {
  const { data: productos, isLoading: isLoadingProductos } =
    useGetProductosQuery();
  const {
    data: { isSuccess, message, show },
    updateData,
  } = useContext(EliminarProductoContext);
  return (
    <Box className="animate__animated animate__fadeIn" sx={{ height: "98vh" }}>
      <DataGrid
        columns={columns}
        rows={productos || []}
        autoPageSize
        loading={isLoadingProductos}
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
        open={show}
        onClose={() => {
          updateData({ isSuccess, message, show: false });
        }}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={isSuccess ? "success" : "error"} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const EliminarProductoAction = ({
  params,
}: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}) => {
  const [startEliminarProducto] = useEliminarProductoMutation();
  const { updateData } = useContext(EliminarProductoContext);
  return (
    <>
      <Tooltip title="Eliminar Producto">
        <IconButton
          onClick={() => {
            startEliminarProducto({ id: params.row.id })
              .unwrap()
              .then((resp) => {
                updateData({
                  isSuccess: true,
                  message: "Producto eliminado correctamente",
                  show: true,
                });
              })
              .catch((error) => {
                console.log(error);
                updateData({
                  isSuccess: false,
                  message: "Hubo un error al eliminar el producto",
                  show: true,
                });
              });
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
};

type Data = {
  message: string;
  show: boolean;
  isSuccess: boolean;
};

interface EliminarProductoContext {
  data: Data;
  updateData: (data: Data) => void;
}

const EliminarProductoContext = createContext<EliminarProductoContext>({
  data: { message: "", show: false, isSuccess: false },
  updateData: () => {},
});

const EliminarProductoContextProvider = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const updateData = ({
    show: newShow,
    message: newMessage,
    isSuccess: newIsSuccess,
  }: Data) => {
    setShow(newShow);
    setMessage(newMessage);
    setIsSuccess(newIsSuccess);
  };

  return (
    <EliminarProductoContext.Provider
      value={{ data: { isSuccess, show, message }, updateData }}
    >
      {children}
    </EliminarProductoContext.Provider>
  );
};
