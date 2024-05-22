import { CategoryProductRawDto } from '../../categoryProduct/interface/category-product-raw-dto'
import { CategoryDto } from '../interface/category-dto'

export const mapCategories = (items: Array<CategoryProductRawDto>): Array<CategoryDto> => {
  // Create a Map to store categories and related product UIDs
  const categoryProductMap = new Map<string, CategoryDto>()

  for (const item of items) {
    const mappedCategory = categoryProductMap.get(item.uid)
    if (mappedCategory) {
      categoryProductMap.set(item.uid, {
        uid: item.uid,
        title: item.title,
        productsIds: item.productUid
          ? [...mappedCategory.productsIds, item.productUid]
          : mappedCategory.productsIds,
      })
    } else {
      categoryProductMap.set(item.uid, {
        uid: item.uid,
        title: item.title,
        productsIds: item.productUid ? [item.productUid] : [],
      })
    }
  }

  return Array.from(categoryProductMap.values())
}
