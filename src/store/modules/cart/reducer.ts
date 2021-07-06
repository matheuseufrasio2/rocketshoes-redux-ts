import { Reducer } from "redux";
import produce from 'immer';
import { ICartState, IProduct } from "./types";
import { formatPrice } from "../../../utils/format";

const INITIAL_STATE: ICartState = {
  items: [],
  total: formatPrice(0)
}

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_PRODUCT_TO_CART': {
        const payload = action.payload;
        const product: IProduct = payload.product;

        const productInCartIndex = draft.items.findIndex( item =>
          item.product.id === product.id
        )

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
          draft.items[productInCartIndex].subtotal = formatPrice(draft.items[productInCartIndex].product.price * draft.items[productInCartIndex].quantity);
          draft.total = formatPrice(draft.items.reduce((total, current) => {
            return total + current.product.price * current.quantity;
          }, 0))
        } else {
          draft.items.push({
            product,
            quantity: 1,
            subtotal: formatPrice(product.price),
          })
          draft.total = formatPrice(draft.items.reduce((total, current) => {
            return total + current.product.price * current.quantity;
          }, 0))
        }

      }
      case 'REMOVE_PRODUCT_TO_CART': {
        const { id } = action.payload;
        draft.items =  draft.items.filter(item => item.product.id !== id);
        draft.total = formatPrice(draft.items.reduce((total, current) => {
          return total + current.product.price * current.quantity;
        }, 0))
      }
      case 'UPDATE_PRODUCT_QUANTITY': {
        const { id, quantity } = action.payload;
        if (quantity <= 0) return;
        const itemToUpdate = draft.items.find(item => item.product.id === id);

        if (itemToUpdate && itemToUpdate.quantity > 0) {
          itemToUpdate.quantity = quantity;
          itemToUpdate.subtotal = formatPrice(itemToUpdate.product.price * itemToUpdate.quantity)
          draft.total = formatPrice(draft.items.reduce((total, current) => {
            return total + current.product.price * current.quantity;
          }, 0))
        }

      }
      default: {
        return draft;
      }
    }
  });
}


export default cart;
