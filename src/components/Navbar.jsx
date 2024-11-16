import React, { useState } from "react";
import { NAVIGATION_LINKS, SOCIAL_MEDIA_LINKS } from "../constants";
import NameLogo from "../assets/NameLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const cleanTargetId = targetId.replace(/^#/, ""); // Remove the '#' symbol
    const element = document.getElementById(cleanTargetId);

    if (element) {
      const offset = 85; // Adjust for navbar height
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
    } else {
      console.warn(`Element with ID "${cleanTargetId}" not found.`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between mx-auto max-w-6xl px-4 py-4">
        <a href="#home" onClick={(e) => handleLinkClick(e, "#home")}>
          <img src={NameLogo} alt="logo" className="h-8 w-30" />
        </a>
        <ul className="flex items-center gap-8">
          {NAVIGATION_LINKS.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-xl text-white transition-colors hover:text-yellow-400"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden px-4 py-4 flex items-center justify-end">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/20 px-4 py-2">
          <ul className="space-y-4 pb-4">
            {NAVIGATION_LINKS.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="block text-base text-white transition-colors hover:text-yellow-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-4">
            {SOCIAL_MEDIA_LINKS.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;