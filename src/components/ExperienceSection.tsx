import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { ResortExperience } from '../types';
import { RESORT_IMAGES } from '../assets/images';

const EXPERIENCES: ResortExperience[] = [
  {
    id: 'villas',
    title: 'Private Luxury Villas',
    subtitle: 'Overwater & Cliff Pavilions',
    description:
      'Engineered with sustainable teak and sun-bleached travertine, each standalone sanctuary cantilevers directly above private coral lagoons with individual freshwater plunge pools.',
    image: RESORT_IMAGES.experienceVilla,
    maskClass: 'mask-organic-arch',
    tag: 'Architectural Seclusion',
    details: {
      hours: '24-Hour Butler & In-Villa Dining',
      setting: 'Private Lagoon Frontage & Sunset Deck',
      feature: '85m² Horizon Plunge Pool & Outdoor Rain Pavilion',
    },
  },
  {
    id: 'infinity-pool',
    title: 'Infinity Pool Experience',
    subtitle: 'Multi-Tiered Azure Oasis',
    description:
      'Perched on natural limestone bluffs, three cascading freshwater basins merge seamlessly into the Indian Ocean horizon, accompanied by submerged teak loungers and private cabanas.',
    image: RESORT_IMAGES.experiencePool,
    maskClass: 'mask-organic-wave',
    tag: 'Horizon Serenity',
    details: {
      hours: '06:00 — 22:00 Daily',
      setting: 'Cliffside Panorama overlooking Coral Atoll',
      feature: 'Submerged Ergonomic Loungers & Coconut Water Sommelier',
    },
  },
  {
    id: 'tropical-dining',
    title: 'Tropical Dining',
    subtitle: 'Michelin-Caliber Culinary Art',
    description:
      'Open-air lantern-lit pavilions nestled in reflecting lily ponds. Daily catch from local artisanal fishermen prepared alongside biodynamic organic produce grown on-atoll.',
    image: RESORT_IMAGES.experienceDining,
    maskClass: 'mask-organic-crest',
    tag: 'Gastronomy & Cellar',
    details: {
      hours: 'Breakfast 07:00 · Dinner 18:30 — 23:00',
      setting: 'Reflection Water Garden Pavilion',
      feature: '1,200-Label Subterranean Champagne & Grand Cru Cellar',
    },
  },
];

interface ExperienceCardProps {
  exp: ResortExperience;
  index: number;
  onSelect: (exp: ResortExperience) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, index, onSelect }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -y / 15,
      y: x / 15,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(exp)}
      className="group relative cursor-pointer flex flex-col will-change-transform"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${
          index % 2 === 1 ? '24px' : '0px'
        })`,
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.6s ease-out',
      }}
    >
      {/* Organic Curved Image Container */}
      <div
        className={`relative w-full aspect-[4/5] overflow-hidden bg-[#E7DFD5] shadow-lg group-hover:shadow-2xl transition-all duration-700 ${exp.maskClass}`}
      >
        <img
          src={exp.image}
          alt={exp.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />

        {/* Shimmer / Glare overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 opacity-60 group-hover:opacity-40 transition-opacity"
        />

        {/* Quiet metadata kicker on hover */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/90">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>{exp.tag}</span>
        </div>

        {/* Bottom Floating Card Bar */}
        <div className="absolute bottom-6 left-6 right-6 z-10 p-4 bg-[#FAF8F5]/90 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm flex items-center justify-between transition-transform duration-500 group-hover:translate-y-[-4px]">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              {exp.subtitle}
            </span>
            <h3 className="font-serif text-xl font-normal text-[#12231A]">
              {exp.title}
            </h3>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#12231A] text-[#FAF8F5] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-[#12231A] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Description Beneath */}
      <div className="pt-6 px-2">
        <p className="text-sm text-[#2C3E35]/80 font-light leading-relaxed">
          {exp.description}
        </p>
      </div>
    </motion.div>
  );
};

export const ExperienceSection: React.FC = () => {
  const [activeExp, setActiveExp] = useState<ResortExperience | null>(null);

  return (
    <section id="experiences" className="relative py-32 px-6 md:px-12 bg-[#F5F2EB]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-[#12231A]/10 pb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-3">
              <span>Curated Encounters</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#12231A] font-light leading-tight">
              Resort Experience
            </h2>
          </div>
          <p className="text-sm text-[#2C3E35]/80 font-light max-w-md leading-relaxed tracking-wide">
            Designed as an intimate dialogue between luxury pavilion architecture and raw tropical
            elements. Every moment is crafted around stillness and presence.
          </p>
        </div>

        {/* 3 Experiences Grid with Asymmetrical Organic Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceCard key={exp.id} exp={exp} index={idx} onSelect={setActiveExp} />
          ))}
        </div>
      </div>

      {/* Experience Deep-Dive Modal */}
      <AnimatePresence>
        {activeExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E7DFD5]"
            >
              <button
                onClick={() => setActiveExp(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#12231A] flex items-center justify-center hover:bg-[#12231A] hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full min-h-[340px]">
                  <img
                    src={activeExp.image}
                    alt={activeExp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
                      {activeExp.tag}
                    </span>
                    <h4 className="font-serif text-2xl font-normal mt-1">{activeExp.title}</h4>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                      {activeExp.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl font-normal text-[#12231A] mt-2 mb-4">
                      {activeExp.title}
                    </h3>
                    <p className="text-sm text-[#2C3E35] font-light leading-relaxed mb-6">
                      {activeExp.description}
                    </p>

                    <div className="space-y-3 border-t border-[#12231A]/10 pt-4 text-xs text-[#2C3E35]">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-medium text-[#12231A]">Schedule: </strong>
                          <span>{activeExp.details.hours}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-medium text-[#12231A]">Setting: </strong>
                          <span>{activeExp.details.setting}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-medium text-[#12231A]">Highlight: </strong>
                          <span>{activeExp.details.feature}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#12231A]/10 flex items-center justify-between">
                    <span className="text-xs text-[#2C3E35]/60 uppercase tracking-[0.15em]">
                      Included for Sanctuary Residents
                    </span>
                    <button
                      onClick={() => {
                        setActiveExp(null);
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-[#12231A] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-[#C5A059] hover:text-[#12231A] transition-colors cursor-pointer"
                    >
                      Inquire Stay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
