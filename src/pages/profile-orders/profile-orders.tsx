import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../reducers/profileOrders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.profileOrders.orders);
  const loading = useSelector((state) => state.profileOrders.loading);
  const error = useSelector((state) => state.profileOrders.error);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (loading) return <p>Загрузка заказов...</p>;
  if (error) return <p>Ошибка при загрузке заказов</p>;

  return <ProfileOrdersUI orders={orders} />;
};
