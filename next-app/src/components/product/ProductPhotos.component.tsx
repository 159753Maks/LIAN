import { ProductInterface } from '@/hooks/iterfaces/product.interface';

export default function ProductPhotos({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <div className="product_block1-photo">
      <section className="mr-0.5 w-full">
        <div className="w-80 h-40 overflow-hidden mx-auto">
          <img
            src={product.imgs[0]}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="pt-20 w-80 mx-auto flex flex-row flex-wrap items-center justify-center">
          {product.imgs.map((img, index) => (
            <div key={index} className="h-20 overflow-hidden">
              <img
                src={img}
                alt=""
                className={`w-20 h-20 object-cover transition-transform duration-350 ${index === 0 ? 'scale-100 grayscale-0' : 'scale-112 grayscale'}`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
