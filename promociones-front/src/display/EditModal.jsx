import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

// Componente EditModal para editar una promoción existente
const EditModal = ({ open = false, onClose, onEdit, promoToEditData }) => {
  // Prop-Types para validar las propiedades
  EditModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    promoToEditData: PropTypes.shape({
      idPromo: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      discountPercentage: PropTypes.string,
      isActive: PropTypes.bool,
      city: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
  };

  // Estado local para almacenar datos del formulario
  const [formData, setFormData] = useState({
    idPromo: "",
    name: "",
    description: "",
    discountPercentage: "",
    isActive: false,
    city: "",
    startDate: "",
    endDate: "",
  });

  // Efecto para actualizar el estado cuando cambian las props
  useEffect(() => {
    // Resetear los datos del formulario cuando el modal se abre
    if (open && promoToEditData) {
      setFormData({
        idPromo: promoToEditData.idPromo,
        name: promoToEditData.name,
        description: promoToEditData.description,
        discountPercentage: promoToEditData.discountPercentage,
        isActive: promoToEditData.isActive,
        city: promoToEditData.city,
        startDate: promoToEditData.startDate,
        endDate: promoToEditData.endDate,
      });
    }
  }, [open, promoToEditData]);

  // Función para cerrar el modal
  const handleClose = () => {
    onClose();
  };

  // Función para manejar la edición de la promoción
  const handleEdit = () => {
    // Validar campos requeridos
    const requiredFields = [
      "idPromo",
      "name",
      "description",
      "discountPercentage",
      "city",
      "startDate",
      "endDate",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Campos obligatorios faltantes: ${missingFields.join(", ")}`);
      return;
    }

    // Lógica para editar datos
    onEdit(formData)
      .then(() => {
        // Edición exitosa
        onClose();
      })
      .catch((error) => {
        // Edición fallida
        console.error("Error al editar la promoción:", error);
      });
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Promoción</DialogTitle>
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
              value={formData.idPromo}
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
            Editar
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default EditModal;
