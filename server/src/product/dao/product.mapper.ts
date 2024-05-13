import { CategoryProductRawDto } from 'src/categoryProduct/interface/category.product.raw.dto'
import { CategoryDto } from 'src/category/interface/category.dto'
import { ProductRawDto } from 'src/product/interface/product.raw.dto'
import { ProductOutputDto } from 'src/product/interface/product.output.dto'

export const mapProducts = (items: Array<ProductRawDto>): Array<ProductOutputDto> => {
  // Create a Map to store categories and related product UIDs
  const productMap = new Map<string, ProductOutputDto>()

  for (const item of items) {
    const mappedProduct = productMap.get(item.uid)
    if (mappedProduct) {
      productMap.set(item.uid, {
        uid: item.uid,
        title: item.title,
        description: item.description,
        subDescription: item.subDescription,
        cost: item.cost,
        count: item.count,
        categoryIds:
          item.categoryUid && !mappedProduct.categoryIds?.includes(item.categoryUid)
            ? [...mappedProduct.categoryIds, item.categoryUid]
            : mappedProduct.categoryIds,
        images:
          item.imageUid && item.fileName && item.url
            ? [
                ...mappedProduct.images,
                {
                  uid: item.imageUid,
                  url: item.url,
                  fileName: item.fileName,
                },
              ]
            : mappedProduct.images,
      })
    } else {
      productMap.set(item.uid, {
        uid: item.uid,
        title: item.title,
        description: item.description,
        subDescription: item.subDescription,
        cost: item.cost,
        count: item.count,
        categoryIds: item.categoryUid ? [item.categoryUid] : [],
        images:
          item.imageUid && item.fileName && item.url
            ? [
                {
                  uid: item.imageUid,
                  url: item.url,
                  fileName: item.fileName,
                },
              ]
            : [],
      })
    }
  }

  return Array.from(productMap.values())
}
