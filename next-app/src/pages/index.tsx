import { useEffect, useState } from 'react';

import FooterComponent from '@/components/generic/footer.component';
import HeaderComponent from '@/components/generic/header.component';
import NavigationComponent from '@/components/main/navigation.component';

export default function Home() {
  useEffect(() => {
    document.title = 'Home'; // Set the page title to 'Home'
  }, []); // Run this effect only once when the component mounts

  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <HeaderComponent />

      {/*<div className="main_container flex flex-col items-center">*/}
      {/*  <div className="wrapper relative">*/}
      {/*    {Array.from({ length: 5 }, (_, i) => (*/}
      {/*      <input*/}
      {/*        key={`slide${i + 1}`}*/}
      {/*        type="radio"*/}
      {/*        name="point"*/}
      {/*        id={`slide${i + 1}`}*/}
      {/*        checked={activeSlide === i + 1}*/}
      {/*        onChange={() => setActiveSlide(i + 1)}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*    <div className="slider bg-white overflow-hidden relative">*/}
      {/*      <div className="slides flex items-center justify-center absolute inset-0">*/}
      {/*        <div className="slide1 bg-cover bg-center h-full w-full">*/}
      {/*          <div className="slide1_text flex flex-col justify-between items-center">*/}
      {/*            <h1 className="text-white bg-black text-center font-light">*/}
      {/*              LIAN CREATIVE AGENCY*/}
      {/*            </h1>*/}
      {/*            <p className="text-center font-light text-lg">*/}
      {/*              MINIMAL FREELANCE PORTFOLIO*/}
      {/*            </p>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        /!* Replace the following divs with your actual slide components *!/*/}
      {/*        {Array.from({ length: 3 }, (_, i) => (*/}
      {/*          <div*/}
      {/*            key={`slideContent${i + 1}`}*/}
      {/*            className={`slide${i + 2} bg-cover bg-center h-full w-full`}*/}
      {/*          ></div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="controls absolute">*/}
      {/*      {Array.from({ length: 3 }, (_, i) => (*/}
      {/*        <label key={`label${i + 1}`} htmlFor={`slide${i + 1}`}></label>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <NavigationComponent />

      <FooterComponent />
    </div>
  );
}
