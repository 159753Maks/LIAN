// Оголошення функції FooterComponent, яка відповідає за відображення підвалу на сторінці
export default function FooterComponent() {
  return (
    // Контейнер підвалу з фоном, тінню, вирівнюванням по центру та певною висотою
    <footer className="flex items-center justify-center w-full h-40 bg-white shadow-md mt-10">
      {/* Основний контейнер з логотипом і текстом */}
      <div className="w-4/5 h-full flex flex-col items-center justify-around">
        {/* Контейнер для відображення логотипу */}
        <div className="footer_logo">
          {/* Зображення логотипу з вказаними розмірами та атрибутом alt */}
          <img
            width="131"
            height="35"
            src="http://localhost:4566/product/lian_logo"
            alt="logo"
          />
        </div>

        {/* Контейнер для відображення тексту у підвалі */}
        <div className="footer_text">
          {/* Текстовий блок з вказаним класом та стилем */}
          <p className="text-sm text-gray-600">
            {/* Текст копірайту з вказаним роком, назвою теми та автором */}©
            2016 <span className="font-bold">MULITIX THEME</span> BY
            THEMEFORCES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
