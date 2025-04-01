import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b0c0e] text-gray-300 py-6 mt-0">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-bold text-[#dc323f]">CarConnect Wash</h2>
          <p className="mt-3 text-sm">
            Premium car wash services with top-notch care. Choose from a variety of packages tailored to your needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#dc323f] transition">Home</Link></li>
            <li><Link to="/bookings" className="hover:text-[#dc323f] transition">Book a Wash</Link></li>
            <li><Link to="/myBookings" className="hover:text-[#dc323f] transition">My Bookings</Link></li>
            <li><Link to="/subscription" className="hover:text-[#dc323f] transition">Subscriptions</Link></li>
            <li><Link to="/contact" className="hover:text-[#dc323f] transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
          <p className="text-sm">123 Main Street, City, Country</p>
          <p className="text-sm">Email: support@carconnect.com</p>
          <p className="text-sm">Phone: +94 75 878 5353</p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-[#dc323f] hover:text-white transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-[#dc323f] hover:text-white transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-[#dc323f] hover:text-white transition">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 mt-6 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} CarConnect Wash. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;