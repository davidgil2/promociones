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

const FindByIdModal = ({ open, onClose, onFindId }) => {
  const [promoId, setPromoId] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleFind = async () => {
    await onFindId(promoId);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese el ID de la promoción a buscar</DialogTitle>
        <TextField
          label="ID de promoción a buscar"
          variant="outlined"
          value={promoId}
          onChange={(e) => setPromoId(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleFind} color="secondary">
            Buscar
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

FindByIdModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFindId: PropTypes.func.isRequired,
};

export default FindByIdModal;
