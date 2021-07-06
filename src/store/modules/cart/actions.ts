import { IProduct } from "./types";

export function addProductToCart(product: IProduct) {
  return {
    type: 'ADD_PRODUCT_TO_CART',
    payload: {
      product
    }
  }
}

export function removeProductToCart(id: number) {
  return {
    type: 'REMOVE_PRODUCT_TO_CART',
    payload: {
      id
    }
  }
}

export function updateQuantity(id: number, quantity: number) {
  return {
    type: 'UPDATE_PRODUCT_QUANTITY',
    payload: {
      id,
      quantity
    }
  }
}
