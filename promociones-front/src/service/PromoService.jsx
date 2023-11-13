import axios from "axios";

export class PromoService {
  baseURL = "http://localhost:8089/promo";
  getAll() {
    return axios.get(this.baseURL + "/findAll")
    .then((res) => res.data);
  }

  save(promocion){
    return axios.post(this.baseURL + "/save", promocion)
    .then((res) => res.data);
  }

  delete(id){
    return axios.delete(this.baseURL + "/delete/" + id)
    .then((res) => res.data);
  }

  edit(promocion){
    return axios.put(this.baseURL + "/update", promocion)
    .then((res) => res.data);
  }

  findById(id) {
    return axios.get(`${this.baseURL}/find/${id}`)
      .then((res) => res.data);
  }

  findByCity(city) {
    return axios.get(`${this.baseURL}/findByCity/${city}`)
      .then((res) => res.data);
  }

  findBestDiscount(limit, page) {
    const params = { limit, page }; // Agrega los parámetros de paginación
    return axios.get(`${this.baseURL}/bestDiscount`, { params })
      .then((res) => res.data);
  }  
}
