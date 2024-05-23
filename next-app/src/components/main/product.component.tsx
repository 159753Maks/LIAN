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
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-center items-center bg-rose-100 w-full h-3/6">
            <div className="w-1/2 h-48">
              <img
                className="object-cover w-full h-full"
                src={product.images[0].url}
                alt={product.title}
              />
            </div>
          </div>
          <div className="pt-2 w-full h-2/6">
            <span className="block text-xs font-semibold text-blue-300 uppercase">
              {product.categories[0].title}
            </span>
            <h6 className="mt-2 text-lg font-semibold text-blue-400">
              <a href="#" className="hover:text-red-500">
                {product.title}
              </a>
            </h6>
            <p className="mt-2 text-xs text-gray-300">
              {product.subDescription}
            </p>
          </div>
          <div className="pr-6 pl-6 pb-6 h-1/6 w-full flex justify-between items-end">
            <div className="text-xl font-bold text-red-500">{product.cost}</div>
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
