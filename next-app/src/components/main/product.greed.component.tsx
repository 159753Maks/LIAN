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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsList({
          limit: 5,
          categoryIds: categoryFilter.categoryId
            ? JSON.stringify([categoryFilter.categoryId])
            : undefined,
          asc: categoryFilter.asc,
        });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductComponent key={product.uid} product={product} />
      ))}
    </div>
  );
};

export default ProductGridComponent;
