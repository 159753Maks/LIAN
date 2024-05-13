import HeaderComponent from '@/components/generic/header.component';

import React from 'react';

import FooterComponent from '@/components/generic/footer.component';
import './contact.css'; // Подключаем стили CSS
import ContactFormComponent from '@/components/contacts/contactform.component';
import OfficeInfoComponent from '@/components/contacts/officeinfo.component';

// Основной компонент страницы контактов
function ContactPage() {
  return (
    <div>
      <HeaderComponent />
      <div className="form">
        <OfficeInfoComponent /> // Компонент для текстовой информации офиса
        <ContactFormComponent /> // Компонент для формы контактов
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20309.075323923767!2d30.4721233!3d50.4851493!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cddb0d0eaa85%3A0x8f45c7430b72eb42!2z0JrQuNC10LLRgdC60LDRjyDQvtCx0LvQsNGB0YLQvdCw0Y8g0LrQu9C40L3QuNGH0LXRgdC60LDRjyDQsdC-0LvRjNC90LjRhtCw!5e0!3m2!1sru!2sua!4v1612785194295!5m2!1sru!2sua"
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          style={{ border: '0px' }}
        ></iframe>
      </div>
      <FooterComponent />
    </div>
  );
}

export default ContactPage;
