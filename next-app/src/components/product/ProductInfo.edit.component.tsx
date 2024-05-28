import { useEffect, useState } from 'react'; // Імпорт useState та useEffect з React

import { getCategoryList } from '@/hooks/category/getCategoryList'; // Імпорт функції для отримання списку категорій
import { ICategory } from '@/hooks/category/interface/category.interface'; // Імпорт інтерфейсу категорії
import { IProduct } from '@/hooks/product/interface/product.interface'; // Імпорт інтерфейсу продукту

// Компонент редагування інформації про продукт
export default function ProductInfoEditComponent({
  product, // Об'єкт продукту
  saveProductChanges, // Функція для збереження змін у даних про продукт
}: {
  product: IProduct; // Об'єкт продукту
  saveProductChanges: (product: IProduct) => void; // Функція для збереження змін у даних про продукт
}) {
  const [categories, setCategories] = useState<Array<ICategory>>([
    {
      // Стан для збереження списку категорій
      uid: '', // Унікальний ідентифікатор категорії
      title: '', // Назва категорії
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState<ICategory>( // Стан для збереження поточної категорії
    categories[0] // Встановлення початкової поточної категорії
  );

  // Ефект для отримання списку категорій
  useEffect(() => {
    const fetchCategories = async () => {
      // Асинхронна функція для отримання списку категорій
      try {
        const data = await getCategoryList(); // Отримання списку категорій
        setCategories(data); // Оновлення стану зі списком категорій
        setCurrentCategory(data[0]); // Встановлення першої категорії як поточної
      } catch (error) {
        console.error('Error fetching categories:', error); // Обробка помилки при отриманні категорій
      }
    };

    fetchCategories(); // Виклик функції отримання списку категорій
  }, []); // Ефект запускається лише при першому рендері компонента

  // Ефект для збереження змін у даних про продукт
  useEffect(() => {
    saveProductChanges({
      // Виклик функції для збереження змін у даних про продукт
      ...product, // Збереження усіх попередніх даних про продукт
      categories: [currentCategory], // Оновлення категорії продукту
    });
  }, [currentCategory]); // Ефект запускається при зміні поточної категорії

  return (
    // Контейнер для редагування інформації про продукт
    <div className="flex flex-col justify-evenly mx-5 min-h-screen">
      {/* Поле для вибору категорії */}
      <div className="product_category">
        <label className="font-roboto text-base leading-10 text-gray-600">
          Категорія
        </label>

        {/* Випадаючий список для вибору категорії */}
        <select
          className="h-5 w-full bg-gray-400"
          defaultValue={currentCategory.uid} // Початкове значення - UID поточної категорії
          onChange={e =>
            saveProductChanges({
              // Збереження змін у даних про продукт при зміні категорії
              ...product, // Збереження усіх попередніх даних про продукт
              categories: [{ uid: e.target.value, title: e.target.title }], // Оновлення категорії продукту
            })
          }
        >
          {/* Відображення варіантів вибору категорій у випадаючому списку */}
          {categories.map(category => (
            <option
              key={category.uid} // Унікальний ключ варіанту вибору
              value={category.uid} // Значення варіанту вибору (UID категорії)
              title={category.title} // Назва варіанту вибору (назва категорії)
            >
              {category.title} // Відображення назви категорії
            </option>
          ))}
        </select>
      </div>
      {/* Поле для введення назви товару */}
      <div className="product_name">
        <label className="font-roboto text-base leading-10 text-gray-600">
          Назва товару
        </label>
        <input
          className="h-5 w-full bg-gray-400"
          defaultValue={product.title} // Початкове значення - назва товару
          placeholder="Назва товару" // Плейсхолдер поля введення назви товару
          onChange={
            e => saveProductChanges({ ...product, title: e.target.value }) // Збереження змін у назві товару
          }
        />
      </div>
      {/* Поле для введення короткої характеристики товару */}
      <div className="product_description flex flex-col justify-between min-h-96">
        <label className="font-roboto text-base leading-10 text-gray-600">
          Короткі характеристики
        </label>
        <textarea
          className="h-36 bg-gray-400"
          defaultValue={product.subDescription} // Початкове значення - коротка характеристистика товару
          onChange={
            e =>
              saveProductChanges({ ...product, subDescription: e.target.value }) // Збереження змін у короткій характеристиці товару
          }
        />
        {/* Поле для введення опису товару та його характеристик */}
        <label className="font-roboto text-base leading-10 text-gray-600">
          Опис товару та характеристики
        </label>
        <textarea
          className="h-36 bg-gray-400"
          defaultValue={product.description} // Початкове значення - опис товару
          onChange={
            e => saveProductChanges({ ...product, description: e.target.value }) // Збереження змін у описі товару та його характеристиках
          }
        />
      </div>
      {/* Поле для введення ціни товару */}
      <div className="product_price flex flex-row  itmems-center">
        <label className="font-roboto leading-5 text-black">Ціна :</label>
        <input
          className="h-6 w-96 bg-gray-400 ml-5"
          type="text"
          defaultValue={product.cost} // Початкове значення - ціна товару
          onChange={
            e => saveProductChanges({ ...product, cost: +e.target.value }) // Збереження змін у ціні товару
          }
        />
      </div>
    </div> // Закриття контейнера для редагування інформації про продукт
  );
}
