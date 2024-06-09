import Link from 'next/link'; // Імпортуємо компонент Link з бібліотеки Next.js для навігації між сторінками
import { useRouter } from 'next/router';
import React from 'react'; // Імпортуємо React

import { addProductToOrder } from '@/hooks/order/addProductToOrder'; // Імпортуємо функцію для додавання продукту до замовлення
import { deleteProductById } from '@/hooks/product/deleteProductById'; // Імпортуємо функцію для видалення продукту за ID
import { IProduct } from '@/hooks/product/interface/product.interface';
import { useAppContext } from '@/pages/_appWrapper'; // Імпортуємо інтерфейс продукту

// Оголошуємо інтерфейс для пропсів компонента ProductComponent
export interface ProductComponentProps {
  product: IProduct; // Продукт, який буде відображатися
  isEditMode?: boolean; // Чи знаходиться компонент у режимі редагування
}

// Основний компонент ProductComponent
const ProductComponent: React.FC<ProductComponentProps> = ({
  product,
  isEditMode = false,
}) => {
  const context = useAppContext(); // Отримуємо контекст додатку
  const router = useRouter(); // Отримуємо об'єкт router для перенаправлення на головну сторінку

  // Функція для обробки натискання на кнопку додавання продукту до замовлення
  const addProductOnClick = async (productToSave: IProduct) => {
    try {
      await addProductToOrder(productToSave, context); // Додаємо продукт до замовлення
    } catch (error) {
      console.error('Error fetching product:', error); // Виводимо помилку в консоль
      throw error; // Повторно кидаємо помилку для обробки в компоненті
    }
  };

  // Функція для обробки натискання на кнопку видалення продукту
  const deleteProductOnClick = async (uid: string) => {
    try {
      await deleteProductById(uid, context); // Видаляємо продукт за його ID
      router.reload(); // Перенаправляємо користувача на головну сторінку
    } catch (error) {
      console.error('Error fetching product:', error); // Виводимо помилку в консоль
      throw error; // Повторно кидаємо помилку для обробки в компоненті
    }
  };

  return (
    <div className="flex h-full w-full relative">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col justify-between min-h-96 relative">
        {isEditMode && (
          // Іконка видалення продукту, відображається лише в режимі редагування
          <i
            className="fa-solid fa-trash absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={() => deleteProductOnClick(product.uid)}
          />
        )}

        <div className="flex justify-center items-center bg-white w-full h-48">
          <div className="w-1/2 h-48">
            {/*Обгортка посилання на сторінку продукту з його ID*/}
            <Link href={`/product?productId=${product.uid}`}>
              {/* Відображення зображення продукту */}
              <img
                className="object-cover w-full h-full"
                src={product.images[0]?.url || '/no-image.png'}
                alt={product.title}
              />
            </Link>
          </div>
        </div>
        {/*Обгортка посилання на сторінку продукту з його ID*/}
        <Link href={`/product?productId=${product.uid}`}>
          <div className="pt-2 w-full flex-grow">
            <h6 className="mt-2 text-lg font-semibold text-black-400">
              <a href="#" className="hover:text-red-500">
                {product.title} {/* Відображення назви продукту */}
              </a>
            </h6>
            <p className="mt-2 pl-2 pr-2 text-xs text-gray-500">
              {product.subDescription}{' '}
              {/* Відображення короткого опису продукту */}
            </p>
          </div>
        </Link>
        <div className="pr-6 pl-6 pb-6 w-full flex justify-between items-end">
          {/*Обгортка посилання на сторінку продукту з його ID*/}
          <Link href={`/product?productId=${product.uid}`}>
            <div className="text-xl font-bold text-red-500">
              {product.cost} ₴ {/* Відображення ціни продукту */}
            </div>
          </Link>
          <div className="flex space-x-2">
            {/* Кнопка для додавання продукту до кошика */}
            <button
              className="text-blue-300 hover:text-red-500"
              onClick={() => addProductOnClick(product)}
            >
              <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent; // Експортуємо компонент ProductComponent за замовчуванням
