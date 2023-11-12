import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const DeleteModal = ({ open, onClose, onDelete }) => {
    DeleteModal.propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
      };

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>¿Está seguro que desea eliminar la promoción?</DialogTitle>
        <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={onDelete} color="secondary">
            Eliminar
            </Button>
        </DialogActions>
        </Dialog>
    );
}

export default DeleteModal;