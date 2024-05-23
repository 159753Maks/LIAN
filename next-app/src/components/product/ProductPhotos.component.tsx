import { IProduct } from '@/hooks/product/interface/product.interface';

export default function ProductPhotos({ product }: { product: IProduct }) {
  return (
    <div className="product_block1-photo">
      <section className="mr-0.5 w-full">
        <div className="w-80 h-40 overflow-hidden mx-auto">
          <img
            src={product.images[0].url}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="pt-20 w-80 mx-auto flex flex-row flex-wrap items-center justify-center">
          {product.images.map((img, index) => (
            <div key={index} className="h-20 overflow-hidden">
              <img
                src={img.url}
                alt={img.filename}
                className={`w-20 h-20 object-cover transition-transform duration-350 ${index === 0 ? 'scale-100 grayscale-0' : 'scale-112 grayscale'}`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
