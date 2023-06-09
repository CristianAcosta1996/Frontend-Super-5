import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { MouseEventHandler } from "react";
export type PopupMessageProps = {
  title: string;
  description: string;
  dialogContent: () => JSX.Element | JSX.Element[];
  actions?: ActionPopupMessage[];
  open: boolean;
  handleClose: () => void;
};
export type ActionPopupMessage = {
  actionName?: string;
  handleAction: MouseEventHandler<HTMLButtonElement>;
  buttonColor: "primary" | "success" | "error";
  isIconButon?: boolean;
  Icon?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
};

export const PopupMessage = ({
  description,
  handleClose,
  open = false,
  title,
  actions,
  dialogContent,
}: PopupMessageProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
        {dialogContent()}
      </DialogContent>
      <DialogActions>
        {actions?.map((action) => {
          return (
            <Button
              key={action.actionName}
              onClick={action.handleAction}
              variant="text"
              color={action.buttonColor}
            >
              {action.actionName}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
};
