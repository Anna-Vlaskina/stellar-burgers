import { useEffect } from 'react';
import { useSelector, useDispatch, RootState } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

import { fetchIngredients } from '../../reducers/ingredients';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const isIngredientsLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  if (!isIngredientsLoading && ingredients.length === 0) {
    return <Preloader />;
  }

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
