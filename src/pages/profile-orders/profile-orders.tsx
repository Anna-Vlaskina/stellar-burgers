import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../reducers/profileOrders';
import {
  selectProfileOrders,
  selectProfileLoading,
  selectProfileError
} from '../../services/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectProfileOrders);
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (loading) return <p>Загрузка заказов...</p>;
  if (error) return <p>Ошибка при загрузке заказов</p>;

  return <ProfileOrdersUI orders={orders} />;
};
