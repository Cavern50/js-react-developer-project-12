import { BASE_URL } from "./constants";
import axios from "axios";

export class RestApi {
  constructor() {
    this.url = BASE_URL;
  }

  handleSuccess = (response) => response;

  handleError = (error) => {
    return Promise.reject(error);
  }


  async #create(headers) {
    const service = axios.create({
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...headers
      }
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    return service;
  };

  get = async (path = "", headers) => {
    const service = await this.#create(headers);

    return service.request({
      method: "GET",
      url: `${this.url}${path}`
    })
      .then(res => res.data.data)
      .catch(err => this.handleError(err));
  };

  post = async (path = "", requestParams = {}, headers) => {
    const service = await this.#create(headers);
    try {
      const { data } = await service.request({
        method: "POST",
        url: `${this.url}${path}`,
        data: requestParams
      });
      return data;
    } catch (e) {
      throw e;
    }
  };

  put = async (path = "", data = {}, headers) => {
    const service = await this.#create(headers);

    return service.request({
      method: "PUT",
      url: `${this.url}${path}`,
      data
    })
      .then(res => res.data)
      .catch(err => this.handleError(err));
  };

  delete = async (path = "", headers) => {
    const service = await this.#create(headers);

    return service.request({
      method: "DELETE",
      url: `${this.url}${path}`
    })
      .then(res => res.data)
      .catch(err => err);
  };

}