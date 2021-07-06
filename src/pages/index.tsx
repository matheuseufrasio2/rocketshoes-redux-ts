/* eslint-disable @next/next/no-img-element */
import { ProductList } from '../styles/pages/Home';
import { MdAddShoppingCart } from 'react-icons/md'
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../services/axios';
import { formatPrice } from '../utils/format'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addProductToCart } from '../store/modules/cart/actions';
import { IState } from '../store';
import { ICartItem } from '../store/modules/cart/types';

interface ProductAPI {
  id: number;
  price: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
  image: string;
  quantityOnCart: number;
}

export default function Home() {
  const cartItems = useSelector<IState, ICartItem[]>((state) => state.cart.items)
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('products').then((response) => {
      const data: Product[] = response.data.map((product: ProductAPI) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        quantityOnCart: cartItems.find(p => {
          return p.product.id === product.id
        })?.quantity,
      }))
      setProducts(data);
    })
  }, [cartItems]);

  const handleAddProductToCart = useCallback((product) => {
    dispatch(addProductToCart(product))
  }, [dispatch]);

  return (
    <ProductList>
      {
        products.map(product => (
          <li key={product.id}>
            <img
              src={product.image}
              alt={product.title}
            />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button type="button" onClick={() => handleAddProductToCart(product)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> {product.quantityOnCart || '0'}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))
      }

    </ProductList>
  )
}
