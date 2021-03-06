import { applyMiddleware, createStore } from 'redux';
import { ICartState } from './modules/cart/types';
import createSagaMiddleware from '@redux-saga/core';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

import { composeWithDevTools } from 'redux-devtools-extension';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middlewares)
));

sagaMiddleware.run(rootSaga);

export default store;
