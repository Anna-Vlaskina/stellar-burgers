import { RootState } from '../services/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectUser = (state: RootState) => state.user.user;
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
export const selectOrderRequest = (state: RootState) => state.order.isLoading;
export const selectOrderModalData = (state: RootState) => state.order.orderData;

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectIngredientsItems = (state: RootState) =>
  state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectFeed = (state: RootState) => state.feed;
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileLoading = (state: RootState) =>
  state.profileOrders.loading;
export const selectProfileError = (state: RootState) =>
  state.profileOrders.error;

export const selectAllOrders = createSelector(
  [selectFeedOrders, selectProfileOrders],
  (feedOrders, profileOrders) => [...feedOrders, ...profileOrders]
);
