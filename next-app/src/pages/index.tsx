import HeaderComponent from "@/components/ganerick/header.component";
import { useEffect } from "react";
import ProductComponent from "@/components/main/product.component";
import FooterComponent from "@/components/ganerick/footer.component";
import NavigationComponent from "@/components/main/navigation.component";
import styles from '@/public/css/main.module.css';

export default function Home() {
  useEffect(() => {
    document.title = 'Home'; // Set the page title to 'Home'
  }, []); // Run this effect only once when the component mounts


  // const items = await getProducts(props)
  return (
    <div className={styles.main_container}>
      <HeaderComponent />

      <div className={styles.wrapper}>
        <input type="radio" name="point" id="slide1" checked />
        <input type="radio" name="point" id="slide2" />
        <input type="radio" name="point" id="slide3" />
        <input type="radio" name="point" id="slide4" />
        <input type="radio" name="point" id="slide5" />
        <div className={styles.slider}>
          <div className={[styles.slides, styles.slide1].join('')}>
            <div className={styles.slide1_text}>
              <h1>LIAN CREATIVE AGENCY</h1>
              <p>MINIMAL FREELANCE PORTFOLIO </p>
            </div>
          </div>
          <div className={[styles.slides, styles.slide2].join('')}></div>
          <div className={[styles.slides, styles.slide3].join('')}></div>
        </div>
        <div className={styles.controls}>
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

