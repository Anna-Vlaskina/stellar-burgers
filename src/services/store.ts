import { configureStore, combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from '../reducers/ingredients';
import constructorReducer from '../reducers/constructor';
import userReducer from '../reducers/user';
import profileFormReducer from '../reducers/profileForm';
import feedReducer from '../reducers/feed';
import profileOrdersReducer from '../reducers/profileOrders';
import orderReducer from '../reducers/order';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  profileForm: profileFormReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
