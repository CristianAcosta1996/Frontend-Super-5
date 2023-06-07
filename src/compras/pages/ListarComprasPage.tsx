import { Box, Snackbar, Fade, Alert } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const columns: GridColDef[] = [{ field: "id", headerName: "ID", width: 70 }];

export const ListarComprasPage = () => {
  return <div>ListarComprasPage</div>;
  /*  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  useEffect(() => {
    if (!isErrorCompras) return;
    setShowSnackbar(true);
  }, [isErrorCompras]);

  const handleOnCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box
      sx={{ height: "97vh", width: "100%" }}
      className="animate__animated animate__fadeIn"
    >
      <DataGrid
        columns={columns}
        rows={compras || []}
        autoPageSize
        loading={isLoadingCompras}
      />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={showSnackbar}
        onClose={handleOnCloseSnackbar}
        TransitionComponent={Fade}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="error">
          Hubo un error al cargar las compras.
        </Alert>
      </Snackbar>
    </Box>
  ); */
};
