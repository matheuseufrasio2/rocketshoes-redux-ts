/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { MdShoppingBasket } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { IState } from '../../store';

import { Container, CartLink } from './styles';

export function Header() {
  const itemsOnCartQuantity = useSelector<IState, number>((state) => state.cart.items.length)
  return (
    <Container>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="rocketshoes" />
        </a>
      </Link>
      <Link passHref href="/cart">
        <CartLink>
          <div>
            <strong>Meu carrinho</strong>
            <span>{itemsOnCartQuantity} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#fff" />
        </CartLink>
      </Link>
    </Container>
  );
}
