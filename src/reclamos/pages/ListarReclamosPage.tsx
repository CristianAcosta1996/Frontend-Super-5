import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useAtenderReclamoMutation,
  useGetReclamosQuery,
} from "../../store/super5/super5Api";
import { SupportAgentOutlined } from "@mui/icons-material";
import { useState } from "react";
import { ReclamoDTO } from "../../interfaces/interfaces";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
  },
  {
    field: "tipo",
    headerName: "Tipo",
    width: 100,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 100,
  },
  {
    field: "comentario",
    headerName: "Comentario",
    width: 290,
  },
  {
    field: "comentarioSucursal",
    headerName: "Comentario Sucursal",
    width: 250,
    valueGetter: (params) => {
      return params.row.comentarioSucursal
        ? params.row.comentarioSucursal
        : "No hay comentario aun";
    },
  },
  {
    field: "venta",
    headerName: "Venta ID",
    valueGetter: (params) => {
      return params.row.venta.id;
    },
    type: "number",
    width: 80,
  },
  {
    field: "acciones",
    headerName: "Acciones",
    sortable: false,
    width: 150,
    type: "actions",
    renderCell: (params) => {
      return <ReclamosActions params={params} />;
    },
  },
];

export const ListarReclamosPage = () => {
  const { data: reclamos, isLoading } = useGetReclamosQuery();

  return (
    <Box sx={{ height: "98vh" }}>
      <DataGrid
        columns={columns}
        rows={reclamos || []}
        loading={isLoading}
        autoPageSize
      />
    </Box>
  );
};

const ReclamosActions = ({ params }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <Box>
      <ReclamosPopup
        open={showPopup}
        handleOnClose={() => {
          setShowPopup(false);
        }}
        params={params}
      />
      <Tooltip title="Atender reclamo">
        <IconButton
          onClick={() => {
            setShowPopup(true);
          }}
        >
          <SupportAgentOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const ReclamosPopup = ({
  open,
  handleOnClose,
  params,
}: {
  open: boolean;
  handleOnClose: () => void;
  params: any;
}) => {
  const [startAtenderReclamo, { data }] = useAtenderReclamoMutation();
  const [value, setValue] = useState<string>("");
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>Atender reclamo</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ my: 2 }}
            id="outlined-multiline-static"
            label="Comentario sucursal"
            multiline
            rows={4}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Cancelar</Button>
        <Button
          onClick={() => {
            const reclamo: ReclamoDTO = {
              ...params.row,
              comentarioSucursal: value,
            };

            startAtenderReclamo(reclamo)
              .unwrap()
              .then(console.log)
              .catch(console.log);
            handleOnClose();
          }}
        >
          Atender
        </Button>
      </DialogActions>
    </Dialog>
  );
};
