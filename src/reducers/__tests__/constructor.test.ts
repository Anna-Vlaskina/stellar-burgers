import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  TConstructorState
} from '../constructor';

import { TConstructorIngredient } from '../../utils/types';

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

const bun: TConstructorIngredient = {
  _id: '0001',
  id: 'bun-1',
  name: 'Test Bun',
  type: 'bun',
  ...base
};

const ingredient1: TConstructorIngredient = {
  _id: '1001',
  id: 'ing-1',
  name: 'Ingredient 1',
  type: 'main',
  ...base
};

const ingredient2: TConstructorIngredient = {
  _id: '1002',
  id: 'ing-2',
  name: 'Ingredient 2',
  type: 'main',
  ...base
};

const ingredient3: TConstructorIngredient = {
  _id: '1003',
  id: 'ing-3',
  name: 'Ingredient 3',
  type: 'main',
  ...base
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

describe('Тест редюсера constructorSlice', () => {
  it('Вернуть исходное состояние', () => {
    expect(constructorReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  it('Добавляет булочку, когда тип "bun"', () => {
    const newState = constructorReducer(initialState, addIngredient(bun));
    expect(newState.bun).toEqual(bun);
    expect(newState.ingredients).toHaveLength(0);
  });

  it('Добавлет начинку в массив ingredients', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(ingredient1)
    );
    expect(newState.ingredients).toEqual([ingredient1]);
  });

  it('Удалить ингредиент по id', () => {
    const state: TConstructorState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = constructorReducer(state, removeIngredient('ing-1'));
    expect(newState.ingredients).toEqual([ingredient2]);
  });

  it('Если id не найден, это не влияет на состояние', () => {
    const state: TConstructorState = {
      bun: null,
      ingredients: [ingredient1]
    };

    const newState = constructorReducer(state, removeIngredient('unknown'));
    expect(newState.ingredients).toEqual([ingredient1]);
  });

  it('Перемещение ингредиентов', () => {
    const state: TConstructorState = {
      bun: null,
      ingredients: [ingredient1, ingredient2, ingredient3]
    };

    const newState = constructorReducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );

    expect(newState.ingredients).toEqual([
      ingredient2,
      ingredient3,
      ingredient1
    ]);
  });

  it('Обработка некорректных индексов при перемещении ингредиента', () => {
    const state: TConstructorState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = constructorReducer(
      state,
      moveIngredient({ fromIndex: 5, toIndex: 1 })
    );

    expect(newState).toEqual(state);
  });

  it('Очищение конструктора', () => {
    const state: TConstructorState = {
      bun,
      ingredients: [ingredient1, ingredient2]
    };

    const newState = constructorReducer(state, clearConstructor());
    expect(newState).toEqual(initialState);
  });
});
