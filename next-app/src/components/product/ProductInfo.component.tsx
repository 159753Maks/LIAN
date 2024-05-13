import { ProductInterface } from '@/hooks/iterfaces/product.interface';

export default function ProductInfo({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <div className="">
      <div className="">
        <h1 className="font-roboto text-3xl tracking-wider">Назва товару</h1>
        <div className=" h-px bg-gray-400">{product.title}</div>
      </div>
      <div className="">
        <p className="font-roboto text-base leading-10 text-gray-600">
          Опис товару та характеристики
        </p>
      </div>
      <div className=" h-px bg-gray-400">{product.subDescription}</div>
      <div className=" h-px bg-gray-400">{product.description}</div>
      <div className="">
        <p className="font-roboto text-5xl text-black">
          <strong>Ціна :</strong> {product.cost}
        </p>
      </div>
      <div className="">
        <button className=" rounded-full w-48 h-12 bg-green-500 text-white font-roboto text-xl leading-12">
          Купити
        </button>
      </div>
    </div>
  );
}
