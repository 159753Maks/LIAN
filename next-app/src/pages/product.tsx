import { useEffect, useState } from 'react';

import FooterComponent from '@/components/generic/footer.component';
import HeaderComponent from '@/components/generic/header.component';
import ProductInfo from '@/components/product/ProductInfo.component';
import ProductPhotos from '@/components/product/ProductPhotos.component';
import { getProductById } from '@/hooks/product/getProductById';
import { IProduct } from '@/hooks/product/interface/product.interface';
import { useRouter } from 'next/router';

function ProductPage() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<IProduct>({
    uid: '',
    title: '',
    description: '',
    cost: 0,
    subDescription: '',
    categories: [{ uid: '', title: '' }],
    images: [{ url: '', uid: '', filename: '' }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId as string);
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
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col h-2/12">
        <HeaderComponent />
      </div>

      <div className="flex flex-col h-8/12">
        <ProductInfo
          product={product}
          isEditMode={false}
          onButtonClick={() => {}} // mock for now
        />
        <ProductPhotos product={product} />
      </div>

      <div className="flex h-1/12 w-full">
        <FooterComponent />
      </div>
    </div>
  );
}

export default ProductPage;
