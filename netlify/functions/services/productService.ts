import axios from "axios";
import { formatProduct } from "../utils/productUtils";

const getProducts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response.data.map(formatProduct);
}

const getProductById = async (productId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${productId}`);
  return formatProduct(response.data);
};

export { getProducts, getProductById }