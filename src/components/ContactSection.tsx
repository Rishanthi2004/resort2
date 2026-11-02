import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Villa Stay',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep state visible
    }, 3000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'Private Villa Stay',
      message: '',
    });
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-[#12231A]/10 pb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-3">
              <span>05</span>
              <span>·</span>
              <span>Direct Island Dispatch</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#12231A] font-light leading-tight">
              Contact Concierge
            </h2>
          </div>

          <p className="text-sm text-[#2C3E35]/80 font-light max-w-md leading-relaxed tracking-wide">
            Our Head Butler and Island Operations team respond to all international private inquiries
            within two hours.
          </p>
        </div>

        {/* 2-Column Contact Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Coordinates & Direct Lines */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#F5F2EB] border border-[#E7DFD5] space-y-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block">
                Atoll Communications
              </span>

              {/* Phone Line */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#12231A] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-[#2C3E35]/70 uppercase tracking-wider block">
                    Direct Butler Desk
                  </span>
                  <a
                    href="tel:+9606648820"
                    className="font-serif text-xl text-[#12231A] hover:text-[#C5A059] transition-colors"
                  >
                    +960 664 8820
                  </a>
                </div>
              </div>

              {/* Email Line */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#12231A] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-[#2C3E35]/70 uppercase tracking-wider block">
                    Private Island Inquiries
                  </span>
                  <a
                    href="mailto:concierge@kaialuna-resort.com"
                    className="font-serif text-xl text-[#12231A] hover:text-[#C5A059] transition-colors"
                  >
                    concierge@kaialuna-resort.com
                  </a>
                </div>
              </div>

              {/* Island Address & Coordinates */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#12231A] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-[#2C3E35]/70 uppercase tracking-wider block">
                    Geographic Sanctuary
                  </span>
                  <p className="font-serif text-base text-[#12231A]">
                    Kaialuna Island, North Malé Atoll, Republic of Maldives
                  </p>
                  <p className="font-mono text-xs text-[#C5A059] mt-0.5">
                    04°12′22″N · 73°30′14″E
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#12231A]/10">
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] text-[#12231A] flex items-center justify-center shrink-0 border border-[#E7DFD5]">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <span className="text-xs text-[#2C3E35]/70 uppercase tracking-wider block">
                    Concierge Hours
                  </span>
                  <p className="text-xs text-[#12231A] font-medium">
                    24 Hours / 365 Days Global Coverage
                  </p>
                </div>
              </div>
            </div>

            {/* Arrival Notice Box */}
            <div className="p-6 rounded-3xl bg-[#12231A] text-[#FAF8F5] space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Private Aviation Coordination
              </span>
              <p className="text-xs text-[#FAF8F5]/80 font-light leading-relaxed">
                If arriving by private jet or yacht, our operations team coordinates flight clearance,
                waterway docking, and VIP customs clearance prior to arrival.
              </p>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7 p-8 md:p-12 rounded-3xl md:rounded-[40px] bg-[#FAF8F5] border border-[#E7DFD5] shadow-lg">
            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#12231A] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#12231A] font-normal mb-2">
                  Inquiry Dispatched to Head Butler
                </h3>
                <p className="text-sm text-[#2C3E35] max-w-md mx-auto leading-relaxed mb-8">
                  Thank you, <strong className="font-medium text-[#12231A]">{formData.name}</strong>.
                  Our island operations desk will review your inquiry regarding{' '}
                  <strong className="font-medium text-[#12231A]">{formData.inquiryType}</strong> and
                  contact you directly at <strong className="font-medium text-[#12231A]">{formData.email}</strong>.
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#12231A] text-[#FAF8F5] rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A059] hover:text-[#12231A] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#12231A] mb-1">
                    Direct Inquiry Form
                  </h3>
                  <p className="text-xs text-[#2C3E35]/70">
                    Please provide your travel requirements and our concierge will tailor your stay.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lady Vivienne Montgomery"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="vivienne@residence.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059]"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 20 7946 0912"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059] cursor-pointer"
                    >
                      <option value="Private Villa Stay">Private Villa Stay</option>
                      <option value="Full Atoll Buyout">Private Island Buyout</option>
                      <option value="Private Aviation & Yacht Arrival">Private Aviation & Yacht Arrival</option>
                      <option value="Celebration & Wedding">Custom Celebration or Wedding</option>
                      <option value="Biosphere Wellness Retreat">Biosphere Wellness Retreat</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-[#2C3E35] font-medium mb-1.5">
                    Message & Butler Requests
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide anticipated travel dates, guest count, dietary preferences, or private seaplane requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#12231A] focus:outline-none focus:border-[#C5A059] resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#12231A] text-[#FAF8F5] rounded-full text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C5A059] hover:text-[#12231A] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/40"
                >
                  <span>Dispatch Inquiry to Island Concierge</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
