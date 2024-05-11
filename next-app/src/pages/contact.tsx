import React from 'react';
import './Contact.css'; // Подключаем стили CSS

// Компонент для текстовой информации офиса
function OfficeInfo() {
  return (
    <div className="form_text">
      <div className="text1">
        <h1>OFFICE INFO</h1>
        <p>People Behind the Success of our Company</p>
      </div>
      <div className="text2">
        <p><span>Office Hours:</span> Mon-Friday 8am - 10pm</p>
        <p><span>Address:</span> Igbalangao, Bugasong, Antique</p>
        <div>
          <p><span>Tell:</span> 123-456-7890</p>
          <p><span>Fax:</span> 123-456-7890</p>
        </div>
      </div>
    </div>
  );
}

// Компонент для формы контактов
function ContactForm() {
  return (
    <div className="form_imputs">
      <div className="imputs">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
      </div>
      <textarea cols="30" rows="12" placeholder="Message"></textarea>
    </div>
  );
}

// Основной компонент страницы контактов
function ContactPage() {
  return (
    <div className="form">
      <OfficeInfo />
      <ContactForm />
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20309.075323923767!2d30.4721233!3d50.4851493!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cddb0d0eaa85%3A0x8f45c7430b72eb42!2z0JrQuNC10LLRgdC60LDRjyDQvtCx0LvQsNGB0YLQvdCw0Y8g0LrQu9C40L3QuNGH0LXRgdC60LDRjyDQsdC-0LvRjNC90LjRhtCw!5e0!3m2!1sru!2sua!4v1612785194295!5m2!1sru!2sua"
        frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0">
      </iframe>
    </div>
  );
}

export default ContactPage;