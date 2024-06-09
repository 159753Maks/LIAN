import { BaseDtoEntity } from '../generic/base-dto-entity'

export const sortField = <T extends BaseDtoEntity>(
  array: Array<T>,
  sortField: keyof T = 'uid',
  asc: boolean = true,
): Array<T> => {
  const sortedArray = [...array] // Create a shallow copy of the array to avoid mutation
  sortedArray.sort((a, b) =>
    asc // If asc is true (ascending order)
      ? a[sortField] < b[sortField]
        ? -1
        : a[sortField] > b[sortField]
          ? 1
          : 0
      : // If asc is false (descending order)
        a[sortField] > b[sortField]
        ? -1
        : a[sortField] < b[sortField]
          ? 1
          : 0,
  )
  return sortedArray
}
