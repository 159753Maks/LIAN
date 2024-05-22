import { useEffect, useState } from 'react';

import FooterComponent from '@/components/generic/footer.component';
import HeaderComponent from '@/components/generic/header.component';
import ProductInfo from '@/components/product/ProductInfo.component';
import ProductPhotos from '@/components/product/ProductPhotos.component';
import { getProductById } from '@/hooks/product/getProductById';

function ProductPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    cost: 0,
    subDescription: '',
    imgs: [''],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        // @ts-ignore
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <HeaderComponent />

      <div className="product_block1">
        <ProductInfo product={product} />
        <ProductPhotos product={product} />
      </div>

      <FooterComponent />
    </div>
  );
}

export default ProductPage;
