import express, {Request, Response} from "express"
import axios from "axios"

const app = express();
const port = 3000;

app.use(express.json());

interface Product {
  id: number,
  name: string,
  price: number,
  quantity: number
}

// this is mock database
const orders: { [key: number]: Product[] } = {};

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // Dummy API simulating products
    return response.data.map((product: Product) => ({
      id: product.id,
      name: `Product ${product.id}`,
      price: Math.random() * 100 + 10, // random price
      availability: product.id %2 !== 0
    }))
  } catch (error) {
    throw new Error("Failed to fetch product")
  }
}

const checkStock = (productId: number) => {
  return productId % 2 !== 0;
}

app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await fetchProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({error: "Failed to fetch products"})
  }
})

app.post('/order', async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  if (typeof productId !== 'number' || typeof quantity !== 'number' || quantity <= 0) {
    res.json({error: "Invalid input. Please provide a valid product ID and quantity."});
    return;
  }

  try {
    const products: Product[] = await fetchProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
      res.status(404).json({error: "Product not found"});
      return;
    }

    if (!checkStock(productId)) {
      res.status(400).json({error: "Product is out of stock"});
      return;
    }

    // create a new order entry in the mock database
    const order: Product = {
      id: productId,
      name: product.name,
      price: product.price,
      quantity
    }

    if (!orders[productId]) {
      orders[productId] = []
    }

    orders[productId].push(order);

    res.json({ message: "Order placed succesfully", order})
  } catch (error) {
    res.status(500).json({error: "Error processing the order"})
  }
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
})

// Start the server
app.listen(port, ()=> {
  console.log(`Server is running at http://localhost:${port}`);
})