import { isInStock } from './stockUtils';
import { Product } from "../interface/product.interface";

export const formatProduct = (product: any): Product => {
  return {
    id: product.id,
    title: product.title,
    price: parseFloat((Math.random() * 100).toFixed(2)), // Simulasi harga
    inStock: isInStock(product.id),
  };
};
