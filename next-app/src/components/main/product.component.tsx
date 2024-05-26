import React from 'react';
import { IProduct } from '@/hooks/product/interface/product.interface';
import Link from 'next/link';

export interface ProductComponentProps {
  product: IProduct;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
  return (
    <Link href={`/product?productId=${product.uid}`}>
      <div className="flex h-full w-full">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col justify-between min-h-96">
          <div className="flex justify-center items-center bg-white w-full h-48">
            <div className="w-1/2 h-48">
              <img
                className="object-cover w-full h-full"
                src={product.images[0].url}
                alt={product.title}
              />
            </div>
          </div>
          <div className="pt-2 w-full flex-grow">
            <h6 className="mt-2 text-lg font-semibold text-black-400">
              <a href="#" className="hover:text-red-500">
                {product.title}
              </a>
            </h6>
            <p className="mt-2 pl-2 pr-2 text-xs text-gray-500">
              {product.subDescription}
            </p>
          </div>
          <div className="pr-6 pl-6 pb-6 w-full flex justify-between items-end">
            <div className="text-xl font-bold text-red-500">{product.cost} ₴</div> {/* Додано символ гривні */}
            <div className="flex space-x-2">
              <a href="#" className="text-blue-300 hover:text-red-500">
                <i className="fa fa-heart"></i>
              </a>
              <a href="#" className="text-blue-300 hover:text-red-500">
                <i className="fa fa-shopping-cart"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductComponent;
