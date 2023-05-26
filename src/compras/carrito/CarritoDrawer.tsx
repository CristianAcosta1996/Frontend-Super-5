import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import {
  Add,
  AddCircleOutline,
  ArrowBack,
  Close,
  Delete,
  PlusOne,
  RemoveCircle,
  RemoveCircleOutline,
} from "@mui/icons-material";

interface CarritoDrawerProps {
  cartOpen: boolean;
  handleClose: () => void;
}

export const CarritoDrawer = ({
  cartOpen,
  handleClose,
}: CarritoDrawerProps) => {
  /* const [open, setOpen] = useState(false); */

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      handleClose();
    };

  const list = () => (
    <Box sx={{ width: 450 }} role="presentation">
      <IconButton onClick={toggleDrawer()}>
        <ArrowBack />
      </IconButton>
      <List>
        {/* , "Starred", "Send email", "Drafts" */}
        {["Inbox"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ backgroundColor: "red", px: 1 }}
          >
            <ListItemAvatar>
              <Avatar src={""} />
            </ListItemAvatar>
            <Box sx={{ display: "flex", flex: 1, gap: 1 }}>
              <Box sx={{ flex: 1, backgroundColor: "blue" }}>Descripcion</Box>
              <Box sx={{ backgroundColor: "orange", borderRadius: 4 }}>
                <IconButton>
                  <RemoveCircleOutline fontSize="small" />
                </IconButton>
                <Typography variant="body1" component="span">
                  0
                </Typography>
                <IconButton>
                  <AddCircleOutline fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ backgroundColor: "green" }}>
                <IconButton>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            <Typography variant="h6" color="primary" component="span">
              Precio total:
            </Typography>
            <Typography variant="h6" color="primary" component="span">
              $0
            </Typography>
          </Box>
        </ListItem>
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button>Vaciar Carrito</Button>
        <Button>Finalizar Compra</Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={(event, reason) => {
          console.log(event, reason);
          return;
          toggleDrawer();
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
};
