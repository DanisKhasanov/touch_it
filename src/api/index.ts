import axios from "axios";

const API_URL = "https://fakestoreapi.com";

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProduct = async (id: number | string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};
