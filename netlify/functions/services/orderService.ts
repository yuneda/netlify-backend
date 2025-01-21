import { Order } from "../interface/order.interface";
import { getProductById } from "./productService";
import { logAction } from "../utils/logger";

let orderDatabase: Order[] = [];

interface CreateOrder {
  productId: number; 
  quantity: number
}

const createOrder = async ({ productId, quantity }:CreateOrder) => {

  // Input validation
  if (!productId || !quantity || quantity < 1) {
    throw new Error('Invalid input: Product ID and quantity (minimum 1) are required')
  }

  const product = await getProductById(productId)

  // Check stock
  if (!product.inStock) {
    throw new Error('Product is out of stock')
  }

  // Create a new order
  const newOrder: Order = {
    id: Date.now().toString(),
    productId: product.id,
    productName: product.title,
    quantity,
    price: product.price,
    totalPrice: product.price * quantity,
    orderDate: new Date().toISOString()
  }

  // Save into database
  orderDatabase.push(newOrder)
  logAction('Order placed', newOrder)
  return newOrder;
}

const getOrders = () => orderDatabase

export { createOrder, getOrders }