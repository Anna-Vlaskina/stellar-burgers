import profileOrdersReducer, { fetchProfileOrders } from '../profileOrders';
import { TOrder, TOrdersData } from '../../utils/types';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: false
};

const order1: TOrder = {
  _id: '1',
  number: 1001,
  status: 'done',
  name: 'Заказ 1',
  createdAt: '2025-11-30T10:00:00.000Z',
  updatedAt: '2025-11-30T10:00:00.000Z',
  ingredients: ['ing-1', 'ing-2']
};

const order2: TOrder = {
  _id: '2',
  number: 1002,
  status: 'pending',
  name: 'Заказ 2',
  createdAt: '2025-11-30T11:00:00.000Z',
  updatedAt: '2025-11-30T11:00:00.000Z',
  ingredients: ['ing-3']
};

const mockOrdersData: TOrdersData = {
  orders: [order1, order2],
  total: 2,
  totalToday: 2
};

describe('Редьюсер profileOrdersSlice', () => {
  it('Возвращает начальное состояние', () => {
    expect(profileOrdersReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  it('Обрабатывает fetchProfileOrders.pending', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: false
    });
  });

  it('Обрабатывает fetchProfileOrders.fulfilled', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: mockOrdersData
    };
    const state = profileOrdersReducer(
      { ...initialState, loading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      orders: mockOrdersData.orders,
      total: mockOrdersData.total,
      totalToday: mockOrdersData.totalToday,
      loading: false
    });
  });

  it('Обрабатывает fetchProfileOrders.rejected', () => {
    const action = { type: fetchProfileOrders.rejected.type };
    const state = profileOrdersReducer(
      { ...initialState, loading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: true
    });
  });
});
