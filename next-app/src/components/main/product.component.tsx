import React from 'react';
import { IProduct } from '@/hooks/product/interface/product.interface';

export interface ProductComponentProps {
  product: IProduct;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
  return (
    <div className="flex justify-center space-x-10">
      <div className="max-w-md bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <a href="/product" className="block bg-rose-100">
          <div className="h-72 w-72">
            <img
              className="object-cover w-full h-full"
              src={product.images[0].url}
              alt={product.title}
            />
          </div>
        </a>
        <div className="p-6">
          <span className="block text-xs font-semibold text-blue-300 uppercase">
            {product.title}
          </span>
          <h4 className="mt-2 text-lg font-semibold text-blue-400">
            <a href="#" className="hover:text-red-500">
              {product.subDescription}
            </a>
          </h4>
          <p className="mt-2 text-gray-300">{product.description}</p>
          <div className="mt-4 flex justify-between items-center">
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
    </div>
  );
};

export default ProductComponent;
