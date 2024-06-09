import React, { useEffect, useState } from 'react';

import NavigationCategoryButtonComponent from '@/components/main/navigationCategoryButton.component'; // Імпортуємо компонент NavigationCategoryButtonComponent
import ProductGridComponent, {
  ICategoryFilter,
} from '@/components/main/product.greed.component'; // Імпортуємо компонент ProductGridComponent та інтерфейс ICategoryFilter
import { getCategoryList } from '@/hooks/category/getCategoryList'; // Імпортуємо функцію getCategoryList для отримання списку категорій
import { ICategory } from '@/hooks/category/interface/category.interface';
import { getProductsList } from '@/hooks/product/getProductsList';
import { IProduct } from '@/hooks/product/interface/product.interface'; // Імпортуємо інтерфейс ICategory
import { AppWrapperContextType, useAppContext } from '@/pages/_appWrapper';

const fetchCategories = async (
  setCategories: (categories: Array<ICategory>) => void
) => {
  try {
    const data = await getCategoryList(); // Отримуємо дані категорій
    setCategories([{ uid: 'null', title: 'All' }, ...data]); // Додаємо категорію "All" до списку
  } catch (error) {
    console.error('Error fetching categories:', error); // Виводимо помилку в консоль, якщо не вдається отримати категорії
  }
};

// Функція для отримання продуктів з API
const fetchProducts = async (
  categoryFilter: ICategoryFilter, // Фільтр категорій
  offset: number, // Відступ для пагінації
  context: AppWrapperContextType, // Контекст додатку
  setProducts: (products: Array<IProduct>) => void // Функція для встановлення списку продуктів
): Promise<void> => {
  try {
    const data = await getProductsList(
      {
        limit: 15, // Ліміт продуктів на одну сторінку
        offset, // Відступ для пагінації
        categoryIds:
          categoryFilter.categoryId && categoryFilter.categoryId !== 'null'
            ? [categoryFilter.categoryId]
            : undefined, // Визначаємо категорію для фільтрування
        asc: categoryFilter.asc, // Визначаємо напрямок сортування
      },
      context
    );

    setProducts(data); // Встановлюємо список продуктів
  } catch (error) {
    console.error('Error fetching products:', error); // Виводимо помилку в консоль, якщо не вдається отримати продукти
  }
};

// Визначаємо типи пропсів для компоненту NavigationComponent
const NavigationComponent: React.FC<{
  isEditMode: boolean; // Визначаємо, чи активний режим редагування
}> = ({ isEditMode = false }) => {
  const context = useAppContext(); // Отримуємо контекст додатку
  const [products, setProducts] = useState<Array<IProduct>>([]); // Стан для списку продуктів
  const [categories, setCategories] = useState<Array<ICategory>>([
    { uid: 'null', title: 'All' },
  ]); // Встановлюємо стан для списку категорій
  const [categoryFilter, setCategoryFilter] = useState<ICategoryFilter>({
    categoryId: undefined, // Початкове значення categoryId - невизначене
    asc: true, // Початкове значення сортування - за зростанням
  });
  const [isDisableLoadMoreProducts, setIsDisableLoadMoreProducts] =
    useState(false);

  // Функція для встановлення нової категорії та зміни напрямку сортування
  const setNewCategory = (id?: string) => {
    if (id === categoryFilter.categoryId) {
      setCategoryFilter({ categoryId: id, asc: !categoryFilter.asc }); // Якщо вибрана та сама категорія, змінюємо напрямок сортування
    } else {
      setCategoryFilter({ categoryId: id, asc: true }); // Якщо вибрана нова категорія, встановлюємо сортування за зростанням
    }
  };

  const setAdditionalProducts = (newProducts: Array<IProduct>) => {
    setProducts([...products, ...newProducts]);
    if (newProducts.length === 0) {
      setIsDisableLoadMoreProducts(true);
    } else {
      setIsDisableLoadMoreProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts(categoryFilter, 0, context, setProducts);
    // Функція для отримання списку категорій з API

    fetchCategories(setCategories); // Викликаємо функцію для отримання категорій при монтуванні компоненту
  }, []); // Виконуємо цей ефект лише один раз при монтуванні компоненту

  useEffect(() => {
    fetchProducts(categoryFilter, 0, context, setProducts);
  }, [categoryFilter]); // Виконуємо цей ефект при зміні категорії

  const loadMoreProducts = () => {
    fetchProducts(
      categoryFilter,
      products.length,
      context,
      setAdditionalProducts
    ); // Increment the page number
  };

  return (
    <div className="text-center mt-20 pt-10">
      {' '}
      {/* Контейнер для навігаційного компоненту */}
      <div className="flex justify-center items-center space-x-2">
        {' '}
        {/* Навігаційна панель */}
        {categories.map((category, index) => (
          <NavigationCategoryButtonComponent
            key={category.uid} // Унікальний ключ для кожної категорії
            category={category} // Проп category для компоненту NavigationCategoryButtonComponent
            isLast={index === categories.length - 1} // Визначаємо, чи є категорія останньою в списку
            onClick={setNewCategory} // Обробник кліку для зміни категорії
          />
        ))}
      </div>
      <ProductGridComponent
        products={products} // Проп products для компоненту ProductGridComponent
        isEditMode={isEditMode} // Проп isEditMode для компоненту ProductGridComponent
      />
      <button
        className={`mt-10  text-white font-bold py-2 px-4 rounded ${!isDisableLoadMoreProducts ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'}`}
        onClick={loadMoreProducts}
        disabled={isDisableLoadMoreProducts}
      >
        Завантажити більше
      </button>
    </div>
  );
};

export default NavigationComponent; // Експортуємо компонент NavigationComponent
