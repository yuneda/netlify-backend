export const isInStock = (productId: number): boolean => {
  return productId % 2 !== 0;
};