import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { SyntheticEvent } from "react";

type AlertProps = {
  open: boolean;
  handleClose: (e: SyntheticEvent | Event, reason?: string) => void;
  alerter: { message: string; type: AlertColor | undefined };
};

const AlertComp = (props: AlertProps) => {
  const { open, alerter, handleClose } = props;

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={alerter.type} variant="filled" onClose={handleClose}>
          {alerter.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertComp;
