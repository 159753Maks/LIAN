import React from 'react';

import { ICartItem } from '@/pages/basket';

const ProductInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <p>{label}</p> <p>{value}</p>
  </div>
);

export default function CartItemComponent({
  products,
  deleteProductOnclick,
}: {
  products: ICartItem[];
  deleteProductOnclick: (uid: string) => void;
}) {
  return (
    <div className="mt-20 pt-10">
      <p className="font-bold">Товари в кошику</p>
      {products.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        products.map(product => (
          <div className="flex flex-row justify-between items-center my-5">
            <div className="w-24 h-24 mr-5">
              <img
                src={product.images[0].url || '/no-image.png'}
                alt="Фото товара"
              />
            </div>
            <div className="w-3/5">
              <ProductInfo label="Название товара :" value={product.title} />
              <ProductInfo label="Ціна: " value={product.cost} />
              <ProductInfo label="Кількість: " value={product.count} />
            </div>
            <div className="text-right">
              <button
                className="bg-red-500 text-white py-2 px-4 border-none cursor-pointer"
                onClick={() => deleteProductOnclick(product.uid)}
              >
                Видалити
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
