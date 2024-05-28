import HeaderComponent from '@/components/generic/header.component';

import React from 'react';

import FooterComponent from '@/components/generic/footer.component';

import ContactFormComponent from '@/components/contacts/contactform.component';
import OfficeInfoComponent from '@/components/contacts/officeinfo.component';

// Основной компонент страницы контактов
function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <div className="flex flex-grow flex-wrap items-center justify-evenly mt-20 pt-10 w-11/12 mx-auto h-[80vh]">
        <OfficeInfoComponent />
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42332.824920543964!2d34.99608337402547!3d48.46033692367175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe31da955e9a1%3A0xb52cc3a566c92a48!2z0L_RgNC-0YHQvy4g0JDQu9C10LrRgdCw0L3QtNGA0LAg0J_QvtC70Y8sIDE2LCDQlNC90LXQv9GALCDQlNC90LXQv9GA0L7Qv9C10YLRgNC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KPQutGA0LDQuNC90LAsIDQ5MDAw!5e0!3m2!1sru!2sil!4v1716928749670!5m2!1sru!2sil"
          aria-hidden="false"
          tabIndex={0}
          className="w-4/5 h-full"
        ></iframe>

      </div>
      <FooterComponent />
    </div>
  );
}

export default ContactPage;
