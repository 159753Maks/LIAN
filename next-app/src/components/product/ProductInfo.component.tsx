import { IProduct } from '@/hooks/product/interface/product.interface';
import ProductInfoEditComponent from '@/components/product/ProductInfo.edit.component';
import ProductInfoViewComponent from '@/components/product/ProductInfo.view.component';

export default function ProductInfo({
  product,
  isEditMode = false,
  onButtonClick,
}: {
  product: IProduct;
  isEditMode: boolean;
  onButtonClick: (productId: string) => void;
}) {
  if (isEditMode) {
    return (
      <div>
        <ProductInfoEditComponent
          product={product}
          onButtonClick={onButtonClick}
        />
      </div>
    );
  } else {
    return (
      <div>
        <ProductInfoViewComponent
          product={product}
          onButtonClick={onButtonClick}
        />
      </div>
    );
  }
}
