export default function ProductComponent(props: { img:string, cost:string}) {
  return (
    <section>
      <div className="product-card spacing">
        <a href="/product_template.html">
          <div className="product-thumb">
            <img src={props.img} />
          </div>
        </a>
        <div className="product-details">
          <span className="product-category">T-Shirt</span>
          <h4><a href="#">New T-Shirt For Man</a></h4>
          <p>New Import T-Shirt For Man Very Rare Collection, If You Want Order Right Now</p>
          <div className="product-bottom-details">
            <div className="product-price">{props.cost}</div>
            <div className="product-links">
              <a href="#"><i className="fa fa-heart"></i></a>
              <a href="#"><i className="fa fa-shopping-cart"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
