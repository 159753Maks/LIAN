import React from 'react';

import ProductAddComponent from './product.add.component'; // Імпортуємо компонент для додавання продукту

import ProductComponent from '@/components/main/product.component'; // Імпортуємо компонент продукту
import { IProduct } from '@/hooks/product/interface/product.interface';

// Інтерфейс для фільтрування категорій
export interface ICategoryFilter {
  categoryId?: string;
  asc: boolean;
}

// Інтерфейс для пропсів компоненту ProductGridComponent
interface ProductGridComponentProps {
  products: IProduct[]; // Список продуктів
  isEditMode: boolean;
}

// Компонент ProductGridComponent
const ProductGridComponent: React.FC<ProductGridComponentProps> = ({
  isEditMode = false, // Визначаємо чи активний режим редагування
  products, // Фільтр категорій
}) => {
  // Якщо дані завантажуються, відображаємо повідомлення про завантаження
  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  // Якщо активний режим редагування, відображаємо компонент для додавання продукту
  if (isEditMode) {
    return (
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
        <div className="p-6 justify-self-center">
          <ProductAddComponent /> {/* Компонент для додавання продукту */}
        </div>
        {products.map((product, index) => (
          <div key={product.uid} className="p-6 h-96 w-96 justify-self-center">
            <ProductComponent product={product} isEditMode={isEditMode} />
          </div>
        ))}
      </div>
    );
  }

  // Відображаємо список продуктів, якщо не активний режим редагування
  return (
    <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
      {products.map((product, index) => (
        <div key={product.uid} className="p-6 h-96 w-96 justify-self-center">
          <ProductComponent product={product} isEditMode={isEditMode} />
        </div>
      ))}
    </div>
  );
};

export default ProductGridComponent; // Експортуємо компонент ProductGridComponent
