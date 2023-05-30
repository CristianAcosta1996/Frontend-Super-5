import { Box, List, ListItem, Typography } from "@mui/material";

export const CarritoBodyDisplay = ({ precioTotalCarrito = 0 }) => {
  return (
    <List>
      <ListItem>
        <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
          <Typography variant="h6" color="primary" component="span">
            Precio total:
          </Typography>
          <Typography variant="h6" color="primary" component="span">
            ${precioTotalCarrito}
          </Typography>
        </Box>
      </ListItem>
    </List>
  );
};
