import ProductInfoEditComponent from '@/components/product/ProductInfo.edit.component'; // Імпортуємо компонент редагування інформації про продукт
import ProductInfoViewComponent from '@/components/product/ProductInfo.view.component'; // Імпортуємо компонент перегляду інформації про продукт
import { IProduct } from '@/hooks/product/interface/product.interface'; // Імпортуємо інтерфейс продукту

// Компонент, який відображає інформацію про продукт
export default function ProductInfo({
  product, // Об'єкт продукту
  isEditMode, // Флаг, що вказує, чи знаходиться компонент у режимі редагування
  saveProductChanges, // Функція для збереження змін у даних про продукт
}: {
  product: IProduct; // Об'єкт продукту
  isEditMode: boolean; // Флаг, що вказує, чи знаходиться компонент у режимі редагування
  saveProductChanges: (product: IProduct) => void; // Функція для збереження змін у даних про продукт
}) {
  return (
    // Контейнер, який містить інформацію про продукт
    <div className="mt-20">
      {/* Умовний оператор для вибору компонента в залежності від режиму редагування */}
      {isEditMode ? (
        // Відображення компонента редагування інформації про продукт, якщо компонент перебуває у режимі редагування
        <ProductInfoEditComponent
          product={product} // Передача об'єкта продукту у компонент редагування
          saveProductChanges={saveProductChanges} // Передача функції для збереження змін у даних про продукт у компонент редагування
        />
      ) : (
        // Відображення компонента перегляду інформації про продукт, якщо компонент не перебуває у режимі редагування
        <ProductInfoViewComponent product={product} /> // Передача об'єкта продукту у компонент перегляду
      )}
    </div>
  );
}
