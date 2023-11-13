import axios from "axios";

// Clase PromoService para gestionar las operaciones de promociones
export class PromoService {
  // URL base para las solicitudes HTTP
  baseURL = "http://localhost:8089/promo";

  // Obtiene todas las promociones
  getAll() {
    return axios.get(`${this.baseURL}/findAll`)
      .then((res) => res.data);
  }

  // Guarda una nueva promoción
  save(promocion) {
    return axios.post(`${this.baseURL}/save`, promocion)
      .then((res) => res.data);
  }

  // Elimina una promoción por ID
  delete(id) {
    return axios.delete(`${this.baseURL}/delete/${id}`)
      .then((res) => res.data);
  }

  // Edita una promoción
  edit(promocion) {
    return axios.put(`${this.baseURL}/update`, promocion)
      .then((res) => res.data);
  }

  // Encuentra una promoción por ID
  findById(id) {
    return axios.get(`${this.baseURL}/find/${id}`)
      .then((res) => res.data);
  }

  // Encuentra promociones por ciudad
  findByCity(city) {
    return axios.get(`${this.baseURL}/findByCity/${city}`)
      .then((res) => res.data);
  }

  // Encuentra promociones con el mejor descuento, con paginación opcional
  findBestDiscount(limit, page) {
    const params = { limit, page }; // Agrega los parámetros de paginación
    return axios.get(`${this.baseURL}/bestDiscount`, { params })
      .then((res) => res.data);
  }  
}
