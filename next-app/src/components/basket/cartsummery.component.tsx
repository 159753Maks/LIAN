import { ICartItem } from '@/pages/basket';

// Компонент для відображення підсумку кошика
export default function CartSummeryComponent({
  products,
}: {
  products: ICartItem[];
}) {
  // Обчислення загальної суми замовлення
  const totalSum = products.reduce((total, product) => {
    return total + product.cost * product.count;
  }, 0);

  return (
    <div className="flex flex-col justify-evenly">
      {/* Заголовок секції підсумку */}
      <h2>Підсумок</h2>

      {/* Відображення кількості товарів у кошику */}
      <p>Всього товарів: {products.length}</p>

      {/* Відображення загальної суми замовлення */}
      <p>Сума замовлення: {totalSum}</p>

      {/* Посилання для переходу до оформлення замовлення */}
      <a
        href="#"
        className="bg-blue-500 text-white w-56 py-2 px-4 border-none cursor-pointer"
      >
        Перейти до оформлення
      </a>
    </div>
  );
}
