# Project: API for Product and Order Management

This project provides a serverless API to manage products, orders, and stock. Built using Netlify Functions, it allows creating orders, fetching product details, and checking stock.

---

## **How to Run the Project**

### **Prerequisites**
- Node.js installed
- Netlify CLI installed
  ```bash
  npm install -g netlify-cli
  ```

### **Steps to Run**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   netlify dev
   ```

   The server will be running on `http://localhost:8888` by default.

---

## **Project Definition**

This API provides the following features:

1. **Fetch Products**: Retrieve a list of products from an external source.
2. **Place Orders**: Create new orders and store them in memory.
3. **View Orders**: Fetch the list of all existing orders.
4. **Check Stock**: Verify whether a product is in stock.

---

## **Endpoints**

### **1. Get Products**
- **Endpoint**: `/api/products`
- **Method**: `GET`

#### Request:
No body is required.

#### Response:
```json
{
  "products": [
    {
      "id": 1,
      "title": "Product 1",
      "price": 50,
      "inStock": true
    },
    {
      "id": 2,
      "title": "Product 2",
      "price": 30,
      "inStock": false
    }
  ]
}
```

---

### **2. Place an Order**
- **Endpoint**: `/api/order`
- **Method**: `POST`

#### Request:
```json
{
  "productId": 1,
  "quantity": 2
}
```

#### Response:
```json
{
  "message": "Order placed successfully",
  "order": {
    "id": "1674395767890",
    "productId": 1,
    "productName": "Product 1",
    "quantity": 2,
    "price": 50,
    "totalPrice": 100,
    "orderDate": "2025-01-21T12:00:00.000Z"
  }
}
```

---

### **3. Get Orders**
- **Endpoint**: `/api/orders`
- **Method**: `GET`

#### Request:
No body is required.

#### Response:
```json
{
  "orders": [
    {
      "id": "1674395767890",
      "productId": 1,
      "productName": "Product 1",
      "quantity": 2,
      "price": 50,
      "totalPrice": 100,
      "orderDate": "2025-01-21T12:00:00.000Z"
    }
  ]
}
```

---

### **4. Check Stock**
- **Endpoint**: `/api/stock/{productId}`
- **Method**: `GET`

#### Request:
Replace `{productId}` with the ID of the product to check.

#### Response:
- **If the product is in stock**:
  ```json
  {
    "productId": 1,
    "inStock": true
  }
  ```

- **If the product is out of stock**:
  ```json
  {
    "productId": 2,
    "inStock": false
  }
  ```

---

## **Folder Structure**
```
.
├── netlify
│   └── functions
│       ├── interface
│       │   ├── order.interface.ts   # Order interface
│       │   └── product.interface.ts # Product interface
│       ├── services
│       │   ├── productService.ts # Product-related logic
│       │   ├── orderService.ts   # Order-related logic
│       │   └── stockService.ts   # Stock-checking logic
│       ├── utils
│       │   ├── logger.ts        # Logging utility
│       │   ├── stockUtils.ts    # Utility functions for stock
│       │   └── productUtils.ts  # Utility functions for products
│       └── api.ts      # Main handler for API requests
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

---

## **Notes**
- This project uses a mock database stored in memory (`orderDatabase`). In a production setup, you would replace this with a persistent database.
- The product data is fetched from `https://jsonplaceholder.typicode.com/posts` for simulation purposes.
---