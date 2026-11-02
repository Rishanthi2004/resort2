import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Navigation, Waves, MapPin, Wind } from 'lucide-react';
import { LocationPOI } from '../types';

const MAP_POIS: LocationPOI[] = [
  {
    id: 'villas',
    name: 'Overwater Villa Crescent',
    type: 'Private Residences',
    x: 48,
    y: 42,
    coordinates: '04°12′28″N 73°30′12″E',
    highlight: '32 Private overwater residences',
    description: 'Cantilevered over the sapphire lagoon with individual plunge pools and private sunset access.',
  },
  {
    id: 'lagoon',
    name: 'The Living Coral Reserve',
    type: 'Marine Sanctuary',
    x: 58,
    y: 56,
    coordinates: '04°12′18″N 73°30′24″E',
    highlight: 'House reef with manta rays & sea turtles',
    description: 'Protected biosphere reef with resident marine biologists and zero-motor craft zoning.',
  },
  {
    id: 'pool',
    name: 'Cliffside Infinity Grotto',
    type: 'Wellness Oasis',
    x: 32,
    y: 48,
    coordinates: '04°12′20″N 73°29′58″E',
    highlight: 'Triple-tier oceanfront freshwater pools',
    description: 'Natural limestone thermal baths, cold plunge grottos, and ocean meditation platforms.',
  },
  {
    id: 'dining',
    name: 'Teak Water Pavilion Dining',
    type: 'Fine Dining & Cellar',
    x: 64,
    y: 38,
    coordinates: '04°12′32″N 73°30′36″E',
    highlight: 'Floating lantern restaurant',
    description: 'Michelin-starred open-air gastronomy surrounded by reflecting lily pools.',
  },
  {
    id: 'jetty',
    name: 'Private Seaplane Pier',
    type: 'Arrival & Marina',
    x: 25,
    y: 30,
    coordinates: '04°12′40″N 73°29′45″E',
    highlight: 'Direct 25-min flight from Malé (MLE)',
    description: 'Bespoke twin-otter aircraft arrival lounge with chilled champagne welcome.',
  },
];

export const LocationMapSection: React.FC = () => {
  const [activePoi, setActivePoi] = useState<LocationPOI>(MAP_POIS[0]);
  const [compassAngle, setCompassAngle] = useState(25);

  return (
    <section id="sanctuary-map" className="relative py-32 px-6 md:px-12 bg-[#F5F2EB]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#12231A]/10 pb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-3">
              <span>Secluded Geography</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#12231A] font-light leading-tight">
              The Sanctuary Atoll
            </h2>
          </div>

          <p className="text-sm text-[#2C3E35]/80 font-light max-w-md leading-relaxed tracking-wide">
            Nestled within the crystalline outer rim of the North Malé Atoll, 25 minutes by private
            twin-otter seaplane from the international airport.
          </p>
        </div>

        {/* Map Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Vector Map Canvas */}
          <div className="lg:col-span-8 relative min-h-[480px] md:min-h-[580px] rounded-3xl md:rounded-[40px] bg-[#E5EFE9] border border-[#C8DBD0] overflow-hidden shadow-lg p-6 flex flex-col justify-between">
            {/* Ambient Water Texture & Island Contour */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 800 600"
            >
              <defs>
                <radialGradient id="deepLagoon" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8cc5b2" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#a3d5c4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d1ebe1" stopOpacity="0.1" />
                </radialGradient>
                <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ocean currents / contour rings */}
              <circle cx="420" cy="300" r="280" fill="none" stroke="#b2d6ca" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="420" cy="300" r="220" fill="none" stroke="#9ec9bc" strokeWidth="1.5" opacity="0.6" />
              <circle cx="420" cy="300" r="160" fill="url(#deepLagoon)" />

              {/* Main Tropical Island Organic Atoll Shape */}
              <path
                d="M 320,240 C 370,180 490,190 530,240 C 580,300 550,380 490,410 C 430,440 350,420 310,360 C 280,310 290,270 320,240 Z"
                fill="#d8ece0"
                stroke="#a6c8b9"
                strokeWidth="2"
              />

              {/* Overwater Boardwalk Arch Vector */}
              <path
                d="M 370,260 C 420,220 460,220 500,260 C 520,300 480,350 420,350 C 370,350 350,310 370,260"
                fill="none"
                stroke="#C5A059"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Animated Arrival Seaplane Route Line */}
              <path
                d="M 120,120 Q 200,160 250,220"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-[dash_20s_linear_infinite]"
              />
            </svg>

            {/* Top Bar with 3D Compass & Wind Stats */}
            <div className="relative z-20 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-xs text-xs">
                <Navigation className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-mono text-[#12231A]">04°12′22″ N · 73°30′14″ E</span>
              </div>

              {/* Interactive 3D Golden Compass */}
              <div
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const cx = rect.left + rect.width / 2;
                  const cy = rect.top + rect.height / 2;
                  const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
                  setCompassAngle(angle);
                }}
                className="w-14 h-14 rounded-full bg-[#12231A] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center shadow-xl cursor-crosshair group"
                title="Interactive 3D Compass (hover to calibrate)"
              >
                <div
                  className="transition-transform duration-200 ease-out flex items-center justify-center"
                  style={{ transform: `rotate(${compassAngle}deg)` }}
                >
                  <Compass className="w-7 h-7 text-[#D4AF37] drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* Interactive POI Markers on Map */}
            <div className="absolute inset-0 z-20 pointer-events-auto">
              {MAP_POIS.map((poi) => {
                const isSelected = activePoi.id === poi.id;
                return (
                  <button
                    key={poi.id}
                    onClick={() => setActivePoi(poi)}
                    style={{ top: `${poi.y}%`, left: `${poi.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute -inset-3 rounded-full bg-[#D4AF37]/30 animate-ping" />
                      )}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                          isSelected
                            ? 'bg-[#12231A] text-[#D4AF37] scale-125 border-2 border-[#D4AF37]'
                            : 'bg-white text-[#12231A] hover:bg-[#C5A059] hover:text-white border border-[#E7DFD5]'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>

                    <span
                      className={`block text-[10px] uppercase tracking-[0.15em] font-medium mt-1.5 px-2 py-0.5 rounded-full backdrop-blur-md transition-colors ${
                        isSelected
                          ? 'bg-[#12231A] text-white font-semibold'
                          : 'bg-white/80 text-[#2C3E35] group-hover:text-black'
                      }`}
                    >
                      {poi.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Bar: Seaplane & Marine Telemetry */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#b2d6ca]">
              <div className="flex items-center gap-2 text-xs text-[#2C3E35]">
                <Wind className="w-4 h-4 text-[#C5A059]" />
                <span>Northeast Trade Winds · 11 Knots</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#2C3E35]">
                <Waves className="w-4 h-4 text-[#C5A059]" />
                <span>Lagoon Depth: 1.8m — 4.2m Pristine Sandy Floor</span>
              </div>
            </div>
          </div>

          {/* Right: Selected POI Detail Showcase Card */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 bg-[#FAF8F5] rounded-3xl md:rounded-[40px] border border-[#E7DFD5] shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePoi.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>{activePoi.type}</span>
                  </div>
                  <h3 className="font-serif text-3xl font-normal text-[#12231A]">
                    {activePoi.name}
                  </h3>
                  <p className="font-mono text-xs text-[#2C3E35]/70 mt-1">
                    {activePoi.coordinates}
                  </p>
                </div>

                {/* Feature highlight */}
                <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E7DFD5]">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#12231A] font-medium block mb-1">
                    Sanctuary Feature
                  </span>
                  <p className="text-xs text-[#C5A059] font-medium">
                    {activePoi.highlight}
                  </p>
                </div>

                <p className="text-sm text-[#2C3E35] font-light leading-relaxed">
                  {activePoi.description}
                </p>

                {/* Location Quick Switcher List */}
                <div className="space-y-2 pt-2 border-t border-[#12231A]/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#2C3E35]/60 font-semibold block mb-2">
                    Key Landmarks
                  </span>
                  {MAP_POIS.map((poi) => (
                    <button
                      key={poi.id}
                      onClick={() => setActivePoi(poi)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        activePoi.id === poi.id
                          ? 'bg-[#12231A] text-[#FAF8F5] font-medium'
                          : 'text-[#2C3E35] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      <span>{poi.name}</span>
                      <span className="text-[10px] text-[#C5A059] uppercase tracking-wider">
                        {poi.type.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6 border-t border-[#12231A]/10 mt-6 flex items-center justify-between">
              <span className="text-xs text-[#2C3E35]/60">
                Helipad & Yacht Coordinates Available
              </span>
              <a
                href="#booking"
                className="text-xs uppercase tracking-[0.2em] font-semibold text-[#12231A] hover:text-[#C5A059] transition-colors"
              >
                Plan Arrival →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
