import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";

// Componente DeleteModal para eliminar una promoción
const DeleteModal = ({ open, onClose, onDelete }) => {
  // Estado local para almacenar el ID de la promoción a eliminar
  const [promoId, setPromoId] = useState("");

  // Función para cerrar el modal
  const handleClose = () => {
    onClose();
  };

  // Función para manejar la eliminación de la promoción
  const handleDelete = async () => {
    await onDelete(promoId);
    onClose();
  };

  return (
    <>
      {/* Diálogo para eliminar promoción */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Está seguro que desea eliminar la promoción?</DialogTitle>
        {/* Campo para ingresar el ID de la promoción a eliminar */}
        <TextField
          label="ID de promoción a eliminar"
          variant="outlined"
          value={promoId}
          onChange={(e) => setPromoId(e.target.value)}
        />
        {/* Acciones del diálogo */}
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Contenedor para mostrar notificaciones */}
      <ToastContainer />
    </>
  );
};

// Prop-Types para validar las propiedades
DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
