import {
  Autocomplete,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { agregarSucursal } from "../../store/super5/super5Slice";
import { guardarSucursal } from "../../utils/localstorage";

interface SelectorSucursalesProps {
  openDialog: boolean;
}

export const SelectorSucursales = ({ openDialog }: SelectorSucursalesProps) => {
  const [open, setOpen] = useState<boolean>(openDialog);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleOnClose = (sucursal: string) => {
    setOpen(false);
    setSucursalSeleccionada(sucursal);
    dispatch(
      agregarSucursal({
        sucursalID: "",
        direccionSucursal: "",
        nombreSucursal: sucursal,
      })
    );
    guardarSucursal({
      nombreSucursal: sucursal,
      sucursalID: "",
      direccionSucursal: "",
    });
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
  selectedValue: string;
  onClose: (value: string) => void;
}

const SimpleDialog = ({ open, selectedValue, onClose }: SimpleDialog) => {
  const [value, setValue] = useState<string | null>(null);
  const [estaConfirmado, setEstaConfirmado] = useState<boolean>(false);

  const options = useMemo(() => ["sucursal 1", "sucursal 2", "sucursal 3"], []);

  //Funcion que ejecuta cuando se cierra el Dialog, llama on close con el parametro nuevo que selecciono el usuario y se cierra el dialog
  const handleClose = () => {
    onClose(value || "");
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
          id="controllable-states"
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Sucursal" />}
        />
        <Button
          variant="contained"
          onClick={() => {
            setEstaConfirmado(true);
            if (!value) return;
            onClose(value || "");
          }}
        >
          confirmar
        </Button>
      </Box>
    </Dialog>
  );
};
