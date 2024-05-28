export default function FooterComponent() {
  return (
    <footer className="flex items-center justify-center w-full h-40 bg-white shadow-md mt-10">
      <div className="w-4/5 h-full flex flex-col items-center justify-around">
        <div className="footer_logo">
          <img
            width="131"
            height="35"
            src="http://localhost:4566/product/lian_logo"
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
