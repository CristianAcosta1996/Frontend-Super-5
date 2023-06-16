import { ConfirmationNumber, Delete, ShoppingCart } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { CarritoItem, Producto } from "../../interfaces/interfaces";
import { useAppSelector } from "../../hooks/hooks";

export const ProcederAlPagoPage = () => {
  const { carrito } = useAppSelector((state) => state.super5);
  return (
    <Grid container py={5} px={4} gap={1}>
      <Grid item xs={12} mb={1}>
        <Grid container alignItems="center">
          <ShoppingCart fontSize="large" sx={{ color: "#cc0045" }} />
          <Typography variant="h5" component="h5">
            Mi Carrito
          </Typography>
        </Grid>
      </Grid>
      <Grid container gap={4}>
        <Grid item xs={12} sm={6} p={1}>
          <Paper>
            <ProductList products={carrito} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Paper elevation={4}>
            <Grid container flexDirection="column" p={1} gap={1}>
              <Grid item xs={12}>
                <AplicarCupon />
              </Grid>
              <Divider />
              <Grid container>
                <Grid container justifyContent="space-between">
                  <Typography>Subtotal:</Typography>
                  <Typography>Subtotalprecio</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography>gatoenvio:</Typography>
                  <Typography>gatoenvioprecio</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container flexDirection="column" gap={1}>
                <Grid container justifyContent="space-between">
                  <Typography>Total</Typography>
                  <Typography>Totalprecio</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#e6004d",
                      color: "#fff",
                      "&: hover": { backgroundColor: "#cc0045", color: "#fff" },
                    }}
                  >
                    Proceder al pago
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      borderColor: "#e6004d",
                      color: "#e6004d",
                      "&: hover": {
                        borderColor: "#cc0045",
                        color: "#cc0045",
                      },
                    }}
                  >
                    Seguir comprando
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

const AplicarCupon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { sm: "center" },
        gap: 1,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <ConfirmationNumber
        fontSize="large"
        sx={{
          color: "#e6004d",
        }}
      />
      <CustomTextField fullWidth size="small" variant="outlined" />
      <Button
        size="small"
        sx={{
          backgroundColor: "#e6004d",
          color: "#fff",
          "&: hover": { backgroundColor: "#cc0045", color: "#fff" },
        }}
      >
        aplicar
      </Button>
    </Box>
  );
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    height: "10px" /* Adjust the height value as per your requirement */,
  },
}));

interface ProductListProps {
  products: CarritoItem[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <List sx={{ py: { xs: 0, sm: 1 }, px: 0 }}>
      {products.map(({ cantidad, producto }) => (
        <>
          <ListItem
            key={producto.id}
            sx={{
              px: { xs: 0, sm: 1 },
              flex: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <ListItemAvatar sx={{ minWidth: { xs: 43, sm: 56 } }}>
              <Avatar
                src={producto.imagen}
                sx={{ width: { xs: 60, sm: 40 }, height: { xs: 60, sm: 40 } }}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="caption">{producto.descripcion}</Typography>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <ButtonGroup size="small">
                  <Button>-1</Button>
                  <Button>0</Button>
                  <Button>+1</Button>
                </ButtonGroup>
              </Box>
            </ListItemText>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
                alignSelf: { sm: "flex-end", xs: "center" },
              }}
            >
              <Box sx={{ position: "absolute", top: 0, right: { xs: 0 } }}>
                <Tooltip title="Eliminar">
                  <IconButton size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography
                variant="caption"
                component="span"
                mr={{ xs: 1, sm: 0 }}
              >
                {producto.precioDescuento || producto.precio}
              </Typography>
            </Box>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

/* 
<ListItemText>a</ListItemText>
              <ButtonGroup size="small">
                <Button>-1</Button>
                <Button>0</Button>
                <Button>+1</Button>
              </ButtonGroup>


              --
               <Tooltip title="Eliminar">
                  <IconButton size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
*/

/* 
 <List>
      {products.map(({ cantidad, producto }) => (
        <ListItem key={producto.id} sx={{ padding: 1, position: "relative" }}>
          <ListItemAvatar>
            <Avatar src={producto.imagen} />
          </ListItemAvatar>
          <ListItemText>
            <Typography variant="caption">{producto.descripcion}</Typography>
            <Box
              sx={{
                flex: 1,

                display: "flex",
              }}
            >
              <ButtonGroup size="small">
                <Button>-1</Button>
                <Button>0</Button>
                <Button>+1</Button>
              </ButtonGroup>
            </Box>
          </ListItemText>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(-15%,-20%);",
            }}
          >
            <Tooltip title="Eliminar">
              <IconButton size="small">
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              right: 10,
              transform: "translate(0%,-120%);",
            }}
          >
            <Typography variant="caption" component="span">
              precio
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>

*/
