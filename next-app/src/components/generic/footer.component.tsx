export default function FooterComponent() {
  return (
    <footer className="flex items-end justify-center w-full h-40 pb-0 bg-white shadow-md">
      <div className="w-4/5 h-full flex flex-col items-center justify-around">
        <div className="footer_logo">
          <img
            width="131"
            height="35"
            src="http://localhost:4566/product/lian_logo.png"
            alt="logo"
          />
        </div>

        <div className="footer_text">
          <p className="text-sm text-gray-600">
            © 2016 <span className="font-bold">MULITIX THEME</span> BY
            THEMEFORCES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
