import { CategoryProductRawDto } from '../../categoryProduct/interface/category-product-raw-dto' // Імпорт DTO для сирого виводу категорій продуктів.
import { CategoryDto } from '../interface/category-dto' // Імпорт DTO для категорій.

/**
 * Функція відображення категорій продуктів з сирого виводу на DTO категорій.
 * @param items Масив сирого виводу категорій продуктів.
 * @returns Масив DTO категорій.
 */
export const mapCategories = (items: Array<CategoryProductRawDto>): Array<CategoryDto> => {
  // Створення Map для зберігання категорій та пов'язаних ідентифікаторів продуктів
  const categoryProductMap = new Map<string, CategoryDto>()

  for (const item of items) {
    const mappedCategory = categoryProductMap.get(item.uid)
    if (mappedCategory) {
      // Якщо категорія вже існує, оновлюємо список ідентифікаторів продуктів
      categoryProductMap.set(item.uid, {
        uid: item.uid,
        title: item.title,
        productsIds: item.productUid
          ? [...mappedCategory.productsIds, item.productUid]
          : mappedCategory.productsIds,
      })
    } else {
      // Якщо категорія ще не існує, створюємо нову з ідентифікатором продукту, якщо він є
      categoryProductMap.set(item.uid, {
        uid: item.uid,
        title: item.title,
        productsIds: item.productUid ? [item.productUid] : [],
      })
    }
  }

  return Array.from(categoryProductMap.values()) // Повертаємо масив DTO категорій.
}
