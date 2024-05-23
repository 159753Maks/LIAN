import { ProductOutputDto } from '../interface/product-output-dto'
import { ProductRawDto } from '../interface/product-raw-dto'

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
        categories:
          item.categoryUid &&
          item.categoryTitle &&
          !mappedProduct.categories?.find((category) => category.uid === item.categoryUid)
            ? [...mappedProduct.categories, { uid: item.categoryUid, title: item.categoryTitle }]
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
        categories:
          item.categoryUid && item.categoryTitle
            ? [{ uid: item.categoryUid, title: item.categoryTitle }]
            : [],
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
