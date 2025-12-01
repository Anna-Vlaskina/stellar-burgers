import profileFormReducer, {
  setProfileForm,
  setProfileFormValue,
  resetProfileForm
} from '../profileForm';
import { updateUser } from '../user';
import { TUser } from '../../utils/types';

const initialState = {
  form: {
    name: '',
    email: ''
  },
  isEdited: false
};

const mockUser: TUser = {
  name: 'Иван Иванов',
  email: 'ivan@example.com'
};

describe('Редьюсер profileFormSlice', () => {
  it('Возвращает начальное состояние', () => {
    expect(profileFormReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  it('Устанавливает форму полностью через setProfileForm', () => {
    const state = profileFormReducer(initialState, setProfileForm(mockUser));
    expect(state.form).toEqual(mockUser);
    expect(state.isEdited).toBe(false);
  });

  it('Меняет отдельное поле через setProfileFormValue и помечает форму как изменённую', () => {
    const actionPayload = {
      field: 'name' as keyof TUser,
      value: 'Пётр Петров'
    };
    const state = profileFormReducer(
      initialState,
      setProfileFormValue(actionPayload)
    );
    expect(state.form.name).toBe('Пётр Петров');
    expect(state.isEdited).toBe(true);
  });

  it('Сбрасывает форму через resetProfileForm', () => {
    const stateBefore = {
      form: { name: 'Алексей', email: 'alex@example.com' },
      isEdited: true
    };
    const state = profileFormReducer(stateBefore, resetProfileForm(mockUser));
    expect(state.form).toEqual(mockUser);
    expect(state.isEdited).toBe(false);
  });

  it('Обновляет форму при успешном updateUser.fulfilled', () => {
    const action = { type: updateUser.fulfilled.type, payload: mockUser };
    const stateBefore = {
      form: { name: 'Старое имя', email: 'old@example.com' },
      isEdited: true
    };
    const state = profileFormReducer(stateBefore, action);
    expect(state.form).toEqual(mockUser);
    expect(state.isEdited).toBe(false);
  });

  it('Не меняет форму при updateUser.fulfilled с пустым payload', () => {
    const action = { type: updateUser.fulfilled.type, payload: null };
    const stateBefore = {
      form: { name: 'Старое имя', email: 'old@example.com' },
      isEdited: true
    };
    const state = profileFormReducer(stateBefore, action);
    expect(state).toEqual(stateBefore);
  });
});
