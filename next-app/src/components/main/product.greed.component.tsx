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
  const [page, setPage] = useState<number>(1);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const data = await getProductsList({
        limit: 5,
        offset: products.length,
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
    fetchProducts(page);
  }, [categoryFilter, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div className="h-96 w-96">
          <ProductComponent key={product.uid} product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGridComponent;
