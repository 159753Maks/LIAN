import { IProduct } from '@/hooks/product/interface/product.interface';

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
      <div className="">
        <div className="">
          <label className="font-roboto text-3xl tracking-wider">
            Назва товару
          </label>
          <input className=" h-px bg-gray-400" defaultValue={product.title} />
        </div>
        <div className="">
          <label className="font-roboto text-base leading-10 text-gray-600">
            Опис товару та характеристики
          </label>
        </div>
        <textarea
          className=" h-px bg-gray-400"
          defaultValue={product.subDescription}
        ></textarea>
        <textarea
          className=" h-px bg-gray-400"
          defaultValue={product.description}
        ></textarea>
        <div className="">
          <label className="font-roboto text-5xl text-black">
            <strong>Ціна :</strong>
          </label>
          <input type="number" defaultValue={product.cost} />
        </div>
        <div className="">
          <button
            className=" rounded-full w-48 h-12 bg-green-500 text-white font-roboto text-xl leading-12"
            onClick={() => onButtonClick(product.uid)}
          >
            Зберегти
          </button>
        </div>
      </div>
    );
  } else {
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
}
