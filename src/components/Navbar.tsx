import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenBooking: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs border-b border-[#E7DFD5]/60 py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line in display face */}
        <a
          href="#"
          className="font-serif text-2xl md:text-3xl font-normal tracking-[0.22em] text-[#12231A] whitespace-nowrap shrink-0 hover:text-[#C5A059] transition-colors"
        >
          KAIALUNA
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.25em] font-medium text-[#2C3E35]">
          <a
            href="#about"
            className="hover:text-[#12231A] transition-colors whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
          >
            About
          </a>
          <a
            href="#experiences"
            className="hover:text-[#12231A] transition-colors whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
          >
            Experiences
          </a>
          <a
            href="#villas"
            className="hover:text-[#12231A] transition-colors whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
          >
            Villas
          </a>
          <a
            href="#services"
            className="hover:text-[#12231A] transition-colors whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-[#12231A] transition-colors whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5] bg-[#12231A] rounded-full hover:bg-[#1A3326] transition-all hover:shadow-md cursor-pointer whitespace-nowrap shrink-0 border border-[#D4AF37]/30"
          >
            Reserve Villa
          </button>
        </div>
      </div>
    </header>
  );
};
