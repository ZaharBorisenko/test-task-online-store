import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchProducts = () => api.get("/products");

export const fetchProductById = (id: number) => api.get(`/products/${id}`);
