import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

const DeleteModal = ({ open, onClose, onDelete }) => {
  const [promoId, setPromoId] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    try {
      await onDelete(promoId);
      toast.success("Promoción eliminada exitosamente");
      onClose();
    } catch (error) {
      toast.error("Error al eliminar la promoción");
      console.error("Error al eliminar la promoción:", promoId, error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Está seguro que desea eliminar la promoción?</DialogTitle>
        <TextField
          label="ID de promoción a eliminar"
          variant="outlined"
          value={promoId}
          onChange={(e) => setPromoId(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
