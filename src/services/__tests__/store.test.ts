import { rootReducer } from '../store';

describe('Инициализация rootReducer', () => {
  it('Возвращает начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(typeof initialState).toBe('object');
    expect(initialState).not.toBeNull();

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('profileForm');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('profileOrders');
    expect(initialState).toHaveProperty('order');

    Object.entries(initialState).forEach(([key, value]) => {
      expect(value).not.toBeUndefined();
    });
  });
});
