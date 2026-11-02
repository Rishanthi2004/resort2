import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Sparkles, HeartPulse, Utensils, Anchor, UserCheck, ArrowRight, X, Check } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  amenities: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'aviation',
    title: 'Private Aviation & Yacht Charter',
    category: 'Arrival & Mobility',
    description:
      'Seamless 25-minute transfer from Velana International Airport (MLE) aboard our bespoke Kaialuna twin-otter seaplane or private 72ft Riva Dolceriva yacht with chilled vintage champagne.',
    icon: Plane,
    amenities: [
      'Private VIP airport departure lounge',
      'VIP baggage transfer directly to villa wardrobe',
      'Custom flight times aligned with global flights',
    ],
  },
  {
    id: 'wellness',
    title: 'Marine Biosphere Wellness & Spa',
    category: 'Holistic Rejuvenation',
    description:
      'Cantilevered glass-bottom treatment suites suspended above turquoise coral beds. Mineral marine therapies, floating Tibetan sound baths, and customized Ayurvedic regimens.',
    icon: HeartPulse,
    amenities: [
      'In-villa sunrise yoga & ocean meditation',
      'Marine collagen & seaweed thermal wraps',
      'Private outdoor herbal hydrotherapy tubs',
    ],
  },
  {
    id: 'gastronomy',
    title: 'Deserted Sandbank Gastronomy',
    category: 'Private Culinary',
    description:
      'Castaway dining experiences on an uninhabited sandbank illuminated solely by lanterns and starlight. Hand-caught local seafood prepared over coconut wood coals by private chefs.',
    icon: Utensils,
    amenities: [
      'Dedicated personal chef and head sommelier',
      '1,200-bottle rare vintage champagne selection',
      'Sunset barefoot cocktail hour with live acoustic harp',
    ],
  },
  {
    id: 'expeditions',
    title: 'Atoll Coral & Marine Expeditions',
    category: 'Ocean Exploration',
    description:
      'Led by our resident marine biologists and PADI Master Scuba Divers. Private access to feeding manta rays, sea turtle sanctuaries, and nocturnal bioluminescent reef snorkels.',
    icon: Anchor,
    amenities: [
      'Submersible sea-scooter guided reef tours',
      'Adopt-a-Coral planting certificate',
      'Private luxury dive dhoni yacht with sun deck',
    ],
  },
  {
    id: 'butler',
    title: 'Dedicated 24/7 Island Butler (Thakuru)',
    category: 'Haute Hospitality',
    description:
      'From the moment your aircraft touches down, your private Island Butler oversees every dimension of your stay: wardrobe curation, excursion scheduling, and midnight dining.',
    icon: UserCheck,
    amenities: [
      'Unpacking & garment steaming upon arrival',
      'Bespoke in-villa mixology & tea ceremony',
      'Discreet round-the-clock WhatsApp & direct line',
    ],
  },
];

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-[#F5F2EB]/70 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-[#12231A]/10 pb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-3">
              <span>03</span>
              <span>·</span>
              <span>Tailored Bespoke Offerings</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#12231A] font-light leading-tight">
              Curated Services
            </h2>
          </div>

          <p className="text-sm text-[#2C3E35]/80 font-light max-w-md leading-relaxed tracking-wide">
            Designed around complete discretion and individuality. Every request is fulfilled by our
            dedicated island concierge with quiet perfection.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedService(srv)}
                className="group p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7DFD5] hover:border-[#C5A059] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#12231A] text-[#D4AF37] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-[#12231A] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                      {srv.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#12231A] mb-3 group-hover:text-[#C5A059] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-[#2C3E35]/80 font-light leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#12231A]/10 flex items-center justify-between text-xs text-[#12231A] font-semibold uppercase tracking-[0.18em]">
                  <span>View Service Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C5A059]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl p-8 md:p-10 shadow-2xl border border-[#E7DFD5]"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white text-[#12231A] border border-[#E7DFD5] flex items-center justify-center hover:bg-[#12231A] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{selectedService.category}</span>
              </div>

              <h3 className="font-serif text-3xl font-normal text-[#12231A] mb-4">
                {selectedService.title}
              </h3>

              <p className="text-sm text-[#2C3E35] font-light leading-relaxed mb-6">
                {selectedService.description}
              </p>

              <div className="space-y-3 p-5 rounded-2xl bg-[#F5F2EB] border border-[#E7DFD5] mb-8">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#12231A] font-semibold block mb-2">
                  Included Privileges
                </span>
                {selectedService.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2C3E35]">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#12231A]/10">
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-xs uppercase tracking-[0.2em] text-[#2C3E35]/60 hover:text-[#12231A] transition-colors cursor-pointer"
                >
                  Return
                </button>

                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 bg-[#12231A] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-[#C5A059] hover:text-[#12231A] transition-colors cursor-pointer shadow-md"
                >
                  Request with Butler
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
