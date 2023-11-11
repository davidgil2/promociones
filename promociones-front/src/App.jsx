import "./App.css";
import { Component } from "react";
import { PromoService } from "./service/PromoService";
import DataTable from "./display/DataTable";
import CrudPanel from "./display/CrudPanel";
import CreateModal from "./display/CreateModal";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      promos: [],
      isCreateModalOpen: false,
    };
    this.promoService = new PromoService();
  }

  componentDidMount() {
    this.promoService.getAll().then((data) => {
      this.setState({ promos: data });
    });
  }

  handleCreate = (newPromotionData) => {
    // Lógica para crear datos
    this.promoService.save(newPromotionData)
      .then((createdPromoId) => {
        console.log(`Promoción creada con ID: ${createdPromoId}`);
        // Actualizar la lista de promociones después de la creación
        this.promoService.getAll().then((data) => {
          this.setState({ promos: data });
        });
      })
      .catch((error) => {
        console.error('Error al crear la promoción:', error);
      });

    // Cierra el modal de creación después de la operación
    this.handleCloseCreateModal();
  };

  handleGet = () => {
    // Lógica para obtener datos
    console.log('Obtener datos');
  };

  handleUpdate = () => {
    // Lógica para actualizar datos
    console.log('Actualizar datos');
  };

  handleDelete = () => {
    // Lógica para borrar datos
    console.log('Borrar datos');
  };

  handleOpenCreateModal = () => {
    this.setState({ isCreateModalOpen: true });
  };

  handleCloseCreateModal = () => {
    this.setState({ isCreateModalOpen: false });
  };

  render() {
    const { promos, isCreateModalOpen } = this.state;

    return (
      <>
        <h1>Promociones [Módulo 9]</h1>
        <CrudPanel
          onCreate={this.handleOpenCreateModal}
          onGet={this.handleGet}
          onUpdate={this.handleUpdate}
          onDelete={this.handleDelete}
        />
        <DataTable promos={promos} />
        <CreateModal open={isCreateModalOpen}
          onClose={this.handleCloseCreateModal} 
          onCreate={this.handleCreate} 
        />
      </>
    );
  }
}

export default App;
