import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Home, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [villaType, setVillaType] = useState('Ocean Water Residence');
  const [guests, setGuests] = useState('2 Guests');
  const [arrivalDate, setArrivalDate] = useState('2026-12-15');
  const [departureDate, setDepartureDate] = useState('2026-12-22');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 2500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl md:rounded-[36px] overflow-hidden shadow-2xl border border-[#E7DFD5]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#12231A] flex items-center justify-center hover:bg-[#12231A] hover:text-white transition-colors cursor-pointer border border-[#E7DFD5]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-8 md:p-10 bg-[#12231A] text-[#FAF8F5] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Sanctuary Concierge</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-normal">
                  Reserve Your Island Stay
                </h3>
                <p className="text-xs text-[#FAF8F5]/70 mt-2 font-light tracking-wide">
                  Limited to thirty-two exclusive pavilions across the atoll.
                </p>
              </div>

              {/* Decorative gold shimmer line */}
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-10">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#12231A] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-3xl text-[#12231A] mb-2 font-normal">
                    Reservation Inquiry Received
                  </h4>
                  <p className="text-sm text-[#2C3E35] max-w-md mx-auto leading-relaxed mb-8">
                    Your dedicated Island Butler has received your request for the{' '}
                    <strong className="font-medium text-[#12231A]">{villaType}</strong>. We will
                    confirm availability and seaplane transfer coordination at{' '}
                    <strong className="font-medium text-[#12231A]">{guestEmail || 'your email'}</strong>{' '}
                    within two hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-[#12231A] text-[#FAF8F5] rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A059] hover:text-[#12231A] transition-colors cursor-pointer"
                  >
                    Return to Sanctuary
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Villa Selection */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-2">
                      Sanctuary Pavilion
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Ocean Water Residence',
                        'Cliffside Sunset Villa',
                        'Coral Lagoon Sanctuary',
                        'Grand Atoll Master Suite',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setVillaType(item)}
                          className={`p-3.5 rounded-2xl text-left border text-xs transition-all cursor-pointer flex items-center justify-between ${
                            villaType === item
                              ? 'bg-[#12231A] text-[#FAF8F5] border-[#12231A]'
                              : 'bg-white text-[#2C3E35] border-[#E7DFD5] hover:border-[#C5A059]'
                          }`}
                        >
                          <span className="font-medium">{item}</span>
                          <Home className="w-4 h-4 opacity-70" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                        Arrival Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={arrivalDate}
                          onChange={(e) => setArrivalDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                        Departure Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059] cursor-pointer"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests (Couple)</option>
                        <option value="3-4 Guests">3-4 Guests (Family)</option>
                        <option value="Private Atoll Buyout">Private Island Buyout</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lord Julian Sterling"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="concierge@luxury.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059]"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#12231A] text-[#FAF8F5] rounded-full text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C5A059] hover:text-[#12231A] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/40"
                    >
                      <span>Request Private Reservation</span>
                      <Send className="w-4 h-4" />
                    </button>
                    <p className="text-center text-[10px] text-[#2C3E35]/60 uppercase tracking-widest mt-3">
                      Direct Butler Line · All Transfers & Custom Dining Included
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
