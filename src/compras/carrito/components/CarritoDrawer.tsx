import { Drawer } from "@mui/material";
import { CarritoBody } from "./CarritoBody";

interface CarritoDrawerProps {
  cartOpen: boolean;
  handleClose: () => void;
}

export const CarritoDrawer = ({
  cartOpen,
  handleClose,
}: CarritoDrawerProps) => {
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

  return (
    <div>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={(event, reason) => {
          return;
          toggleDrawer();
        }}
      >
        <CarritoBody toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};
