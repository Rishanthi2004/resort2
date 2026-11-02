import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Waves } from 'lucide-react';
import { RESORT_IMAGES } from '../assets/images';

interface BookingSectionProps {
  onOpenBooking: () => void;
  onReplayIntro?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onOpenBooking, onReplayIntro }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <section id="atmosphere" className="relative w-full overflow-hidden bg-[#0A140F] text-[#FAF8F5]">
      {/* Visual Sanctuary Showcase Hero */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 py-32 overflow-hidden">
        {/* Cinematic Slow-Zoom Twilight Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={RESORT_IMAGES.twilightSanctuary}
            alt="Kaialuna Twilight Sanctuary Atoll"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[14000ms] ease-out hover:scale-110 filter brightness-[0.88]"
          />
          {/* Subtle Golden Dusk Mist & Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A140F] via-black/40 to-[#0A140F]/80" />
        </div>

        {/* Floating 3D Golden Ring Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <div className="relative w-96 h-96 opacity-40">
            {/* Outer golden orbital ring */}
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/60 animate-spin [animation-duration:35s]" />
            <div className="absolute inset-6 rounded-full border border-[#D4AF37]/30 animate-spin [animation-duration:25s] [animation-direction:reverse]" />
            <div className="absolute inset-14 rounded-full border border-dashed border-[#D4AF37]/20 animate-spin [animation-duration:45s]" />
          </div>
        </div>

        {/* Center Editorial Invitation */}
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#FAF8F5]/90">
              Private Reservation Window · 2026 Season
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#FAF8F5] tracking-tight leading-[1.05] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Your Private Escape Awaits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-base md:text-lg text-[#FAF8F5]/80 font-light max-w-2xl mx-auto leading-relaxed mb-12 tracking-wide"
          >
            Thirty-two standalone water and beach residences. Unlimited serenity, tailored Michelin
            dining, and pristine Indian Ocean waters.
          </motion.p>

          {/* Liquid-like Animated Booking CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block"
          >
            <button
              onClick={onOpenBooking}
              className="group relative overflow-hidden px-10 py-5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#12231A] text-xs uppercase tracking-[0.28em] font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#D4AF37]/40 cursor-pointer border border-white/40"
            >
              {/* Liquid Wave Ripple Highlight */}
              <span className="absolute inset-0 w-full h-full bg-white/25 rounded-full filter blur-sm translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-out pointer-events-none" />

              <span className="relative z-10 flex items-center gap-3">
                <span>Reserve Your Villa</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Luxury Footer Contract */}
      <footer className="relative z-20 border-t border-white/10 bg-[#0A140F] py-20 px-6 md:px-12 text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            {/* Col 1: Brand & Identity */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-serif text-3xl font-normal tracking-[0.25em] text-[#FAF8F5] block">
                KAIALUNA
              </span>
              <p className="text-xs text-[#FAF8F5]/60 font-light max-w-sm leading-relaxed">
                An ultra-luxury barefoot sanctuary situated in the North Malé Atoll, Maldives. Thirty-two
                private overwater villas designed in harmony with living coral ecosystems.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-[#C5A059]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span className="tracking-wider uppercase text-[11px]">Certified Biosphere Reserve</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-4">
                The Atoll
              </span>
              <ul className="space-y-2.5 text-xs text-[#FAF8F5]/70 tracking-wider">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About The Sanctuary
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="hover:text-white transition-colors">
                    Resort Experiences
                  </a>
                </li>
                <li>
                  <a href="#villas" className="hover:text-white transition-colors">
                    Private Residences
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Bespoke Services
                  </a>
                </li>
                <li>
                  <a href="#sanctuary-map" className="hover:text-white transition-colors">
                    Island Navigation Map
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact Concierge
                  </a>
                </li>
                {onReplayIntro && (
                  <li>
                    <button
                      onClick={onReplayIntro}
                      className="text-[#C5A059] hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Replay 3D Cinematic Intro
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Col 3: Private Journal & Newsletter Concierge */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-4">
                Sanctuary Gazette
              </span>
              <p className="text-xs text-[#FAF8F5]/60 leading-relaxed font-light">
                Receive private seasonal availability and astronomical calendars directly from our
                concierge.
              </p>

              {subscribed ? (
                <div className="p-3 bg-white/10 rounded-xl border border-[#D4AF37]/40 text-xs text-[#D4AF37]">
                  Thank you. You are on the private sanctuary list.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/20 rounded-full text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#C5A059]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#FAF8F5] text-[#12231A] text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#C5A059] transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Copyright & Telemetry Strip */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/50 tracking-wider">
            <div className="flex items-center gap-2">
              <Waves className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-mono tabular-nums">Atoll Time: 10:45 AM MVT · 29°C Water Calm</span>
            </div>

            <div>
              <span>© {new Date().getFullYear()} Kaialuna Sanctuary Resort. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
