import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";


const CrudPanel = ({ onGet, onCreate, onUpdate, onDelete }) => {
  CrudPanel.propTypes = {
    onGet: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  const [value, setValue] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "get":
        onGet();
        break;
      case "create":
        onCreate();
        break;
      case "update":
        onUpdate();
        break;
      case "delete":
        onDelete();
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Crear"
        value="create"
        icon={<AddCircleIcon />}
      />
      <BottomNavigationAction
        label="Obtener"
        value="get"
        icon={<VisibilityIcon />}
      />
      <BottomNavigationAction
        label="Editar"
        value="update"
        icon={<EditIcon />}
      />
      <BottomNavigationAction
        label="Borrar"
        value="delete"
        icon={<DeleteIcon />}
      />
    </BottomNavigation>
  );
};

export default CrudPanel;
