import { IProduct } from '@/hooks/product/interface/product.interface';

export default function ProductInfoViewComponent({
  product,
  onButtonClick,
}: {
  product: IProduct;
  onButtonClick: (productId: string) => void;
}) {
  return (
    <div className="flex flex-col justify-between ml-5 mr-5">
      <div className="">
        <h1 className="font-roboto text-3xl tracking-wider">{product.title}</h1>
        <div className=" h-px bg-gray-400"></div>
      </div>
      <div className="">
        <p className="font-roboto text-base leading-10 text-gray-600 whitespace-pre-line">
          {product.description}
        </p>
      </div>
      <div className=" h-px bg-gray-400"></div>
      <div className="mt-5 flex flex-row justify-between ">
        <p className="font-roboto text-5xl text-black">
          <strong>Ціна :</strong> {product.cost}
        </p>
        <button
          className=" rounded-full w-48 h-12 bg-green-500 text-white font-roboto text-xl leading-12"
          onClick={() => onButtonClick(product.uid)}
        >
          Купити
        </button>
      </div>
    </div>
  );
}
