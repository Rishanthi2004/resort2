import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Shield, Leaf, X, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [showCharter, setShowCharter] = useState(false);

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-4">
          <span>01</span>
          <span>·</span>
          <span>The Sanctuary Heritage</span>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Text Story & Architectural Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#12231A] font-light leading-[1.1]">
              Born of Untamed Lagoon Serenity
            </h2>

            <p className="text-base text-[#2C3E35] font-light leading-relaxed">
              Established within an untouched coral ring in the North Malé Atoll, Kaialuna was conceived
              as an intimate architectural sanctuary where structure dissolves into open seascape.
              Here, true luxury is measured by absolute silence, unhurried time, and deep connection with
              living ocean ecology.
            </p>

            <p className="text-sm text-[#2C3E35]/80 font-light leading-relaxed">
              Limited to thirty-two standalone pavilions constructed from sustainable certified teak,
              sun-bleached travertine, and local volcanic limestone, each villa enjoys a minimum of
              forty-five meters of secluded lagoon frontage. No shared walls. No motorized noise. Only the
              natural cadence of Indian Ocean swells.
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#12231A]/10">
              <div className="space-y-1">
                <span className="font-serif text-2xl md:text-3xl text-[#12231A] font-normal tabular-nums">
                  32
                </span>
                <p className="text-[11px] uppercase tracking-wider text-[#2C3E35]/70">
                  Private Pavilions Only
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-2xl md:text-3xl text-[#12231A] font-normal tabular-nums">
                  100%
                </span>
                <p className="text-[11px] uppercase tracking-wider text-[#2C3E35]/70">
                  Solar & Biosphere Powered
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-2xl md:text-3xl text-[#12231A] font-normal tabular-nums">
                  45m+
                </span>
                <p className="text-[11px] uppercase tracking-wider text-[#2C3E35]/70">
                  Lagoon Seclusion Buffer
                </p>
              </div>
            </div>

            {/* Interactive Charter Trigger */}
            <div className="pt-4">
              <button
                onClick={() => setShowCharter(true)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#12231A] hover:text-[#C5A059] transition-colors cursor-pointer group"
              >
                <span>Read The Biophilic Charter</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Right: Organic Curved Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-[48px] overflow-hidden shadow-2xl border border-[#E7DFD5]">
              <img
                src="/src/assets/images/about_resort_architecture_1793612541007.jpg"
                alt="Kaialuna Sustainable Resort Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Quiet Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FAF8F5]/90 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                    Architectural Integrity
                  </span>
                  <span className="font-serif text-lg font-normal text-[#12231A]">
                    Zero-Concrete Reef Piling
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#12231A] text-[#D4AF37] flex items-center justify-center">
                  <Leaf className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Decorative Subtle Shadow Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full rounded-[48px] border border-[#C5A059]/30 -z-10 pointer-events-none hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Sustainability Charter Modal */}
      <AnimatePresence>
        {showCharter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl p-8 md:p-10 shadow-2xl border border-[#E7DFD5]"
            >
              <button
                onClick={() => setShowCharter(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white text-[#12231A] border border-[#E7DFD5] flex items-center justify-center hover:bg-[#12231A] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Environmental & Heritage Commitment</span>
              </div>

              <h3 className="font-serif text-3xl font-normal text-[#12231A] mb-4">
                The Kaialuna Biophilic Charter
              </h3>

              <div className="space-y-4 text-xs text-[#2C3E35] leading-relaxed font-light">
                <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E7DFD5] space-y-1">
                  <div className="flex items-center gap-2 font-medium text-[#12231A]">
                    <Sun className="w-4 h-4 text-[#C5A059]" />
                    <span>Solar Autonomy & Micro-Grid</span>
                  </div>
                  <p>
                    Over 80% of our daily electrical energy is harvested through integrated solar slate
                    tiles seamlessly merged into pavilion rooftops, paired with silent lithium battery
                    storage.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E7DFD5] space-y-1">
                  <div className="flex items-center gap-2 font-medium text-[#12231A]">
                    <Shield className="w-4 h-4 text-[#C5A059]" />
                    <span>Living Coral Biosphere Reserve</span>
                  </div>
                  <p>
                    Two full-time marine biologists oversee our Coral Nursery Program. Guests can sponsor
                    and monitor individual coral frames planted during their residency.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E7DFD5] space-y-1">
                  <div className="flex items-center gap-2 font-medium text-[#12231A]">
                    <Leaf className="w-4 h-4 text-[#C5A059]" />
                    <span>Zero Single-Use Plastic & On-Atoll Desalination</span>
                  </div>
                  <p>
                    All fresh drinking water is purified on-atoll through solar-assisted reverse osmosis
                    and served in recycled Italian glass carafes.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#12231A]/10 flex justify-end">
                <button
                  onClick={() => setShowCharter(false)}
                  className="px-6 py-2.5 bg-[#12231A] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-[#C5A059] hover:text-[#12231A] transition-colors cursor-pointer"
                >
                  Close Charter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
