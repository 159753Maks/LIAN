import React from 'react';
import { ICategory } from '@/hooks/category/interface/category.interface';

interface CategoryButtonProps {
  category: ICategory;
  isLast: boolean;
  onClick: (id: string) => void; // Accepts category id as argument
}

const NavigationCategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isLast,
  onClick,
}) => {
  return (
    <React.Fragment>
      <button
        className="text-gray-700 hover:underline"
        onClick={() => onClick(category.uid)} // Pass category id to onClick handler
      >
        {category.title}
      </button>
      {!isLast && <span> / </span>}
    </React.Fragment>
  );
};

export default NavigationCategoryButton;
