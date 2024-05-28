import { useState } from 'react';

import ProductPhotoImgUploadModal from '@/components/product/ProductPhoto.img.upload.modal.component'; // Імпорт компоненту модального вікна для завантаження зображень товару
import { IProduct } from '@/hooks/product/interface/product.interface'; // Імпорт інтерфейсів продукту та зображення продукту
import { uploadImg } from '@/hooks/product/uploadImg';
import { useAppContext } from '@/pages/_appWrapper'; // Імпорт функції для завантаження зображення товару

export default function ProductPhotos({
  product,
  isEditMode,
  onButtonClick,
  saveProductChanges,
}: {
  product: IProduct; // Об'єкт продукту
  isEditMode: boolean; // Прапорець, що вказує на режим редагування
  onButtonClick: () => void; // Функція, що викликається при натисканні на кнопку
  saveProductChanges: (product: IProduct) => void; // Функція для збереження змін у продукті
}) {
  const context = useAppContext(); // Отримуємо контекст додатку
  const [currentProduct, setCurrentProduct] = useState<IProduct>(product); // Стан для поточного продукту

  const [selectedImage, setSelectedImage] = useState(
    // Стан для вибраного зображення
    currentProduct.images.length > 0 // Якщо у продукту є зображення
      ? currentProduct.images[0] // Вибрати перше зображення зі списку
      : { url: '/no-image.png', filename: '404' } // Інакше встановити стандартне зображення
  );
  const [origin, setOrigin] = useState({ x: 0, y: 0 }); // Стан для початкової точки курсору
  const [currentIndex, setCurrentIndex] = useState(0); // Стан для поточного індексу зображення у списку
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан, що вказує на відкриття чи закриття модального вікна

  // Функція, яка викликається при руху миші по зображенню
  const handleMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect(); // Отримання координат області зображення
    const x = ((e.clientX - rect.left) / e.target.offsetWidth) * 100; // Розрахунок відносної координати X
    const y = ((e.clientY - rect.top) / e.target.offsetHeight) * 100; // Розрахунок відносної координати Y
    setOrigin({ x, y }); // Встановлення нової початкової точки курсору
  };

  const maxLength = 4; // Максимальна кількість зображень, які можна відобразити
  const sliderLength =
    currentProduct.images.length >= maxLength
      ? maxLength
      : currentProduct.images.length; // Визначення довжини слайдера
  // Обробник натискання на кнопку "Назад"
  const handlePrevClick = () => {
    setCurrentIndex(
      oldIndex =>
        oldIndex > 0 ? oldIndex - 1 : currentProduct.images.length - 1 // Зміна поточного індексу назад на один елемент
    );
  };

  // Функція для видалення зображення
  const deleteImg = (uid: string) => {
    currentProduct.images = currentProduct.images.filter(
      img => img.uid !== uid
    );
    setCurrentProduct(currentProduct);
    saveProductChanges(currentProduct);
  };

  // Обробник натискання на кнопку "Вперед"
  const handleNextClick = () => {
    setCurrentIndex(
      oldIndex =>
        oldIndex < currentProduct.images.length - 1 ? oldIndex + 1 : 0 // Зміна поточного індексу вперед на один елемент
    );
  };

  const setModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  // Функція для завантаження зображення
  const uploadImage = async (e: any) => {
    const file = e.target.files[0]; // Отримання вибраного файлу
    const reader = new FileReader(); // Створення об'єкту FileReader для читання файлів
    reader.readAsDataURL(file); // Читання файлу у форматі Data URL
    reader.onload = async () => {
      const imgData = reader.result?.toString().split(',')[1]; // Отримання даних зображення у форматі base64
      try {
        if (!imgData) {
          // Перевірка наявності даних зображення
          throw new Error('Failed to upload image'); // Викид помилки при відсутності даних
        }
        // Виклик функції для завантаження зображення
        const result = await uploadImg(file.name, file.type, imgData, context);
        // Оновлення стану продукту з доданим зображенням
        setCurrentProduct({
          ...currentProduct,
          images: [...currentProduct.images, result],
        });
        saveProductChanges({
          ...currentProduct,
          images: [...currentProduct.images, result],
        });
        setIsModalOpen(false); // Закриття модального вікна після завантаження зображення
      } catch (error) {
        console.error('Error uploading image:', error); // Виведення помилки у випадку її виникнення
      }
    };
  };

  return (
    <div className="pt-20 flex flex-col justify-between items-center min-h-screen max-w-screen mx-auto">
      {isModalOpen && (
        <ProductPhotoImgUploadModal
          setIsModalOpen={setModal}
          uploadImage={uploadImage}
        />
      )}
      <div className="w-3/5 h-3/5 overflow-hidden border-2 border-gray-300">
        <img
          src={selectedImage.url} // Встановлення URL вибраного зображення
          alt={selectedImage.filename} // Встановлення атрибуту alt зображення
          className="w-full h-full duration-50 transform hover:scale-150" // Класи стилізації зображення
          style={{ transformOrigin: `${origin.x}% ${origin.y}%` }} // Встановлення початкової точки масштабування
          onMouseMove={handleMouseMove} // Обробник події руху миші по зображенню
        />
      </div>
      <div className="flex justify-between overflow-x-auto border border-gray-300 w-1/2 items-stretch">
        <button
          className={`arrow_left self-stretch text-xl font-bold flex items-center justify-center ${currentIndex === 0 || sliderLength < maxLength ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200'}`}
          onClick={handlePrevClick} // Обробник натискання на кнопку "Назад"
          disabled={sliderLength < maxLength || currentIndex === 0} // Встановлення властивості disabled
        >
          &lt; {/* Символ "ліва стрілка" */}
        </button>

        <div className="flex overflow-x-auto">
          {/* Відображення мініатюр зображень */}
          {Array.from({ length: sliderLength }).map((_, i) => {
            const imageIndex =
              (currentIndex + i) % currentProduct.images.length;
            const img = currentProduct.images[imageIndex];
            return (
              <div
                key={imageIndex}
                className="relative h-20 w-20 mx-2 overflow-hidden"
              >
                {/* Відображення зображення */}
                <img
                  src={img.url} // URL зображення
                  alt={img.filename} // Атрибут alt
                  className="w-full h-full object-cover cursor-pointer" // Стилізація зображення
                  onClick={() => setSelectedImage(img)} // Обробник події натискання на зображення
                />
                {/* Видалення зображення у режимі редагування */}
                {isEditMode && (
                  <i
                    className="fa-solid fa-trash absolute bottom-0 right-0 text-red-500 hover:text-red-700"
                    onClick={() => deleteImg(img.uid)}
                  />
                )}
              </div>
            );
          })}
          {/* Додавання нового зображення у режимі редагування */}
          {isEditMode && (
            <div className="h-20 w-20 overflow-hidden flex items-center justify-center bg-gray-200 cursor-pointer">
              <button onClick={() => setIsModalOpen(true)}>+</button>
            </div>
          )}
        </div>

        {/* Кнопка для перемикання наступного зображення */}
        <button
          className={`self-stretch bg-gray-200 text-xl font-bold flex items-center justify-center  ${
            sliderLength < maxLength ||
            currentIndex + maxLength - 1 >= currentProduct.images.length
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-200'
          }`}
          onClick={handleNextClick} // Обробник натискання на кнопку "Вперед"
          disabled={
            sliderLength < maxLength ||
            currentIndex + maxLength - 1 >= currentProduct.images.length
          } // Встановлення властивості disabled
        >
          &gt; {/* Символ "права стрілка" */}
        </button>
      </div>
      {/* Відображення ціни продукту та кнопки для покупки або збереження змін */}
      <div className="flex flex-row">
        {!isEditMode && (
          <div className="flex flex-row justify-between ">
            {/* Відображення ціни */}
            <p className="font-roboto text-5xl text-black">
              <strong>Ціна :</strong> {currentProduct.cost}
            </p>
          </div>
        )}
        {/* Кнопка для покупки або збереження змін */}
        <button
          className="ml-10 rounded-full w-48 h-12 bg-green-500 text-white font-roboto text-xl leading-12"
          onClick={() => onButtonClick()} // Обробник натискання на кнопку
        >
          {!isEditMode ? 'Купити' : 'Зберегти зміни'} {/* Текст кнопки */}
        </button>
      </div>
    </div>
  );
}
