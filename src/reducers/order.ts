import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { clearConstructor } from './constructor';

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'orders/createOrder',
  async (ingredientIds, { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      const orderNumber = response.order.number;
      const fullOrderResponse = await getOrderByNumberApi(orderNumber);
      const fullOrder = fullOrderResponse.orders[0];
      dispatch(clearConstructor());
      return fullOrder;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Ошибка создания заказа');
    }
  }
);

type TOrdersState = {
  orderData: TOrder | null;
  isLoading: boolean;
  error: boolean;
  isModalOpen: boolean;
};

const initialState: TOrdersState = {
  orderData: null,
  isLoading: false,
  error: false,
  isModalOpen: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openOrderModal: (state) => {
      state.isModalOpen = true;
    },
    closeOrderModal: (state) => {
      state.isModalOpen = false;
      state.orderData = null;
    },
    clearOrder: (state) => {
      state.orderData = null;
      state.error = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.isModalOpen = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.orderData = null;
      });
  }
});

export const { openOrderModal, closeOrderModal, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
