import { Component } from "react";
import { PromoService } from "./service/PromoService";
import DataTable from "./display/DataTable";
import CrudPanel from "./display/CrudPanel";
import CreateModal from "./display/CreateModal";
import DeleteModal from "./display/DeleteModal";
import EditModal from "./display/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      promos: [],
      isCreateModalOpen: false,
      isDeleteModalOpen: false, // Agrega el estado para el modal de eliminación
      promoToDeleteId: null, // Agrega el estado para almacenar el ID de la promoción a eliminar
      promoToEditData: null, // Agrega el estado para almacenar los datos de la promoción a editar
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

  handleOpenCreateModal = () => {
    this.setState({ isCreateModalOpen: true });
  };

  handleCloseCreateModal = () => {
    this.setState({ isCreateModalOpen: false });
  };

  handleDelete = (promoId) => {
    this.promoService
      .delete(promoId)
      .then(() => {
        toast.success(`Promoción con ID ${promoId} eliminada exitosamente`);
        this.promoService.getAll().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        toast.error("Error al eliminar la promoción");
        console.error("Error al eliminar la promoción:", error);
      });

    this.handleCloseDeleteModal();
  };

  handleOpenDeleteModal = () => {
    this.setState({ isDeleteModalOpen: true });
  };

  handleCloseDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false, promoToDeleteId: null });
  };

  handleEdit = (editedPromotionData) => {
    this.promoService
      .edit(editedPromotionData)
      .then(() => {
        // Se edita la promoción exitosamente
        toast.success("Promoción editada exitosamente");
        // Actualiza la lista de promociones
        this.promoService.getAll().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        // Falla al editar la promoción
        toast.error("Error al editar la promoción");
        console.error("Error al editar la promoción:", error);
      });

    // Cierra el modal de edición
    this.handleCloseEditModal();
  };

  handleOpenEditModal = (promoId) => {
    // Obtén los detalles de la promoción para editar
    const promoToEdit = this.state.promos.find(
      (promo) => promo.idPromo === promoId
    );

    // Establece los datos de la promoción en el estado para que el modal los use
    this.setState({
      isEditModalOpen: true,
      promoToEditData: promoToEdit,
    });
  };

  handleCloseEditModal = () => {
    this.setState({ isEditModalOpen: false });
  };

  handleGet = () => {
    console.log("Obtener datos");
  };

  render() {
    const { promos, isCreateModalOpen, isDeleteModalOpen, isEditModalOpen } =
      this.state;

    return (
      <>
        <h1>Promociones [Módulo 9]</h1>
        <CrudPanel
          onCreate={this.handleOpenCreateModal}
          onGet={this.handleGet}
          onUpdate={this.handleOpenEditModal}
          onDelete={this.handleOpenDeleteModal}
        />
        <DataTable promos={promos} />
        <CreateModal
          open={isCreateModalOpen}
          onClose={this.handleCloseCreateModal}
          onCreate={this.handleCreate}
        />
        <DeleteModal
          open={isDeleteModalOpen}
          onClose={this.handleCloseDeleteModal}
          onDelete={this.handleDelete}
        />
        <EditModal
          open={isEditModalOpen}
          onClose={this.handleCloseEditModal}
          onEdit={this.handleEdit}
          promoToEditData={this.state.promoToEditData}
        />
        <ToastContainer />
      </>
    );
  }
}

export default App;
