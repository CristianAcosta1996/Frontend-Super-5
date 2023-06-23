import { Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useProductosActions } from "../hooks/useProductosActions";

export const ProductosActions = ({ params }) => {
  const { handleOnModificar, handleOnVerDetalles } = useProductosActions();

  return (
    <Box>
      <Tooltip title="Modificar">
        <IconButton
          onClick={() => {
            handleOnModificar(params.row);
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Ver detalles">
        <IconButton
          onClick={() => {
            handleOnVerDetalles(params.row);
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
