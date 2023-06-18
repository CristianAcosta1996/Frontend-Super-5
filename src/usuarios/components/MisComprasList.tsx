import { Box, Dialog, IconButton } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useGetComprasQuery, useGetProductosQuery } from "../../store/super5/super5Api";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SelectorSucursales } from "../hooks/useGetSucursalPorID";
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    width: 70,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 140,
  },
  {
    field: "fechaCompra",
    headerName: "Fecha de Compra",
    width: 170,
    type: "Date",
    valueFormatter: (params: GridValueFormatterParams) => {
      const fechaFormateada = new Date(params.value);
      return `${fechaFormateada.getDay()}/${fechaFormateada.getMonth()}/${fechaFormateada.getFullYear()} - ${fechaFormateada.getHours()}:${fechaFormateada.getMinutes()}`;
    },
  },
  {
    field: "formaEntrega",
    headerName: "Forma de Entrega",
    width: 130,
  },
  {
    field: "precio",
    headerName: "Precio",
    width: 80,
    type: "number",
    valueGetter: (params: GridValueGetterParams) => {
      return `$${params.row.precio}`;
    },
  },
  {
    field: "nombreDireccion",
    headerName: "Direccion",
    width: 270,
    type: "string",
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.row.nombreDireccion || "SUCURSAL " + SelectorSucursales(params.row.sucursal_id)}`;
    },
  },
  {
    field: "carrito",
    headerName: "Carrito",
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      return <CarritoField params={params} />;
    },
  },
  {
    field: "actions",
    headerName: "Reclamar",
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      return <ReclamoButton params={params} />;
    },
  },
];


export const MisComprasList = () => {
  const { data: compras } = useGetComprasQuery();

  return (
    <>
      <Box
        sx={{ height: "78vh", width: "1030px" }}
        className="animate__animated animate__fadeIn"
      >
        <DataGrid columns={columns} rows={compras || []} autoPageSize />
      </Box>
    </>
  );
};

const ReclamoButton = ({ params }: { params: GridRenderCellParams }) => {
  const navigate = useNavigate();
  const compraID = params.id;
  const handleReclamar = () => {
    navigate("/user/mispedidos/reclamo", {
      state: { compraID },
    });
  };
  return (
    <>
      <IconButton title="Hacer Reclamo" onClick={handleReclamar}>
        <SupportAgentIcon />
      </IconButton>
    </>
  );
};

const CarritoField = ({ params }: { params: GridRenderCellParams }) => {
  const { data: productos } = useGetProductosQuery();
  const columnas: GridColDef[] = [
    {
      field: "nombre",
      headerName: "Producto",
      width: 200,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 80,
    },
  ];
  const obtenerProductosPorID = (id: string) => {
    const productoNombre = productos?.find((producto) => {
      if (producto.id === id) {
        return producto
      }
    })
    return productoNombre
  }
  const aMostrar = params.row.carrito?.map((carrito) => {
    return { nombre: obtenerProductosPorID(carrito.producto_id)?.nombre, cantidad: carrito.cantidad }
  })
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}><ShoppingCartIcon /></IconButton>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <Box
          sx={{ height: "97vh" }}
          className="animate__animated animate__fadeIn"
        >
          <DataGrid getRowId={(row) => row.nombre} columns={columnas} rows={aMostrar || []} autoPageSize />
        </Box>
      </Dialog>

    </>
  );
};
