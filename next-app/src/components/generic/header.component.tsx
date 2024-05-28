import Link from 'next/link'; // Імпортуємо компонент Link з Next.js для навігації між сторінками
import React from 'react'; // Імпортуємо React і хуки useEffect та useState
import Switch from 'react-switch'; // Імпортуємо компонент Switch з бібліотеки react-switch

import { isTokenValid } from '@/hooks/util/token.util';
import { useAppContext } from '@/pages/_appWrapper';
import { useRouter } from 'next/router'; // Імпортуємо функцію isTokenValid для перевірки дійсності токену

// Головний компонент HeaderComponent
export default function HeaderComponent() {
  const context = useAppContext(); // Отримуємо контекст додатку
  const router = useRouter(); // Отримуємо об'єкт router для навігації між сторінками

  const isValid = isTokenValid(context); // Встановлюємо початкове значення для змінної isValid

  // Обробник зміни стану перемикача
  const handleSwitchChange = (nextChecked: boolean) => {
    if (context.setState) {
      context.setState({ ...context, isEditMode: nextChecked });
    }
  };

  // Обробник виходу користувача з системи
  const handleSignOut = () => {
    if (context.setState) {
      context.setState({
        ...context,
        isEditMode: false,
        token: undefined,
        user: undefined,
        expiryTime: undefined,
      });
    }
    router.reload(); // Перенаправлення користувача на головну сторінку
  };
  // Повертаємо JSX для рендерингу компоненту
  return (
    <div className="flex justify-between items-center h-20 w-full bg-gray-100 fixed top-0 z-50">
      <Link href="/">
        <div className="flex items-center pl-16">
          <img
            id="logo"
            src="http://localhost:4566/product/lian_logo"
            alt="logo"
            width="131"
            height="35"
          />
        </div>
      </Link>

      <nav className="flex flex-row justify-between max-w-86 min-w-32 pr-2 space-x-10">
        {isValid && ( // Якщо токен дійсний, рендеримо перемикач
          <Switch
            checked={context.isEditMode} // Поточний стан перемикача
            onChange={handleSwitchChange} // Функція, яка викликається при зміні стану перемикача
            onColor="#86d3ff" // Колір перемикача, коли він увімкнений
            onHandleColor="#2693e6" // Колір ручки перемикача, коли він увімкнений
            handleDiameter={30} // Діаметр ручки перемикача
            uncheckedIcon={false} // Вимикаємо іконку, коли перемикач вимкнений
            checkedIcon={false} // Вимикаємо іконку, коли перемикач увімкнений
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" // Тінь перемикача
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" // Активна тінь перемикача
            height={20} // Висота перемикача
            width={48} // Ширина перемикача
            className="react-switch" // Додаємо клас для кастомізації перемикача
            id="material-switch" // Встановлюємо id для перемикача
          />
        )}
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <Link href="/contact">
            <i className="fa-solid fa-phone fa-2x"></i> {/* Іконка телефону */}
          </Link>
        </span>
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <Link href="/basket">
            <i className="fa-solid fa-cart-shopping fa-2x"></i>{' '}
            {/* Іконка кошика */}
          </Link>
        </span>
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <Link href="/signin">
            <i className="fa-solid fa-user fa-2x"></i>{' '}
            {/* Іконка користувача */}
          </Link>
        </span>
        {isTokenValid(context) && ( // Only show the sign out button if the token is valid
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
        <div className="flex items-center pr-8"></div>
      </nav>
    </div>
  );
}
