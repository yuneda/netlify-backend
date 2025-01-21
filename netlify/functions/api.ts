import { Handler } from '@netlify/functions'
import { logAction } from "./utils/logger";
import { getProducts } from "./services/productService";
import { createOrder, getOrders } from "./services/orderService";
import { checkStock } from './services/stockService';

// Mengatur CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
}

// Handler utama untuk API
const handler: Handler = async (event, context) => {
  try {

    // Handle OPTIONS request untuk CORS
    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers }

    const { path, httpMethod, body } = event;

    // Route untuk mendapatkan daftar produk
    if (path === '/api/products' && httpMethod === 'GET') {
      const products = await getProducts()
      return { statusCode: 200, headers, body: JSON.stringify({ products }) }
    }

    // Route untuk memeriksa stok produk
    if (path.startsWith('/api/stock') && httpMethod === 'GET') {
      const productId = path.split('/').pop();
      if (!productId) throw new Error('Product ID is required');
      const stockStatus = await checkStock(parseInt(productId, 10));
      return { statusCode: 200, headers, body: JSON.stringify(stockStatus) };
    }

    // Route untuk membuat order
    if (path === '/api/order' && httpMethod === 'POST') {
      const order = await createOrder(JSON.parse(body || '{}'));
      return { statusCode: 200, headers, body: JSON.stringify({ message: 'Order placed successfully', order }) };
    }

    // Route untuk mendapatkan daftar order
    if (event.path === '/api/orders' && event.httpMethod === 'GET') {
      const orders = getOrders()
      return {
        statusCode: 200, headers, body: JSON.stringify({ orders })
      }
    }

    // Handle route tidak ditemukan
    return { statusCode: 404, headers, body: JSON.stringify({ error: 'Route not found' }) }

  } catch (error: any) {
    logAction('Error', { message: error.message, path: event.path, method: event.httpMethod });
    return { statusCode: 400, headers, body: JSON.stringify({ error: error.message }) };
  }
}

export { handler }