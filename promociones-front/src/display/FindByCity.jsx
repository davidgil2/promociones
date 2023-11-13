import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const FindByCity = ({ open, onClose, onFindByCity }) => {
  const [city, setCity] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleFind = async () => {
    try {
      await onFindByCity(city);
      toast.success("Promoción encontrada exitosamente");
      onClose();
    } catch (error) {
      toast.error("Error al encontrar la promoción");
      console.error("Error al encontrar la promoción:", city, error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese la ciudad de la promoción a buscar</DialogTitle>
        <TextField
          label="Ciudad de promoción a buscar"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
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

FindByCity.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFindByCity: PropTypes.func.isRequired,
};

export default FindByCity;
