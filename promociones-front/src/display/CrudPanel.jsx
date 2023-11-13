import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from "prop-types";

const CrudPanel = ({
  onGet,
  onCreate,
  onUpdate,
  onDelete,
  onFindById,
  onFindByCity,
  onFindBestDiscount
}) => {
  CrudPanel.propTypes = {
    onGet: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onFindById: PropTypes.func.isRequired,
    onFindByCity: PropTypes.func.isRequired,
    onFindBestDiscount: PropTypes.func.isRequired,
  };

  const [value, setValue] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "create":
        onCreate && onCreate();
        break;
      case "delete":
        onDelete && onDelete();
        break;
      case "update":
        onUpdate && onUpdate();
        break;
      case "get":
        onGet && onGet();
        break;
      case "findByCity":
        onFindByCity && onFindByCity();
        break;
      case "findById":
        onFindById && onFindById();
        break;
      case "findBestDiscount":
        onFindBestDiscount && onFindBestDiscount();
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation sx={{ width: 700 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Crear"
        value="create"
        icon={<AddCircleIcon />}
      />
      <BottomNavigationAction
        label="Borrar"
        value="delete"
        icon={<DeleteIcon />}
      />
      <BottomNavigationAction
        label="Editar"
        value="update"
        icon={<EditIcon />}
      />
      <BottomNavigationAction
        label="Ver"
        value="get"
        icon={<VisibilityIcon />}
      />
      <BottomNavigationAction
        label="Buscar por Ciudad"
        value="findByCity"
        icon={<LocationCityIcon />}
      />
      <BottomNavigationAction
        label="Buscar por ID"
        value="findById"
        icon={<LocalOfferIcon />}
      />
      <BottomNavigationAction
        label="Mejor Descuento"
        value="findBestDiscount"
        icon={<AttachMoneyIcon />}
      />
    </BottomNavigation>
  );
};

export default CrudPanel;
