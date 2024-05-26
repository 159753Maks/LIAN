import React, { useEffect, useState } from 'react';
import { getCategoryList } from '@/hooks/category/getCategoryList';
import ProductGridComponent, {
  ICategoryFilter,
} from '@/components/main/product.greed.component';
import { ICategory } from '@/hooks/category/interface/category.interface';
import NavigationCategoryButtonComponent from '@/components/main/navigationCategoryButton.component';

const NavigationComponent: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [categoryFilter, setCategoryFilter] = useState<ICategoryFilter>({
    categoryId: undefined,
    asc: true,
  });

  const setNewCategory = (id?: string) => {
    if (id === categoryFilter.categoryId) {
      setCategoryFilter({ categoryId: id, asc: !categoryFilter.asc });
    } else {
      setCategoryFilter({ categoryId: id, asc: true });
    }

    console.log(categoryFilter);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryList();
        setCategories([{ uid: undefined, title: 'All', }, ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="text-center mt-20 pt-10">
      <nav className="flex justify-center items-center space-x-2">
        {categories.map((category, index) => (
          <NavigationCategoryButtonComponent
            key={category.uid}
            category={category}
            isLast={index === categories.length - 1}
            onClick={setNewCategory}
          />
        ))}
      </nav>
      <ProductGridComponent categoryFilter={categoryFilter} />
    </div>
  );
};

export default NavigationComponent;
