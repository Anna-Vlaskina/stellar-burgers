import { FC, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import {
  selectIngredientsItems,
  selectAllOrders,
  selectOrderModalData
} from '../../services/selectors';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderModalData = useSelector(selectOrderModalData);
  const allOrders = useSelector(selectAllOrders);
  const ingredients = useSelector(selectIngredientsItems);

  const [localOrder, setLocalOrder] = useState<TOrder | null>(null);

  const orderData = useMemo<TOrder | null>(() => {
    if (orderModalData) return orderModalData;
    if (number && allOrders) {
      const found = allOrders.find((o) => o.number === Number(number));
      if (found) return found;
    }
    return localOrder;
  }, [orderModalData, allOrders, localOrder, number]);

  useEffect(() => {
    if (!orderData && number) {
      getOrderByNumberApi(Number(number))
        .then((res) => {
          if (res.orders && res.orders.length) setLocalOrder(res.orders[0]);
        })
        .catch(console.error);
    }
  }, [orderData, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) acc[item] = { ...ingredient, count: 1 };
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
