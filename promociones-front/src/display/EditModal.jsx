import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const EditModal = ({ open, onClose, onEdit }) => {
  const [formData, setFormData] = useState({
    idPromo: "",
    name: "",
    description: "",
    discountPercentage: "",
    isActive: false,
    city: "",
    startDate: "", // Formato: 'YYYY-MM-DD HH:mm:ss'
    endDate: "", // Formato: 'YYYY-MM-DD HH:mm:ss'
  });

  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    // Validar campos requeridos
    const requiredFields = [
      "ID de la promo",
      "Nombre",
      "Descripción",
      "Porcentaje de descuento",
      "Ciudad",
      "Fecha de inicio",
      "Fecha de finalización",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Campos obligatorios faltantes: ${missingFields.join(", ")}`);
      return;
    }

    // Lógica para crear datos
    onEdit(formData)
      .then(() => {
        // Solicitud exitosa
        toast.success("Promoción creada exitosamente");
        onClose();
      })
      .catch((error) => {
        // Solicitud fallida
        toast.error("Error al crear la promoción");
        console.error("Error al crear la promoción:", error);
      });
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
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
              id="idPromo"
              name="ID de la promo"
              label="ID"
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleChange("idPromo", e.target.value)}
            />
            <TextField
              required
              id="name"
              name="name"
              label="Nombre"
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextField
              id="description"
              name="description"
              label="Descripción"
              variant="outlined"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <TextField
              required
              id="discountPercentage"
              name="discountPercentage"
              label="Descuento (%)"
              variant="outlined"
              type="number"
              value={formData.discountPercentage}
              onChange={(e) =>
                handleChange("discountPercentage", e.target.value)
              }
            />
            <FormControlLabel
              label="¿Está activada?"
              control={
                <Checkbox
                  id="isActive"
                  name="isActive"
                  variant="outlined"
                  checked={formData.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
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
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <TextField
              required
              id="startDate"
              name="startDate"
              label="Fecha de Inicio 'YYYY-MM-DD HH:mm:ss'"
              variant="outlined"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <TextField
              required
              id="endDate"
              name="endDate"
              label="Fecha de finalización 'YYYY-MM-DD HH:mm:ss'"
              variant="outlined"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEdit} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditModal;
