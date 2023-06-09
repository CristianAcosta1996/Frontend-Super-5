import {
  Autocomplete,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Sucursal } from "../../interfaces/interfaces";
import { useGetSucursalesQuery } from "../../store/super5/super5Api";
import { startAgregarSucursal } from "../../store/super5/thunks";

interface SelectorSucursalesProps {
  openDialog: boolean;
  onClose?: () => void;
}

export const SelectorSucursales = ({
  openDialog,
  onClose,
}: SelectorSucursalesProps) => {
  const [open, setOpen] = useState<boolean>(openDialog);
  const [sucursalSeleccionada, setSucursalSeleccionada] =
    useState<Sucursal | null>(null);
  const dispatch = useAppDispatch();

  const handleOnClose = (sucursal: Sucursal) => {
    setOpen(false);
    setSucursalSeleccionada(sucursal);
    dispatch(startAgregarSucursal(sucursal));
    if (onClose) onClose();
  };

  return (
    <>
      <SimpleDialog
        selectedValue={sucursalSeleccionada}
        open={open}
        onClose={handleOnClose}
      />
    </>
  );
};
interface SimpleDialog {
  open: boolean;
  selectedValue: Sucursal | null;
  onClose: (value: Sucursal) => void;
}

const initialStateSucursal: Sucursal = {
  direccion: {
    ciudad: "",
    departamento: "",
    direccion: "",
    id: "",
    latitud: "",
    longitud: "",
    aclaracion: "",
  },
  id: "",
  nombre: "",
};

const SimpleDialog = ({ open, selectedValue, onClose }: SimpleDialog) => {
  const [value, setValue] = useState<Sucursal | null>(null);
  const [estaConfirmado, setEstaConfirmado] = useState<boolean>(false);
  const { data, isLoading } = useGetSucursalesQuery();
  /* const options = useMemo(() => ["sucursal 1", "sucursal 2", "sucursal 3"], []); */

  //Funcion que ejecuta cuando se cierra el Dialog, llama on close con el parametro nuevo que selecciono el usuario y se cierra el dialog
  const handleClose = () => {
    onClose(value || initialStateSucursal);
  };

  return (
    <Dialog
      onClose={() => {
        if (!value || !estaConfirmado) return;
        handleClose();
      }}
      open={open}
      fullWidth
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          py: 2,
        }}
      >
        <DialogTitle>Seleccione una sucursal:</DialogTitle>
        <Autocomplete
          loading={isLoading}
          id="controllable-states"
          value={value}
          onChange={(event: any, newValue: any) => {
            if (value?.nombre === "" && !estaConfirmado) return;
            onClose(newValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.nombre === value.nombre
          }
          getOptionLabel={(sucursal) => sucursal.nombre}
          options={data || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Sucursal" />}
        />
        <Button
          variant="contained"
          onClick={() => {
            setEstaConfirmado(true);
            if (value === null) return;
            onClose(value || initialStateSucursal);
          }}
        >
          confirmar
        </Button>
      </Box>
    </Dialog>
  );
};
