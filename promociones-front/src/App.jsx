import { Component } from "react";
import { PromoService } from "./service/PromoService";
import DataTable from "./display/DataTable";
import CrudPanel from "./display/CrudPanel";
import CreateModal from "./display/CreateModal";
import DeleteModal from "./display/DeleteModal"; // Agrega la importación del componente DeleteModal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      promos: [],
      isCreateModalOpen: false,
      isDeleteModalOpen: false, // Agrega el estado para el modal de eliminación
      promoToDeleteId: null, // Agrega el estado para almacenar el ID de la promoción a eliminar
    };
    this.promoService = new PromoService();
  }

  componentDidMount() {
    this.promoService.getAll().then((data) => {
      this.setState({ promos: data });
    });
  }

  handleCreate = (newPromotionData) => {
    this.promoService
      .save(newPromotionData)
      .then(() => {
        toast.success("Promoción creada exitosamente");
        this.promoService.getAll().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        toast.error("Error al crear la promoción");
        console.error("Error al crear la promoción:", error);
      });
  
    this.handleCloseCreateModal();
  };

  handleDelete = () => {
    const { promoToDeleteId } = this.state;

    if (promoToDeleteId) {
      this.promoService
        .delete(promoToDeleteId)
        .then(() => {
          toast.success("Promoción eliminada exitosamente");
          this.promoService.getAll().then((data) => {
            this.setState({ promos: data });
          });
        })
        .catch((error) => {
          toast.error("Error al eliminar la promoción");
          console.error("Error al eliminar la promoción:", error);
        });

      this.handleCloseDeleteModal();
    }
  };

  handleOpenDeleteModal = (promoId) => {
    this.setState({ isDeleteModalOpen: true, promoToDeleteId: promoId });
  };

  handleCloseDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false, promoToDeleteId: null });
  };

  handleGet = () => {
    console.log("Obtener datos");
  };

  handleUpdate = () => {
    console.log("Actualizar datos");
  };

  handleOpenCreateModal = () => {
    this.setState({ isCreateModalOpen: true });
  };

  handleCloseCreateModal = () => {
    this.setState({ isCreateModalOpen: false });
  };

  render() {
    const { promos, isCreateModalOpen, isDeleteModalOpen } = this.state;

    return (
      <>
        <h1>Promociones [Módulo 9]</h1>
        <CrudPanel
          onCreate={this.handleOpenCreateModal}
          onGet={this.handleGet}
          onUpdate={this.handleUpdate}
          onDelete={this.handleOpenDeleteModal} // Cambia el evento onDelete para abrir el modal de eliminación
        />
        <DataTable promos={promos} onDelete={this.handleOpenDeleteModal} />
        <CreateModal
          open={isCreateModalOpen}
          onClose={this.handleCloseCreateModal}
          onCreate={this.handleCreate}
        />
        <DeleteModal
          show={isDeleteModalOpen}
          handleClose={this.handleCloseDeleteModal}
          handleDelete={this.handleDelete}
        />
        <ToastContainer />
      </>
    );
  }
}

export default App;