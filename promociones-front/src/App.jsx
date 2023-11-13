import { Component } from "react";
import { PromoService } from "./service/PromoService";
import DataTable from "./display/DataTable";
import CrudPanel from "./display/CrudPanel";
import CreateModal from "./display/CreateModal";
import DeleteModal from "./display/DeleteModal";
import EditModal from "./display/EditModal";
import FindByIdModal from "./display/FindByIdModal";
import FindByCity from "./display/FindByCity";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      promos: [],
      isCreateModalOpen: false,
      isDeleteModalOpen: false,
      isFindByIdModalOpen: false,
      isFindByCityModalOpen: false,
      promoToDeleteId: null,
      promoToEditData: null,
      promoToFindId: null,
      promoToFindCity: "",
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
        toast.success("Promoción editada exitosamente");
        this.promoService.getAll().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        toast.error("Error al editar la promoción");
        console.error("Error al editar la promoción:", error);
      });

    this.handleCloseEditModal();
  };

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

  handleGet = () => {
    this.promoService
      .getAll()
      .then(() => {
        toast.success("Se mostrarón todas las promociones");
        this.promoService.getAll().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        toast.error("Error al obtener promoción");
        console.error("Error al obtener promoción", error);
      });
  };

  handleGetBestDiscount = () => {
    this.promoService
      .findBestDiscount()
      .then((data) => {
        toast.success("Mejor descuento encontrado exitosamente");
        this.setState({ promos: data });
      })
      .catch((error) => {
        toast.error("Error al obtener promoción");
        console.error("Error al obtener promoción", error);
      });
  };

  handleFindById = (promoId) => {
    this.promoService
      .findById(promoId)
      .then(() => {
        toast.success("Promoción encontrada exitosamente");
        this.promoService.findById().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        toast.error("Error al obtener promoción");
        console.error("Error al obtener promoción por ID:", error);
      });
      this.handleCloseFindById();
  };

  handleOpenFindById = () => {
    this.setState({ isFindByIdModalOpen: true });
  };

  handleCloseFindById = () => {
    this.setState({ isFindByIdModalOpen: false, promoToFindId: null });
  };

  handleFindByCity = (city) => {
    this.promoService
      .findByCity(city)
      .then(() => {
        toast.success("Mejor descuento encontrado exitosamente");
        this.promoService.findByCity().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        toast.error("Error al obtener promoción");
        console.error(`Error al obtener promociones en ${city}:`, error);
      });
      this.handleCloseFindByCity();
  };

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
          /* onGetBestDiscount={this.handleGetBestDiscount} */
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
        <ToastContainer />
      </>
    );
  }
}

export default App;
