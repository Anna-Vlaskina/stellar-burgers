import ingredientsReducer, {
  fetchIngredients,
  clearError
} from '../ingredients';
import { TIngredient } from '../../utils/types';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

const base = {
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 20,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile'
};

const ingredient1: TIngredient = {
  _id: '1',
  name: 'Ingredient 1',
  type: 'main',
  ...base
};

const ingredient2: TIngredient = {
  _id: '2',
  name: 'Ingredient 2',
  type: 'sauce',
  ...base
};

describe('Тест редюсера ingredientsSlice', () => {
  it('Возвращает начальное состояние при первом вызове', () => {
    expect(ingredientsReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  it('Поведение редюсера в начале асинхронного запроса', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('Успешный ответ API с ингредиентами', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [ingredient1, ingredient2]
    };
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      items: [ingredient1, ingredient2]
    });
  });

  it('Поведение редюсера при ошибке запроса', () => {
    const errorMessage = 'Network error';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });

  it('Поведение редюсера при ошибке запроса без сообщения ошибки', () => {
    const action = { type: fetchIngredients.rejected.type, error: {} };
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });

  it('Работа синхронного редьюсера clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const state = ingredientsReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });
});
