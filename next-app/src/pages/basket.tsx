// Імпортуємо React та хук useEffect для управління станом компоненту та виконання побічних ефектів
import React, { useEffect } from 'react';

// Імпортуємо компонент CartItemComponent для відображення товарів у кошику
import CartItemComponent from '@/components/basket/cartitems.component';
// Імпортуємо компонент CartSummeryComponent для відображення підсумку кошика
import CartSummeryComponent from '@/components/basket/cartsummery.component';
// Імпортуємо компонент FooterComponent для відображення нижнього колонтитулу
import FooterComponent from '@/components/generic/footer.component';
// Імпортуємо компонент HeaderComponent для відображення верхнього колонтитулу
import HeaderComponent from '@/components/generic/header.component';
// Імпортуємо функцію deleteProductFromOrder для видалення товару з замовлення
import { deleteProductFromOrder } from '@/hooks/order/deleteProductFromOrder';
// Імпортуємо функцію listOrder для отримання списку замовлень
import { listOrder } from '@/hooks/order/listOrder';
// Імпортуємо Enum для статусів замовлення
import { OrderStatusEnum } from '@/hooks/order/util/order-status-enum';
// Імпортуємо інтерфейс IOrder для типізації об'єктів замовлення
import { IOrder } from '@/hooks/order/util/order.interface';
// Імпортуємо функцію getProductsList для отримання списку продуктів
import { getProductsList } from '@/hooks/product/getProductsList';
// Імпортуємо інтерфейс IProduct для типізації об'єктів продукту
import { IProduct } from '@/hooks/product/interface/product.interface';
// Імпортуємо функцію isTokenValid для перевірки валідності токена
import { isTokenValid } from '@/hooks/util/token.util';
// Імпортуємо хук useAppContext для отримання контексту додатка
import { useAppContext } from '@/pages/_appWrapper';

// Оголошення інтерфейсу ICartItem, який розширює IProduct і додає поле count для кількості товару
export interface ICartItem extends IProduct {
  count: number;
}

// Головний компонент сторінки кошика
function BasketPage() {
  // Отримання контексту додатка
  const context = useAppContext();
  // Стан для зберігання списку замовлень
  const [orders, setOrders] = React.useState<Array<IOrder>>([]);
  // Стан для зберігання списку продуктів у кошику
  const [products, setProducts] = React.useState<Array<ICartItem>>([]);

  // Використання useEffect для завантаження даних при монтуванні компоненту
  useEffect(() => {
    const fetchData = async () => {
      // Перевірка валідності токена
      if (isTokenValid(context)) {
        // Отримання збережених замовлень з сервера
        const savedOrders = await listOrder(context.token);
        setOrders(savedOrders);

        // Пошук чернетки замовлення серед збережених замовлень
        const draftOrder = savedOrders.find(
          order => order.status === OrderStatusEnum.DRAFT
        );

        if (draftOrder) {
          // Функція для комбінування продуктів з кількістю
          const setCombinedProducts = (products: IProduct[]) => {
            setProducts(
              products.map(product => {
                const count = draftOrder.products.find(
                  productInOrder => productInOrder.productUid === product.uid
                )?.count;

                return {
                  ...product,
                  count: count || 1,
                };
              })
            );
          };

          // Отримання списку продуктів для чернетки замовлення
          const savedProducts = await getProductsList(
            {
              orderId: draftOrder.uid,
            },
            context
          );
          setCombinedProducts(savedProducts);
        }
      } else {
        // Якщо токен не валідний, використовуємо локальні продукти з контексту
        setProducts(context.localProductsOrder);
      }
    };

    fetchData();
  }, []);

  // Функція для видалення продукту з кошика
  const deleteProductOnclick = async (uid: string) => {
    try {
      await deleteProductFromOrder(uid, context);
      setProducts(products.filter(product => product.uid !== uid));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Відображення верхнього колонтитулу */}
      <HeaderComponent />
      <div className="flex-grow p-5">
        {/* Відображення компоненту з товарами у кошику */}
        <CartItemComponent
          products={products}
          deleteProductOnclick={deleteProductOnclick}
        />
        {/* Відображення компоненту з підсумком кошика */}
        <CartSummeryComponent products={products} />
      </div>
      {/* Відображення нижнього колонтитулу */}
      <FooterComponent />
    </div>
  );
}

// Експортуємо компонент BasketPage як основний компонент сторінки кошика
export default BasketPage;
