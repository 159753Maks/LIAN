import HeaderComponent from "@/components/header.component";
import { useEffect } from "react";
import ProductComponent from "@/components/product.component";
import FooterComponent from "@/components/footer.component";

export default function Home() {
  useEffect(() => {
    document.title = 'Home'; // Set the page title to 'Home'
  }, []); // Run this effect only once when the component mounts


  // const items = await getProducts(props)
  return (
    <div>
      <HeaderComponent />
      <ProductComponent img='/img/memory/kingston-kc3000-3d-nand-tlc-1tb-m2-2280(1).jpg' cost='7.99' />
      <h1>Contact home</h1>

      <p>This is the home page.</p>
      <a href='/contact'>Contact</a>
      <br />
      <br />
      <a href=""><i className="fa-solid fa-cart-shopping fa-2x"></i></a>
      <br />
      <br />
      <a href='/about'>About</a>
      <FooterComponent />
    </div>
  );
}
