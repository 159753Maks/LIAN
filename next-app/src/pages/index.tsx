import HeaderComponent from "@/components/header.component";
import { useEffect } from "react";
import ProductComponent from "@/components/product.component";
import FooterComponent from "@/components/footer.component";
import NavigationComponent from "@/components/navigation.component";
import './main.css';
import './navigation.css';
import './header.css';
import './footer.css';
import './product_crds.css';

export default function Home() {
  useEffect(() => {
    document.title = 'Home'; // Set the page title to 'Home'
  }, []); // Run this effect only once when the component mounts


  // const items = await getProducts(props)
  return (
    <div>
      <HeaderComponent />

      <div className="wrapper">
        <input type="radio" name="point" id="slide1" checked />
        <input type="radio" name="point" id="slide2" />
        <input type="radio" name="point" id="slide3" />
        <input type="radio" name="point" id="slide4" />
        <input type="radio" name="point" id="slide5" />
        <div className="slider">
          <div className="slides slide1">
            <div className="slide1_text">
              <h1>LIAN CREATIVE AGENCY</h1>
              <p>MINIMAL FREELANCE PORTFOLIO </p>
            </div>
          </div>
          <div className="slides slide2"></div>
          <div className="slides slide3"></div>
        </div>
        <div className="controls">
          <label htmlFor="slide1"></label>
          <label htmlFor="slide2"></label>
          <label htmlFor="slide3"></label>
        </div>
      </div>

      <NavigationComponent />

      <ProductComponent img='/img/memory/kingston-kc3000-3d-nand-tlc-1tb-m2-2280(1).jpg' cost='7.99' />

      <FooterComponent />
    </div>
  );
}

