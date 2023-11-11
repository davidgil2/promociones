import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from "date-fns/locale/es";

const CreateModal = ({ open, onClose, onCreate }) => {
  CreateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountPercentage: "",
    isActive: false,
    city: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleCreate = () => {
    // Lógica para crear datos
    onCreate(formData);

    // Cierra el modal de creación después de la operación
    onClose();
  };

  const handleClose = () => {
    // Cierra el modal sin crear la promoción
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Nueva Promoción</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="name"
            name="name"
            label="Nombre"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            id="description"
            name="description"
            label="Descripción"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            required
            id="discountPercentage"
            name="discountPercentage"
            label="Descuento (%)"
            variant="outlined"
            type="number"
            value={formData.discountPercentage}
            onChange={handleChange}
          />
          <FormControlLabel
            label="¿Está activada?"
            control={
              <Checkbox
                id="isActive"
                name="isActive"
                variant="outlined"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isActive: e.target.checked,
                  }))
                }
              />
            }
          />
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            variant="outlined"
            value={formData.city}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <DateTimePicker
              required
              id="startDate"
              name="startDate"
              label="Fecha de Inicio"
              type="datetime-local"
              value={formData.startDate}
              onChange={(date) => handleChange("startDate", date)}
            />
            <DateTimePicker
              required
              id="endDate"
              name="endDate"
              label="Fecha de finalización"
              value={formData.endDate}
              onChange={(date) => handleChange("endDate", date)}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleCreate} color="primary">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
