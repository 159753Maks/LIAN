import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { ICartItem } from '@/pages/basket';

// Опис типу контексту для компонентів
export interface AppWrapperContextType {
  token?: string; // Токен користувача
  expiryTime?: string; // Час закінчення токену
  user?: { // Об'єкт з даними користувача
    userId: string; // Ідентифікатор користувача
    role: string; // Роль користувача
  };
  isEditMode: boolean; // Режим редагування
  localProductsOrder: ICartItem[]; // Локальний список товарів у кошику
  setState?: Dispatch<SetStateAction<AppWrapperContextType>>; // Функція зміни стану
}

// Створення контексту застосунку
const AppContext = createContext<AppWrapperContextType>({
  token: undefined,
  expiryTime: undefined,
  user: undefined,
  isEditMode: false,
  localProductsOrder: [],
  setState: () => { }, // По замовчуванню функція setState не робить нічого
});

interface AppWrapperProps {
  children: ReactNode; // Діти компонента
}

export function AppWrapper({ children }: AppWrapperProps) {
  // Створення стану, який зберігається в контексті
  let [sharedState, setSharedState] = useState<AppWrapperContextType>({
    token: undefined,
    expiryTime: undefined,
    isEditMode: false,
    user: undefined,
    localProductsOrder: [],
  });

  // Завантаження стану з локального сховища під час монтування компонента
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('sharedState');
      if (savedState) {
        setSharedState(JSON.parse(savedState));
      }
    } catch (e) {
      console.error('Error loading state from local storage:', e);
    }
  }, []);

  // Збереження стану у локальному сховищі після кожного оновлення
  useEffect(() => {
    localStorage.setItem('sharedState', JSON.stringify(sharedState));
  }, [sharedState]);

  // Додавання функції setState до значення контексту
  sharedState = { ...sharedState, setState: setSharedState };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

// Хук для отримання значення контексту
export function useAppContext() {
  return useContext(AppContext);
}
