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
}
