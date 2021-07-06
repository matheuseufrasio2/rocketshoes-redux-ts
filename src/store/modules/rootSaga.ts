import { all } from 'redux-saga/effects'
import cart from './cart/reducer'

export default function* rootSaga() {
  return yield all([
    cart,
  ]);
}
