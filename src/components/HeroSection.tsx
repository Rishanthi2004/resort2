import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Compass } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToExperiences = () => {
    document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-[#FAF8F5]">
      {/* 3D Depth Layer 1: Background Sky / Ocean with Cinematic Breathing Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-[-6%] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -10}px, 0) scale(1.06)`,
          }}
        >
          <img
            src="/src/assets/images/hero_resort_villa_1793611580912.jpg"
            alt="Kaialuna Overwater Luxury Villa & Horizon Pool"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-[12000ms] ease-in-out hover:scale-105"
          />
          {/* Subtle Ambient Sunlight Gradient & Fog Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#12231A]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/50 via-transparent to-[#FAF8F5]/40" />
        </div>
      </div>

      {/* 3D Depth Layer 2: Floating Ambient Mist / Clouds */}
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-25 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 15}px, 0)`,
          background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
        }}
      />

      {/* 3D Depth Layer 3: Foreground Decorative Botanical Palm Silhouette with High Parallax */}
      <div
        className="absolute -top-12 -left-12 w-96 h-96 z-20 pointer-events-none transition-transform duration-500 ease-out opacity-75 hidden lg:block"
        style={{
          transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 25}px, 0) rotate(12deg)`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#12231A]/15 filter blur-[0.5px]">
          <path d="M10,10 Q60,80 120,40 Q150,90 190,60 Q140,110 180,140 Q110,120 120,180 Q80,130 30,150 Q70,100 10,10 Z" />
        </svg>
      </div>

      {/* Floating 3D Circular Booking Indicator Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        onClick={onOpenBooking}
        className="absolute top-36 right-8 md:right-16 z-30 cursor-pointer group"
        style={{
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -14}px, 0)`,
        }}
      >
        <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
          {/* Outer rotating ring of typography */}
          <div className="absolute inset-0 animate-spin [animation-duration:22s] group-hover:[animation-duration:8s]">
            <svg viewBox="0 0 140 140" className="w-full h-full">
              <path
                id="textPath"
                d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                fill="none"
              />
              <text className="text-[9.5px] uppercase tracking-[0.24em] fill-[#12231A] font-semibold">
                <textPath href="#textPath">
                  · PRIVATE ATOLL SANCTUARY · MALDIVES · RESERVE ·
                </textPath>
              </text>
            </svg>
          </div>

          {/* Golden Center Core */}
          <div className="w-14 h-14 rounded-full bg-[#12231A] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-[#12231A] transition-all duration-300">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Center Hero Editorial Content */}
      <div className="relative z-20 max-w-5xl mx-auto my-auto text-center pt-8">
        {/* Large Elegant Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#12231A] tracking-[-0.01em] leading-[1.05] mb-6 max-w-4xl mx-auto drop-shadow-xs"
          style={{ textWrap: 'balance' }}
        >
          Escape into the Extraordinary
        </motion.h1>

        {/* Minimal Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base md:text-lg text-[#2C3E35] font-light max-w-2xl mx-auto leading-relaxed mb-10 tracking-wide"
        >
          Secluded amidst azure lagoon currents, Kaialuna unites raw barefoot tropical stillness with
          bespoke architectural indulgence.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={scrollToExperiences}
            className="group px-8 py-3.5 bg-[#12231A] text-[#FAF8F5] rounded-full text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#1A3326] transition-all shadow-md hover:shadow-xl flex items-center gap-3 cursor-pointer border border-[#D4AF37]/30"
          >
            <span>Explore Sanctuary</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-[#FAF8F5]/90 backdrop-blur-md text-[#12231A] rounded-full text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white transition-all border border-[#E7DFD5] shadow-xs cursor-pointer hover:border-[#C5A059]"
          >
            Check Availability
          </button>
        </motion.div>
      </div>

      {/* Hero Footnote Strip: Editorial Metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="relative z-20 max-w-7xl mx-auto w-full pt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#12231A]/10 text-xs text-[#2C3E35]/80 font-medium tracking-[0.2em] uppercase"
      >
        <div className="flex items-center gap-3">
          <span>Coordinates</span>
          <span className="text-[#C5A059]">·</span>
          <span className="font-mono tabular-nums text-[#12231A]">04°12′22″N 73°30′14″E</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Lagoon Temperature</span>
          <span className="text-[#C5A059]">·</span>
          <span className="font-mono tabular-nums text-[#12231A]">28.5°C Crystal Calm</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Private Key Total</span>
          <span className="text-[#C5A059]">·</span>
          <span className="font-mono tabular-nums text-[#12231A]">32 Overwater & Beach Pavilions</span>
        </div>
      </motion.div>
    </section>
  );
};
