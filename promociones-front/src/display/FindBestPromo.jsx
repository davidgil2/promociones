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

// Componente funcional FindBestPromo
const FindBestPromo = ({ open, onClose, onFindBestPromo }) => {
  // Estados locales para manejar el límite y la página de búsqueda
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(0);

  // Función para cerrar el modal
  const handleClose = () => {
    onClose();
  };

  // Función para realizar la búsqueda con el mejor descuento
  const handleFindBestDiscount = async () => {
    await onFindBestPromo(limit, page);
    onClose();
  };

  return (
    <>
      {/* Diálogo para buscar el mejor descuento */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buscar mejor descuento</DialogTitle>
        {/* Campos de entrada para el límite y la página */}
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
        {/* Botones de acciones en el diálogo */}
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleFindBestDiscount} color="secondary">
            Buscar Mejor Descuento
          </Button>
        </DialogActions>
      </Dialog>
      {/* Contenedor para notificaciones (toasts) */}
      <ToastContainer />
    </>
  );
};

// Propiedades requeridas y sus tipos
FindBestPromo.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFindBestPromo: PropTypes.func.isRequired,
};

export default FindBestPromo;
