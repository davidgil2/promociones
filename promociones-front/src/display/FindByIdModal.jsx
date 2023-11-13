import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogActions, Button, TextField } from "@mui/material";

// Componente FindByIdModal para buscar una promoción por ID
const FindByIdModal = ({ open, onClose, onFindId }) => {
  // Estado local para el ID de la promoción
  const [promoId, setPromoId] = useState("");

  // Función para cerrar el modal
  const handleClose = () => {
    onClose();
  };

  // Función para buscar la promoción por ID
  const handleFind = async () => {
    await onFindId(promoId);
    onClose();
  };

  return (
    <>
      {/* Diálogo para buscar por ID */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese el ID de la promoción a buscar</DialogTitle>
        {/* Campo de texto para ingresar el ID */}
        <TextField
          label="ID de promoción a buscar"
          variant="outlined"
          value={promoId}
          onChange={(e) => setPromoId(e.target.value)}
        />
        {/* Acciones del diálogo */}
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleFind} color="secondary">
            Buscar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Contenedor para mostrar notificaciones */}
      <ToastContainer />
    </>
  );
};

// Definición de tipos de las propiedades del componente
FindByIdModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFindId: PropTypes.func.isRequired,
};

export default FindByIdModal;
