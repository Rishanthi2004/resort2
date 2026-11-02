import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Waves, Compass, Coffee, ShieldCheck } from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  x: number; // percentage
  y: number; // percentage
  view: 'exterior' | 'interior';
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'pool',
    title: 'Private Horizon Plunge Pool',
    subtitle: '85m² freshwater cantilevered edge',
    x: 72,
    y: 65,
    view: 'exterior',
  },
  {
    id: 'view',
    title: 'Unobstructed Ocean View',
    subtitle: 'West sunset lagoon exposure',
    x: 82,
    y: 35,
    view: 'exterior',
  },
  {
    id: 'butler',
    title: 'Dedicated Island Butler',
    subtitle: '24/7 personalized service pavilion',
    x: 28,
    y: 55,
    view: 'exterior',
  },
  {
    id: 'canopy',
    title: 'Organic Linen King Canopy',
    subtitle: 'Hand-woven raw Egyptian cotton',
    x: 35,
    y: 45,
    view: 'interior',
  },
  {
    id: 'terrace',
    title: 'Seamless Glass Portal',
    subtitle: 'Floor-to-ceiling retractable walls',
    x: 75,
    y: 50,
    view: 'interior',
  },
];

export const VillaShowcase: React.FC = () => {
  const [currentView, setCurrentView] = useState<'exterior' | 'interior'>('exterior');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const exteriorImg = '/src/assets/images/experience_luxury_villa_1793611582271.jpg';
  const interiorImg = '/src/assets/images/villa_suite_interior_1793611581499.jpg';

  const visibleHotspots = HOTSPOTS.filter((h) => h.view === currentView);

  return (
    <section id="villas" className="relative py-32 px-6 md:px-12 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#12231A]/10 pb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-3">
              <span>02</span>
              <span>·</span>
              <span>Architectural Centerpiece</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#12231A] font-light leading-tight">
              The Ocean Residence
            </h2>
          </div>

          {/* Interactive Exterior / Interior Switcher */}
          <div className="flex items-center p-1.5 bg-[#F5F2EB] rounded-full border border-[#E7DFD5] shadow-xs">
            <button
              onClick={() => setCurrentView('exterior')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer ${
                currentView === 'exterior'
                  ? 'bg-[#12231A] text-[#FAF8F5] shadow-sm'
                  : 'text-[#2C3E35] hover:text-[#12231A]'
              }`}
            >
              Exterior Pavilion
            </button>
            <button
              onClick={() => setCurrentView('interior')}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all cursor-pointer ${
                currentView === 'interior'
                  ? 'bg-[#12231A] text-[#FAF8F5] shadow-sm'
                  : 'text-[#2C3E35] hover:text-[#12231A]'
              }`}
            >
              Ocean Suite Interior
            </button>
          </div>
        </div>

        {/* Floating 3D Villa Showcase Stage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[40px] md:rounded-[56px] overflow-hidden bg-[#12231A] shadow-[0_35px_80px_-20px_rgba(18,35,26,0.35)] border border-[#E7DFD5]/50 group"
        >
          {/* Main Visual Display with Animated Cross-fade */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {currentView === 'exterior' ? (
                <motion.img
                  key="exterior"
                  src={exteriorImg}
                  alt="Kaialuna Villa Exterior"
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                />
              ) : (
                <motion.img
                  key="interior"
                  src={interiorImg}
                  alt="Kaialuna Villa Interior"
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                />
              )}
            </AnimatePresence>

            {/* Gradient Scrims for Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Floating Interactive Hotspots */}
            {visibleHotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  onMouseEnter={() => setActiveHotspot(spot)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                  className="relative group/pin cursor-pointer"
                >
                  {/* Expanding pulse ring */}
                  <span className="absolute -inset-2 rounded-full bg-[#D4AF37]/40 animate-ping" />
                  <div className="relative w-8 h-8 rounded-full bg-[#12231A]/90 backdrop-blur-md border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-xl hover:scale-125 hover:bg-[#C5A059] hover:text-[#12231A] transition-all">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>

                  {/* Tooltip Card */}
                  <AnimatePresence>
                    {activeHotspot?.id === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.92 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-11 left-1/2 -translate-x-1/2 w-56 p-3.5 bg-[#FAF8F5]/95 backdrop-blur-md rounded-2xl border border-[#D4AF37]/40 shadow-2xl z-30 pointer-events-none"
                      >
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                          Highlight
                        </span>
                        <h5 className="font-serif text-sm font-semibold text-[#12231A]">
                          {spot.title}
                        </h5>
                        <p className="text-[11px] text-[#2C3E35] font-light mt-0.5">
                          {spot.subtitle}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}

            {/* Top-Left Floating Spec Badges */}
            <div className="absolute top-8 left-8 z-20 flex flex-wrap items-center gap-3">
              <div className="px-4 py-1.5 rounded-full bg-[#12231A]/80 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                <Waves className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>380m² Total Footprint</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-[#12231A]/80 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2 hidden sm:flex">
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Sunset Facing</span>
              </div>
            </div>

            {/* Bottom-Right View Toggle Quick Trigger */}
            <div className="absolute bottom-8 right-8 z-20">
              <button
                onClick={() => setCurrentView(currentView === 'exterior' ? 'interior' : 'exterior')}
                className="px-5 py-2.5 bg-white/90 backdrop-blur-md text-[#12231A] rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all shadow-lg flex items-center gap-2 cursor-pointer border border-[#E7DFD5]"
              >
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span>Switch to {currentView === 'exterior' ? 'Suite Interior' : 'Exterior Pavilion'}</span>
              </button>
            </div>
          </div>

          {/* Villa Amenities Bottom Strip */}
          <div className="p-8 md:p-10 bg-[#12231A] text-[#FAF8F5] grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10">
            <div className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg font-normal">Private Lagoon Pool</h4>
                <p className="text-xs text-[#FAF8F5]/60 mt-1">Temperature-balanced infinity pool</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Coffee className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg font-normal">In-Villa Sommelier</h4>
                <p className="text-xs text-[#FAF8F5]/60 mt-1">Daily morning brew & afternoon tea</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg font-normal">Absolute Seclusion</h4>
                <p className="text-xs text-[#FAF8F5]/60 mt-1">No shared boundaries or walkways</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-lg font-normal">Bespoke Wellness</h4>
                <p className="text-xs text-[#FAF8F5]/60 mt-1">In-suite spa treatments on demand</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
