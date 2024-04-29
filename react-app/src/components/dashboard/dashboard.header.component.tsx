import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="header">
      <a href="index.html">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="131"
            height="35" viewBox="0 0 131 35">
            <image id="logo" width="131" height="35"
              xlinkHref="some link" />
          </svg>
        </div>
      </a>

      <nav className="header_nav">
        <a href="contact.html"><i className="fa-solid fa-phone fa-2x"></i></a>
        <a href=""><i className="fa-solid fa-cart-shopping fa-2x"></i></a>
        <a href="login_form.html"><i className="fa-solid fa-user fa-2x"></i></a>
      </nav>
    </div>
  );
}

export default DashboardHeader;
