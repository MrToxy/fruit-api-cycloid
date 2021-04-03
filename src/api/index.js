import axios from "axios";

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000",
});

const endpoint = (endpoint = "") => `/fruit/${endpoint}`;

export default {
  all: () => $axios.get(endpoint()),
  show: (id) => $axios.get(endpoint(id)),
  delete: (id) => $axios.delete(endpoint(id)),
  store: (data) => {
    const {
      isFruit = true,
      name,
      image,
      price,
      color,
      description,
      taste,
      expires,
    } = data;

    return $axios.post(endpoint, {
      isFruit,
      name,
      image,
      price,
      color,
      description,
      taste,
      expires,
    });
  },
};
