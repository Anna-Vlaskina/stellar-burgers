import feedReducer, { fetchFeeds } from '../feed';
import { TOrdersData, TOrder } from '../../utils/types';

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
  name: 'Order 1',
  createdAt: '2025-11-30T10:00:00.000Z',
  updatedAt: '2025-11-30T10:00:00.000Z',
  ingredients: ['ing-1', 'ing-2']
};

const order2: TOrder = {
  _id: '2',
  number: 1002,
  status: 'pending',
  name: 'Order 2',
  createdAt: '2025-11-30T11:00:00.000Z',
  updatedAt: '2025-11-30T11:00:00.000Z',
  ingredients: ['ing-3']
};

const mockOrdersData: TOrdersData = {
  orders: [order1, order2],
  total: 10,
  totalToday: 5
};

describe('Тест редюсера feedSlice', () => {
  it('Возвращает начальное состояние при первом вызове', () => {
    expect(feedReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('Поведение редюсера в начале асинхронного запроса', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: false
    });
  });

  it('Поведение редюсера в завершении асинхронного запроса', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockOrdersData };
    const state = feedReducer({ ...initialState, loading: true }, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      orders: mockOrdersData.orders,
      total: mockOrdersData.total,
      totalToday: mockOrdersData.totalToday
    });
  });

  it('Поведение редюсера при ошибке асинхронного запроса', () => {
    const action = { type: fetchFeeds.rejected.type };
    const state = feedReducer({ ...initialState, loading: true }, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: true
    });
  });
});
