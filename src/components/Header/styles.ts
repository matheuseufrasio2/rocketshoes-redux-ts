import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 50px 0;
`;

export const CartLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    opacity: 0.7;
  }

  > div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
