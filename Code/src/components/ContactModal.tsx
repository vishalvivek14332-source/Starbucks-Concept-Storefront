import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, MessageSquare, Phone } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Customer Experience',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#072e20] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#003824]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A862] flex items-center justify-center text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Contact Starbucks</h3>
              <p className="text-xs text-emerald-300">We'd love to hear from you</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#00A862]/20 text-[#00A862] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">Message Received!</h4>
              <p className="text-sm text-white/70 max-w-sm mx-auto">
                Thank you for reaching out, <span className="text-emerald-300 font-semibold">{formData.name}</span>. Our Starbucks support baristas will get back to your email within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider"
              >
                Return To Main Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00A862]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00A862]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-[#003824] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00A862]"
                >
                  <option value="Customer Experience">Customer Experience & Feedback</option>
                  <option value="Starbucks Rewards">Starbucks Rewards Support</option>
                  <option value="Store Inquiry">Store Location & Hours</option>
                  <option value="Partnership">Corporate & Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help make your Starbucks experience better?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00A862]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> 1-800-STARBUCKS
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Live Chat 24/7
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
