/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useCallback } from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { removeProductToCart, updateQuantity } from '../store/modules/cart/actions';
import { ICartState } from '../store/modules/cart/types';

import { Container, ProductTable, Total } from '../styles/pages/Cart';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector<IState, ICartState>((state) => state.cart)

  const handleRemoveProduct = useCallback((id) => {
    dispatch(removeProductToCart(id));
  }, [dispatch])

  const increment = useCallback((id, quantity) => {
    dispatch(updateQuantity(id, quantity + 1));
  }, [dispatch])

  const decrement = useCallback((id, quantity) => {
    dispatch(updateQuantity(id, quantity -1));
  }, [dispatch])

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            cartItems.items.map(cartItem => (
              <tr key={cartItem.product.id}>
                <td>
                  <img
                    src={cartItem.product.image}
                    alt={cartItem.product.title}
                  />
                </td>
                <td>
                  <strong>{cartItem.product.title}</strong>
                  <span>{cartItem.product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(cartItem.product.id, cartItem.quantity)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={cartItem.quantity} />
                    <button type="button" onClick={() => increment(cartItem.product.id, cartItem.quantity)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{cartItem.subtotal}</strong>
                </td>
                <td>
                  <button type="button" onClick={() => handleRemoveProduct(cartItem.product.id)}>
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" >
          Finalizar Pedido
        </button>

        <Total>
          <span>TOTAL</span>
          <strong>{cartItems.total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
