import { ProductOutputDto } from '../interface/product-output-dto' // Імпорт DTO для вихідного продукту
import { ProductRawDto } from '../interface/product-raw-dto' // Імпорт DTO для сирих даних продукту

/**
 * Функція для мапінгу продуктів із сирих даних у вихідні дані
 * @param items - масив сирих даних продукту
 * @returns масив мапованих продуктів
 */
export const mapProducts = (items: Array<ProductRawDto>): Array<ProductOutputDto> => {
  // Створюємо мапу для зберігання категорій та відповідних UID продуктів
  const productMap = new Map<string, ProductOutputDto>()

  // Проходимося по кожному елементу в масиві сирих даних продукту
  for (const item of items) {
    const mappedProduct = productMap.get(item.uid) // Отримуємо продукт із мапи за його UID
    if (mappedProduct) {
      // Якщо продукт вже є в мапі, оновлюємо його
      productMap.set(item.uid, {
        uid: item.uid, // UID продукту
        title: item.title, // Назва продукту
        description: item.description, // Опис продукту
        subDescription: item.subDescription, // Підопис продукту
        cost: item.cost, // Вартість продукту
        count: item.count, // Кількість продукту
        categories:
          item.categoryUid &&
            item.categoryTitle &&
            !mappedProduct.categories?.find((category) => category.uid === item.categoryUid)
            ? [...mappedProduct.categories, { uid: item.categoryUid, title: item.categoryTitle }] // Додаємо нову категорію, якщо вона ще не додана
            : mappedProduct.categories,
        images:
          item.imageUid &&
            item.fileName &&
            item.url &&
            !mappedProduct.images?.find((image) => image.uid === item.imageUid)
            ? [
              ...mappedProduct.images,
              {
                uid: item.imageUid,
                url: item.url,
                fileName: item.fileName,
              },
            ] // Додаємо нове зображення, якщо воно ще не додане
            : mappedProduct.images,
      })
    } else {
      // Якщо продукту ще немає в мапі, додаємо його
      productMap.set(item.uid, {
        uid: item.uid, // UID продукту
        title: item.title, // Назва продукту
        description: item.description, // Опис продукту
        subDescription: item.subDescription, // Підопис продукту
        cost: item.cost, // Вартість продукту
        count: item.count, // Кількість продукту
        categories:
          item.categoryUid && item.categoryTitle
            ? [{ uid: item.categoryUid, title: item.categoryTitle }] // Додаємо категорію, якщо вона є
            : [],
        images:
          item.imageUid && item.fileName && item.url
            ? [
              {
                uid: item.imageUid,
                url: item.url,
                fileName: item.fileName,
              },
            ] // Додаємо зображення, якщо воно є
            : [],
      })
    }
  }

  return Array.from(productMap.values()) // Повертаємо масив продуктів із мапи
}
