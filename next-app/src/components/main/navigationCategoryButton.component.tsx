import React from 'react';

import { ICategory } from '@/hooks/category/interface/category.interface';

// Визначаємо інтерфейс для пропсів компонента CategoryButtonProps
interface CategoryButtonProps {
  category: ICategory; // Категорія, яку відображає кнопка
  isLast: boolean; // Вказує, чи є кнопка останньою в списку
  onClick: (id?: string) => void; // Обробник кліку, приймає ідентифікатор категорії як аргумент
}

// Компонент NavigationCategoryButton
const NavigationCategoryButton: React.FC<CategoryButtonProps> = ({
  category, // Проп category для компоненту
  isLast, // Проп isLast для компоненту
  onClick, // Проп onClick для компоненту
}) => {
  return (
    <React.Fragment>
      <button
        className="text-gray-700 hover:underline" // Клас для стилізації кнопки
        onClick={() => onClick(category.uid)} // Викликаємо onClick з ідентифікатором категорії
      >
        {category.title} {/* Відображаємо назву категорії */}
      </button>
      {!isLast && <span> / </span>}{' '}
      {/* Відображаємо розділювач, якщо кнопка не є останньою */}
    </React.Fragment>
  );
};

export default NavigationCategoryButton; // Експортуємо компонент NavigationCategoryButton
