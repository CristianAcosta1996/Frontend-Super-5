import { useState } from "react";

export const useCarrito = () => {
  const [open, setOpen] = useState(false);

  const handleOnClose = () => {
    setOpen(!open);
  };

  return { open, handleOnClose };
};
