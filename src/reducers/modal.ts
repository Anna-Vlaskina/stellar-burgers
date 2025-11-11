import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '../utils/types';

export type TModalState = {
  ingredient: TIngredient | null;
  order: TOrder | null;
  isOpen: boolean;
};

const initialState: TModalState = {
  ingredient: null,
  order: null,
  isOpen: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openIngredientModal: (state, action: PayloadAction<TIngredient>) => {
      state.ingredient = action.payload;
      state.order = null;
      state.isOpen = true;
    },
    openOrderModal: (state, action: PayloadAction<TOrder | null>) => {
      state.order = action.payload;
      state.ingredient = null;
      state.isOpen = !!action.payload;
    },
    closeModal: (state) => {
      state.ingredient = null;
      state.order = null;
      state.isOpen = false;
    }
  }
});

export const { openIngredientModal, openOrderModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
