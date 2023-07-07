import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  useFinalizarVentaMutation,
  useGetVentasConfirmadasQuery,
} from "../../store/super5/super5Api";
import { Check } from "@mui/icons-material";
import { PopupMessage } from "../../components/PopupMessage";
import { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    width: 70,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 120,
  },
  {
    field: "fechaCompra",
    headerName: "Fecha de Compra",
    width: 210,
    type: "Date",
    valueFormatter: (params: GridValueFormatterParams) => {
      const fechaFormateada = new Date(params.value);
      return fechaFormateada.toLocaleString("es-ES");
    },
  },
  {
    field: "fechaConfirmacion",
    headerName: "Fecha de Confirmacion",
    width: 210,
    type: "Date",
    valueFormatter: (params: GridValueFormatterParams) => {
      const fechaFormateada = new Date(params.value);
      return `${fechaFormateada.getDay()}/${fechaFormateada.getMonth()}/${fechaFormateada.getFullYear()}-${fechaFormateada.getHours()}:${fechaFormateada.getMinutes()}:${fechaFormateada.getMinutes()}`;
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
    width: 120,
    type: "number",
    valueGetter: (params: GridValueGetterParams) => {
      return `$${params.row.precio}`;
    },
  },
  {
    field: "nombreDireccion",
    headerName: "Direccion",
    width: 140,
    type: "string",
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.row.nombreDireccion || "No tiene direccion"}`;
    },
  },
  {
    field: "nombreComprador",
    headerName: "Comprador",
    width: 140,
    type: "string",
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.row.nombreComprador || "No tiene nombre"}`;
    },
  },
  {
    field: "actions",
    headerName: "acciones",
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      return <PopupAction params={params} />;
    },
  },
];

export const FinalizarVentasPage = () => {
  const { isLoading, data, isError } = useGetVentasConfirmadasQuery();

  return (
    <>
      <Box
        sx={{ height: "97vh" }}
        className="animate__animated animate__fadeIn"
      >
        <DataGrid
          columns={columns}
          rows={data || []}
          autoPageSize
          loading={isLoading}
        />
        {/* <Snackbar >
          <Alert>

          </Alert>
        </Snackbar> */}
      </Box>
    </>
  );
};

const PopupAction = ({ params }: { params: GridRenderCellParams }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [startFinalizarVenta] = useFinalizarVentaMutation();
  return (
    <Box>
      <PopupMessage
        description="Esta seguro que desea finalizar la venta"
        title="Finalizar venta"
        handleClose={() => {
          setShowPopup(false);
        }}
        open={showPopup}
        dialogContent={() => {
          return (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => {
                      setChecked(event.target.checked);
                    }}
                  />
                }
                label="Delivery/Retiro satisfactorio"
              />
            </FormGroup>
          );
        }}
        actions={[
          {
            actionName: "Cancelar",
            handleAction: (event) => {
              setShowPopup(false);
            },
            buttonColor: "error",
          },
          {
            actionName: "Finalizar",
            handleAction: (event) => {
              startFinalizarVenta({
                ...params.row,
                correctamenteFinalizado: checked,
              })
                .unwrap()
                .then(console.log)
                .catch(console.log);
              setShowPopup(false);
            },
            buttonColor: "success",
          },
        ]}
      />
      <Tooltip
        title="Confirmar"
        onClick={() => {
          setShowPopup(true);
        }}
      >
        <IconButton
          size="small"
          color="success"
          sx={{
            bgcolor: "#2E7D32",
            color: "#fff",
            "&:hover": { bgcolor: "#256428" },
          }}
        >
          <Check />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
