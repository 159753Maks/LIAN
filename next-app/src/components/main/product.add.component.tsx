import Link from 'next/link'; // Імпортуємо компонент Link з бібліотеки Next.js для навігації між сторінками
import React from 'react'; // Імпортуємо React

export default function ProductAddComponent() {
  // Основний компонент ProductAddComponent
  return (
    // Обгортка посилання на сторінку створення нового продукту
    // Коли користувач натискає на цей контейнер, він буде перенаправлений на '/product?productId=new'
    <Link href={'/product?productId=new'}>
      <div className="flex h-full w-full">
        {/* Контейнер для кнопки додавання продукту */}
        {/* Додає стилі для фону, закруглених кутів, тіні, вирівнювання і розміру */}
        <div className="bg-gray-400 rounded-lg shadow-2xl overflow-hidden flex items-center justify-center min-h-96 min-w-96">
          {/* Внутрішнє посилання для стилізації іконки */}

          {/* Іконка додавання */}
          {/* Використовує FontAwesome для відображення знака плюс */}
          {/* Класи додають білий колір тексту, і інлайн-стиль задає дуже великий розмір шрифту */}
          <i
            className="fa-solid fa-plus text-white" // Клас для стилізації іконки
            style={{ fontSize: '900%' }} // Інлайн стиль для розміру іконки
          ></i>
        </div>
      </div>
    </Link>
  );
}
