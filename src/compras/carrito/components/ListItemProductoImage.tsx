import { ListItemAvatar, Avatar } from "@mui/material";

export const ListItemProductoImage = ({ productoImage = "" }) => {
  return (
    <ListItemAvatar>
      <Avatar src={/* producto.imagen */ productoImage} />
    </ListItemAvatar>
  );
};
