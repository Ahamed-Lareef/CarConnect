import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },  // ✅ About page added
    { link: "Book a Wash", path: "/booking" },
    { link: "Subscription", path: "/subscription" },
    { link: "My Bookings", path: "/myBookings" },
    { link: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full bg-black fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-black shadow-lg" : ""}`}>
        <div className="flex justify-between items-center text-base gap-8">
          <Link to="/" className="text-2xl font-bold text-[#dc323f] flex items-center gap-2">
            <img 
              src="src/assets/carconnect.png" 
              alt="CarWash Logo"
              className="h-12 md:h-16"
            />CarWash
          </Link>

          {/* Desktop Navigation */}
          <ul className="md:flex space-x-12 hidden navitems">
            {navItems.map(({ link, path }) => (
              <Link 
                key={link} 
                to={path}  
                className="block text-base cursor-pointer uppercase text-white hover:text-[#dc323f]"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FaXmark className="h-6 w-6" /> : <FaBarsStaggered className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-[#111] ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {navItems.map(({ link, path }) => (
            <Link to={path} key={link} onClick={toggleMenu} className="block text-white hover:text-[#dc323f]">
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
