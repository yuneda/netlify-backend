import { getProductById } from "./productService";

export const checkStock = async (productId: number) => {
  const product = await getProductById(productId);
  return { productId, inStock: product.inStock }
}