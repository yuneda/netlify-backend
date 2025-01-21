interface Order {
  id: string
  productId: number
  productName: string
  quantity: number
  price: number
  totalPrice: number
  orderDate: string
}

export type { Order }