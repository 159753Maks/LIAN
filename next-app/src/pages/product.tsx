import { useRouter } from 'next/router'; // Імпортуємо useRouter для доступу до об'єкта маршрутизатора
import { useEffect, useState } from 'react'; // Імпортуємо useEffect та useState з React для роботи з ефектами та станами компонентів

import FooterComponent from '@/components/generic/footer.component'; // Імпортуємо компонент FooterComponent для відображення підвалу
import HeaderComponent from '@/components/generic/header.component'; // Імпортуємо компонент HeaderComponent для відображення заголовка
import ProductInfo from '@/components/product/ProductInfo.component'; // Імпортуємо компонент ProductInfo для відображення інформації про продукт
import ProductPhotos from '@/components/product/ProductPhotos.component'; // Імпортуємо компонент ProductPhotos для відображення фотографій продукту
import { addProductToOrder } from '@/hooks/order/addProductToOrder'; // Імпортуємо функцію addProductToOrder для додавання продукту до замовлення
import { createProduct } from '@/hooks/product/createProduct';
import { getProductById } from '@/hooks/product/getProductById'; // Імпортуємо функцію getProductById для отримання продукту за ID
import { IProduct } from '@/hooks/product/interface/product.interface'; // Імпортуємо інтерфейс продукту
import { updateProductById } from '@/hooks/product/updateProductById'; // Імпортуємо функцію updateProductById для оновлення продукту за ID
import { useAppContext } from '@/pages/_appWrapper'; // Імпортуємо функцію createProduct для створення нового продукту

// Функція компонента ProductPage, яка відповідає за відображення сторінки продукту
function ProductPage() {
  const router = useRouter(); // Отримуємо об'єкт маршрутизатора
  const context = useAppContext(); // Отримуємо контекст додатку
  const { productId } = router.query; // Отримуємо ID продукту з маршрутизатора
  const [product, setProduct] = useState<IProduct>({
    // Стан для зберігання даних про продукт
    uid: '',
    title: '',
    description: '',
    cost: 0,
    subDescription: '',
    categories: [],
    images: [],
  });
  const [loading, setLoading] = useState(true); // Стан для відображення стану завантаження
  const [error, setError] = useState(null); // Стан для відображення помилок

  const fetchProduct = async (productId: string) => {
    // Функція для отримання даних про продукт за його ID
    try {
      const productData = await getProductById(productId, context); // Отримуємо дані про продукт
      setProduct(productData); // Зберігаємо отримані дані про продукт у стан
      setLoading(false); // Змінюємо стан завантаження на false
    } catch (error) {
      // @ts-ignore
      setError(error.message); // Зберігаємо помилку у стані
      setLoading(false); // Змінюємо стан завантаження на false
    }
  };

  useEffect(() => {
    router.reload(); // Перезавантажуємо сторінку
  }, [context.isEditMode]);

  // Ефект для завантаження даних про продукт при зміні ID продукту у маршруті
  useEffect(() => {
    if (productId && typeof productId === 'string' && productId !== 'new') {
      fetchProduct(productId); // Викликаємо функцію отримання даних про продукт
    }

    if (productId === 'new') {
      // Якщо ID продукту дорівнює 'new' (створення нового продукту)
      if (context.setState) {
        // Для впевненності встановлюємо стан контексту
        context.setState({ ...context, isEditMode: true });
      }
      setLoading(false); // Змінюємо стан завантаження на false
    }
  }, [productId]);

  // Функція для відправлення запиту на сервер
  const sendRequest = async () => {
    if (context.isEditMode) {
      // Якщо компонент у режимі редагування
      if (product.uid === '') {
        // Якщо ID продукту не вказано (створення нового продукту)
        await createProduct(product, context); // Створюємо новий продукт
        router.push('/'); // Переходимо на головну сторінку
      } else {
        await updateProductById(product, context); // Оновлюємо існуючий продукт
      }
    } else {
      await addProductToOrder(product, context); // Додаємо продукт до замовлення
    }
  };

  // Відображення повідомлення про завантаження, якщо дані ще не завантажені
  if (loading) {
    return <div>Loading...</div>;
  }

  // Відображення повідомлення про помилку, якщо виникла помилка при завантаженні даних про продукт
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Функція для збереження змін у даних про продукт
  const saveProductChanges = (product: IProduct) => {
    setProduct(product);
  };

  return (
    // Верхній контейнер, який займає всю висоту сторінки
    <div className="flex flex-col min-h-screen w-full">
      {/* Верхній контейнер для заголовка */}
      <div className="flex flex-col h-2/12">
        {/* Відображення заголовка з можливістю редагування */}
        <HeaderComponent />
      </div>

      {/* Контейнер для відображення інформації та фотографій продукту */}
      <div className="mt-10 mb-10 grid grid-cols-2 gap-2 h-1/2">
        <div>
          {/* Компонент для відображення інформації про продукт */}
          <ProductInfo
            product={product}
            isEditMode={context.isEditMode}
            saveProductChanges={saveProductChanges}
          />
        </div>
        <div>
          {/* Компонент для відображення фотографій продукту */}
          <ProductPhotos
            product={product}
            isEditMode={context.isEditMode}
            onButtonClick={sendRequest}
            saveProductChanges={saveProductChanges}
          />
        </div>
      </div>

      {/* Нижній контейнер для відображення підвалу */}
      <div className="flex h-1/12 w-full">
        {/* Відображення підвалу */}
        <FooterComponent />
      </div>
    </div>
  );
}

export default ProductPage;
