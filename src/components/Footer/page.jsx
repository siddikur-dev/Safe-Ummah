const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Branding */}
        <div className="text-lg font-bold">Palestine Aid</div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base">
          <a
            href="#home"
            className="hover:text-red-500 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-red-500 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#donate"
            className="hover:text-red-500 transition-colors duration-200"
          >
            Donate
          </a>
          <a
            href="#contact"
            className="hover:text-red-500 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-white text-xl">
          <a
            href="#"
            className="hover:text-red-500 transition-colors duration-200"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="hover:text-red-500 transition-colors duration-200"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="hover:text-red-500 transition-colors duration-200"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Palestine Aid. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
