export interface IProduct {
  id: number;
  title: string;
  price: number;
  priceFormatted?: string;
  image: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  subtotal: string;
}
export interface ICartState {
  items: ICartItem[]
  total: string;
}
