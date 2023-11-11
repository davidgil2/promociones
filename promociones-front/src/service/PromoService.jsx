import axios from "axios";

export class PromoService {
  baseURL = "http://localhost:8089/promo";
  getAll() {
    return axios.get(this.baseURL + "/findAll")
    .then((res) => res.data);
  }

  save(){
    return axios.get(this.baseURL + "/save")
    .then((res) => res.data);
  }
}
