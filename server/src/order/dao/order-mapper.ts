// Імпорт необхідних інтерфейсів
import { OrderProductRawInterface } from '../interface/order-raw-iterface'
import { OrderInterface } from '../interface/order-interface'

// Функція для відображення продуктів замовлення на замовлення
export const mapOrderProductsToOrders = (
  items: Array<OrderProductRawInterface>,  // Масив продуктів замовлення
): Array<OrderInterface> => {
  const orderMap = new Map<string, OrderInterface>()  // Створення мапи для зберігання замовлень

  items.forEach((item) => {
    // Отримання відображеного замовлення з мапи або створення нового, якщо його ще немає
    const mappedOrder = orderMap.get(item.uid) || {
      uid: item.uid,
      userUid: item.userUid,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      products: [],
    }

    // Додавання продукту до списку продуктів замовлення, якщо він ще не доданий
    if (
      item.productUid &&
      !mappedOrder.products.some((product) => product.productUid === item.productUid)
    ) {
      mappedOrder.products.push({ productUid: item.productUid, count: item.count })
    }

    // Збереження відображеного замовлення у мапі
    orderMap.set(item.uid, mappedOrder)
  })

  // Повернення масиву замовлень
  return Array.from(orderMap.values())
}
