import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogActions, Button, TextField } from "@mui/material";

// Componente FindByCity para buscar una promoción por ciudad
const FindByCity = ({ open, onClose, onFindByCity }) => {
  // Estado local para el nombre de la ciudad
  const [city, setCity] = useState("");

  // Función para cerrar el modal
  const handleClose = () => {
    onClose();
  };

  // Función para buscar la promoción por ciudad
  const handleFind = async () => {
    await onFindByCity(city);
    onClose();
  };

  return (
    <>
      {/* Diálogo para buscar por ciudad */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese la ciudad de la promoción a buscar</DialogTitle>
        {/* Campo de texto para ingresar la ciudad */}
        <TextField
          label="Ciudad de promoción a buscar"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
FindByCity.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFindByCity: PropTypes.func.isRequired,
};

export default FindByCity;
