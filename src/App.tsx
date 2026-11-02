/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { OpeningIntro } from './components/OpeningIntro';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { VillaShowcase } from './components/VillaShowcase';
import { ServicesSection } from './components/ServicesSection';
import { LocationMapSection } from './components/LocationMapSection';
import { ContactSection } from './components/ContactSection';
import { BookingSection } from './components/BookingSection';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#1A2621] overflow-x-hidden selection:bg-[#C5A059]/25 selection:text-[#12231A]">
      {/* 1. Cinematic 3D Opening Intro */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <OpeningIntro
            key="cinematic-intro"
            onComplete={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      {/* 2. Persistent 3D Floating WebGL Elements (Palm leaves, Sun, Droplets, Butterflies) */}
      <ThreeBackground />

      {/* 3. Luxury Navigation Bar (Strict 3-Zone Contract) */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Main Content Sections with Scroll-Driven Entrances & Parallax */}
      <main className="relative z-10 flex flex-col">
        {/* Section 1: Hero Attraction */}
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Section 2: About Us & Biophilic Heritage */}
        <AboutSection />

        {/* Section 3: Three Resort Experiences */}
        <ExperienceSection />

        {/* Section 4: Luxury Villa Showcase (Exterior to Interior Transition) */}
        <VillaShowcase />

        {/* Section 5: Curated Bespoke Services */}
        <ServicesSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Section 6: Interactive Atoll Location Map & 3D Compass */}
        <LocationMapSection />

        {/* Section 7: Direct Concierge & Contact Desk */}
        <ContactSection />

        {/* Section 8: Final Booking Call to Action & Luxury Atmosphere Footer */}
        <BookingSection
          onOpenBooking={() => setIsBookingOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
        />
      </main>

      {/* Interactive Booking Concierge Drawer/Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
