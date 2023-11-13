import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const FindBestPromo = ({ open, onClose, onFindBestPromo }) => {
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const handleFindBestDiscount = async () => {
    await onFindBestPromo(limit, page);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buscar mejor descuento</DialogTitle>
        <TextField
          label="Límite de promociones a buscar"
          variant="outlined"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <TextField
          label="Página de promociones a buscar"
          variant="outlined"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleFindBestDiscount} color="secondary">
            Buscar Mejor Descuento
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

FindBestPromo.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFindBestPromo: PropTypes.func.isRequired,
};

export default FindBestPromo;
