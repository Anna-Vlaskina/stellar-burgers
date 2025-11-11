import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../utils/types';
import { getOrdersApi } from '../utils/burger-api';

export const fetchProfileOrders = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('profileOrders/fetch', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();
    const total = orders.length;
    const today = new Date().toISOString().slice(0, 10);
    const totalToday = orders.filter(
      (o) => o.createdAt.slice(0, 10) === today
    ).length;

    return { orders, total, totalToday };
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка загрузки заказов');
  }
});

export type TProfileOrdersState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: boolean;
};

const initialState: TProfileOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: false
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        fetchProfileOrders.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.loading = false;
        }
      )
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export default profileOrdersSlice.reducer;
