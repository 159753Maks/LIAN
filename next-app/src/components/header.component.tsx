export default function HeaderComponent() {
  return (
    <header className="header">
      <a href="/index.html">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="131"
               height="35" viewBox="0 0 131 35">
            <image id="logo" width="131" height="35"
                   xlinkHref="data:image/png;base64,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"/>
          </svg>
        </div>
      </a>

      <nav className="header_nav">
        <a href="/contact.html"><i className="fa-solid fa-phone fa-2x"></i></a>
        <a href=""><i className="fa-solid fa-cart-shopping fa-2x"></i></a>
        <a href="/login_form.html"><i className="fa-solid fa-user fa-2x"></i></a>
      </nav>
    </header>
  );
}
