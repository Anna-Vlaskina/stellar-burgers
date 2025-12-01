import userReducer, {
  setAuthChecked,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser
} from '../user';
import { TUser } from '../../utils/types';

const initialState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

const mockUser: TUser = {
  name: 'Иван Иванов',
  email: 'ivan@example.com'
};

describe('Редьюсер userSlice', () => {
  it('Возвращает начальное состояние', () => {
    expect(userReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('Устанавливает isAuthChecked через setAuthChecked', () => {
    const state = userReducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  it('Обрабатывает registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });

  it('Обрабатывает registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: mockUser,
      isAuthChecked: true
    });
  });

  it('Обрабатывает registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Ошибка регистрации'
    };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка регистрации'
    });
  });

  it('Обрабатывает loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });

  it('Обрабатывает loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      user: mockUser,
      isAuthChecked: true
    });
  });

  it('Обрабатывает loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Ошибка авторизации'
    };
    const state = userReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка авторизации'
    });
  });

  it('Обрабатывает getUser.fulfilled', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('Обрабатывает getUser.rejected', () => {
    const action = { type: getUser.rejected.type };
    const state = userReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('Обрабатывает updateUser.fulfilled', () => {
    const updatedUser: TUser = {
      name: 'Пётр Петров',
      email: 'petr@example.com'
    };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = userReducer({ ...initialState, user: mockUser }, action);
    expect(state.user).toEqual(updatedUser);
  });

  it('Обрабатывает logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer({ ...initialState, user: mockUser }, action);
    expect(state.user).toBeNull();
  });
});
