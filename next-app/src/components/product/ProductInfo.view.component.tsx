import { IProduct } from '@/hooks/product/interface/product.interface';

export default function ProductInfoViewComponent({
  product,
}: {
  product: IProduct; // Об'єкт продукту, що буде відображений
}) {
  return (
    <div className="flex flex-col justify-between ml-5 mr-5">
      <div className="">
        {/* Відображення назви продукту */}
        <h1 className="font-roboto text-3xl tracking-wider">{product.title}</h1>
        {/* Роздільна лінія */}
        <div className="h-px bg-gray-400"></div>
      </div>
      <div className="">
        {/* Відображення повного опису продукту */}
        <p className="font-roboto text-base leading-10 text-gray-600 whitespace-pre-line">
          {product.description}
        </p>
      </div>
      {/* Роздільна лінія */}
      <div className="h-px bg-gray-400"></div>
    </div>
  );
}
