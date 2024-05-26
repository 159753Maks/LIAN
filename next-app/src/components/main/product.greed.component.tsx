import React, { useEffect, useState } from 'react';

import ProductComponent from '@/components/main/product.component';
import { getProductsList } from '@/hooks/product/getProductsList';
import { IProduct } from '@/hooks/product/interface/product.interface';

export interface ICategoryFilter {
  categoryId?: string;
  asc: boolean;
}

interface ProductGridComponentProps {
  categoryFilter: ICategoryFilter;
}

const ProductGridComponent: React.FC<ProductGridComponentProps> = ({
  categoryFilter,
}) => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [currentCategory, setCategory] = useState<ICategoryFilter>({
    categoryId: undefined,
    asc: true,
  });

  const fetchProducts = async (
    categoryFilter: ICategoryFilter,
    offset: number
  ) => {
    setLoading(true);
    try {
      const data = await getProductsList({
        limit: 15,
        offset,
        categoryIds: categoryFilter.categoryId
          ? JSON.stringify([categoryFilter.categoryId])
          : undefined,
        asc: categoryFilter.asc,
      });
      setProducts(prevProducts => [...prevProducts, ...data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryFilter.categoryId !== currentCategory.categoryId) {
      setCategory(categoryFilter);
      setProducts([]);
      setOffset(0);
    }

    if (
      categoryFilter.categoryId === currentCategory.categoryId &&
      categoryFilter.asc !== currentCategory.asc
    ) {
      setCategory(categoryFilter);
      setProducts([]);
      setOffset(0);
    }

    fetchProducts(categoryFilter, offset);
  }, [categoryFilter, offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffset(products.length);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
      {products.map(product => (
        <div className="p-6 h-96 w-96 justify-self-center">
          <ProductComponent key={product.uid} product={product} />
        </div>
      ))}
    </div>
  );
};
///<div className="grid grid-cols-4 gap-10 mt-10">
//       {products.map(product => (
//         <div className="h-96 w-96 justify-self-center">
//           <ProductComponent key={product.uid} product={product} />
//         </div>
//       ))}
//     </div>
export default ProductGridComponent;
