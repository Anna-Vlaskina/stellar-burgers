import orderReducer, {
  createOrder,
  openOrderModal,
  closeOrderModal,
  clearOrder
} from '../order';
import { TOrder } from '../../utils/types';

const initialState = {
  orderData: null,
  isLoading: false,
  error: false,
  isModalOpen: false
};

const mockOrder: TOrder = {
  _id: '1',
  number: 1234,
  status: 'done',
  name: 'Test Order',
  createdAt: '2025-11-30T12:00:00.000Z',
  updatedAt: '2025-11-30T12:00:00.000Z',
  ingredients: ['ing-1', 'ing-2']
};

describe('Тест редюсера orderSlice', () => {
  it('Возвращает начальное состояние при первом вызове', () => {
    expect(orderReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('Работа редюсера для openOrderModal', () => {
    const state = orderReducer(initialState, openOrderModal());
    expect(state.isModalOpen).toBe(true);
  });

  it('Работа редюсера для closeOrderModal', () => {
    const state = orderReducer(
      { ...initialState, orderData: mockOrder, isModalOpen: true },
      closeOrderModal()
    );
    expect(state).toEqual({
      ...initialState,
      orderData: null,
      isModalOpen: false
    });
  });

  it('Работа редюсера для clearOrder', () => {
    const state = orderReducer(
      { ...initialState, orderData: mockOrder, error: true },
      clearOrder()
    );
    expect(state).toEqual({
      ...initialState,
      orderData: null,
      error: false
    });
  });

  it('Поведение редюсера в начале асинхронного запроса', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: false,
      isModalOpen: true
    });
  });

  it('Успешный ответ API с созданным заказом', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = orderReducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orderData: mockOrder
    });
  });

  it('Поведение редюсера при ошибке запроса', () => {
    const action = { type: createOrder.rejected.type };
    const state = orderReducer(
      { ...initialState, isLoading: true, orderData: mockOrder },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: true,
      orderData: null
    });
  });
});
