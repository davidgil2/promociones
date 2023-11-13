import { Component } from "react";
import { PromoService } from "./service/PromoService";
import DataTable from "./display/DataTable";
import CrudPanel from "./display/CrudPanel";
import CreateModal from "./display/CreateModal";
import DeleteModal from "./display/DeleteModal";
import EditModal from "./display/EditModal";
import FindByIdModal from "./display/FindByIdModal";
import FindByCity from "./display/FindByCity";
import FindBestPromo from "./display/FindBestPromo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      promos: [],
      isCreateModalOpen: false,
      isDeleteModalOpen: false,
      isFindByIdModalOpen: false,
      isFindByCityModalOpen: false,
      isFindBestDiscountModalOpen: false,
      promoToDeleteId: null,
      promoToEditData: null,
      promoToFindId: null,
      promoToFindCity: "",
    };
    this.promoService = new PromoService();
  }

  // Método que se ejecuta al montar el componente
  componentDidMount() {
    this.fetchAllPromotions();
  }

  // Método para obtener todas las promociones
  fetchAllPromotions = () => {
    this.promoService.getAll().then((data) => {
      this.setState({ promos: data });
    });
  };

  // Método para crear una nueva promoción
  handleCreate = (newPromotionData) => {
    this.promoService
      .save(newPromotionData)
      .then(() => {
        toast.success("Promoción creada exitosamente");
        this.fetchAllPromotions();
      })
      .catch((error) => {
        toast.error("Error al crear la promoción");
        console.error("Error al crear la promoción:", error);
      });

    this.handleCloseCreateModal();
  };

  // Métodos para abrir y cerrar el modal de creación
  handleOpenCreateModal = () => {
    this.setState({ isCreateModalOpen: true });
  };

  handleCloseCreateModal = () => {
    this.setState({ isCreateModalOpen: false });
  };

  // Método para eliminar una promoción
  handleDelete = (promoId) => {
    this.promoService
      .delete(promoId)
      .then(() => {
        toast.success(`Promoción con ID ${promoId} eliminada exitosamente`);
        this.fetchAllPromotions();
      })
      .catch((error) => {
        toast.error("Error al eliminar la promoción");
        console.error("Error al eliminar la promoción:", error);
      });

    this.handleCloseDeleteModal();
  };

  // Métodos para abrir y cerrar el modal de eliminación
  handleOpenDeleteModal = () => {
    this.setState({ isDeleteModalOpen: true });
  };

  handleCloseDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false, promoToDeleteId: null });
  };

  // Método para editar una promoción
  handleEdit = (editedPromotionData) => {
    this.promoService
      .edit(editedPromotionData)
      .then(() => {
        toast.success("Promoción editada exitosamente");
        this.fetchAllPromotions();
      })
      .catch((error) => {
        toast.error("Error al editar la promoción");
        console.error("Error al editar la promoción:", error);
      });

    this.handleCloseEditModal();
  };

  // Métodos para abrir y cerrar el modal de edición
  handleOpenEditModal = (promoId) => {
    const promoToEdit = this.state.promos.find(
      (promo) => promo.idPromo === promoId
    );

    this.setState({
      isEditModalOpen: true,
      promoToEditData: promoToEdit,
    });
  };

  handleCloseEditModal = () => {
    this.setState({ isEditModalOpen: false });
  };

  // Método para obtener todas las promociones
  handleGet = () => {
    this.fetchAllPromotions();
  };

  // Método para encontrar la mejor promoción con descuento
  handleFindBestDiscount = (limit, page) => {
    this.promoService
      .findBestDiscount(limit, page)
      .then((data) => {
        toast.success("Mejor descuento encontrado exitosamente");
        this.setState({ promos: data });
        this.handleCloseFindBestDiscountModal();
      })
      .catch((error) => {
        toast.error("Error al obtener promoción");
        console.error("Error al obtener promoción", error);
      });
  };

  // Métodos para abrir y cerrar el modal de la mejor promoción con descuento
  handleOpenFindBestDiscountModal = () => {
    this.setState({ isFindBestDiscountModalOpen: true });
  };

  handleCloseFindBestDiscountModal = () => {
    this.setState({ isFindBestDiscountModalOpen: false });
  };

  // Método para encontrar una promoción por su ID
  handleFindById = (promoId) => {
    this.promoService
      .findById(promoId)
      .then((data) => {
        toast.success("Promoción encontrada exitosamente");
        this.setState({ promos: [data] }); // Actualizar el estado con la nueva promoción
        this.handleCloseFindById();
      })
      .catch((error) => {
        toast.error("Error al obtener promoción");
        console.error("Error al obtener promoción por ID:", error);
      });
  };

  // Métodos para abrir y cerrar el modal de búsqueda por ID
  handleOpenFindById = () => {
    this.setState({ isFindByIdModalOpen: true });
  };

  handleCloseFindById = () => {
    this.setState({ isFindByIdModalOpen: false, promoToFindId: null });
  };

  // Método para encontrar promociones por ciudad
  handleFindByCity = (city) => {
    this.promoService
      .findByCity(city)
      .then((data) => {
        toast.success("Mejor descuento encontrado exitosamente");
        this.setState({ promos: data });
        this.handleCloseFindByCity();
      })
      .catch((error) => {
        toast.error("Error al obtener promoción");
        console.error(`Error al obtener promociones en ${city}:`, error);
      });
  };

  // Métodos para abrir y cerrar el modal de búsqueda por ciudad
  handleOpenFindByCity = () => {
    this.setState({ isFindByCityModalOpen: true });
  };

  handleCloseFindByCity = () => {
    this.setState({ isFindByCityModalOpen: false, promoToFindCity: "" });
  };

  render() {
    const {
      promos,
      isCreateModalOpen,
      isDeleteModalOpen,
      isEditModalOpen,
      isFindByIdModalOpen,
      isFindByCityModalOpen,
      isFindBestDiscountModalOpen,
    } = this.state;

    return (
      <>
        <h1>Promociones [Módulo 9]</h1>
        <CrudPanel
          onGet={this.handleGet}
          onCreate={this.handleOpenCreateModal}
          onUpdate={this.handleOpenEditModal}
          onDelete={this.handleOpenDeleteModal}
          onFindById={this.handleOpenFindById}
          onFindByCity={this.handleOpenFindByCity}
          onFindBestDiscount={this.handleOpenFindBestDiscountModal}
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
        <FindByIdModal
          open={isFindByIdModalOpen}
          onClose={this.handleCloseFindById}
          onFindId={this.handleFindById}
        />
        <FindByCity
          open={isFindByCityModalOpen}
          onClose={this.handleCloseFindByCity}
          onFindByCity={this.handleFindByCity}
        />
        <FindBestPromo
          open={isFindBestDiscountModalOpen}
          onClose={this.handleCloseFindBestDiscountModal}
          onFindBestPromo={this.handleFindBestDiscount}
        />
        <ToastContainer />
      </>
    );
  }
}

export default App;
