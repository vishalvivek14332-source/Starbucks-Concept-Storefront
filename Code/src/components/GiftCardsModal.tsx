import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle2, Copy } from 'lucide-react';

interface GiftCardsModalProps {
  onClose: () => void;
}

export const GiftCardsModal: React.FC<GiftCardsModalProps> = ({ onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('classic');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const cardDesigns = [
    { id: 'classic', label: 'Classic Siren', bg: 'bg-gradient-to-r from-[#006241] to-[#003824]', text: 'Siren Green' },
    { id: 'gold', label: 'Starbucks Gold', bg: 'bg-gradient-to-r from-[#B38728] to-[#FBF5B7]', text: 'Gold Edition' },
    { id: 'holiday', label: 'Berry Sunset', bg: 'bg-gradient-to-r from-[#E04A6F] to-[#7A1D34]', text: 'Berry Edition' },
  ];

  const handleSendCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !recipientEmail) return;
    setIsSent(true);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) || selectedAmount : selectedAmount;
  const giftCardCode = `SBUX-2026-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#072e20] border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#003824]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A862] flex items-center justify-center text-white">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Starbucks eGift Cards</h3>
              <p className="text-xs text-emerald-300">Share a cup of joy instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {isSent ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-[#00A862]/20 text-[#00A862] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">eGift Card Sent!</h4>
              <p className="text-sm text-white/70 max-w-sm mx-auto">
                Your <span className="text-emerald-300 font-bold">${finalAmount}</span> Starbucks eGift card has been dispatched to <span className="text-white font-semibold">{recipientEmail}</span>.
              </p>

              <div className="bg-[#003824] p-4 rounded-2xl border border-white/10 max-w-sm mx-auto space-y-2">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block font-bold">Claim Code</span>
                <div className="flex items-center justify-between bg-black/30 p-2.5 rounded-xl border border-white/10">
                  <span className="font-mono text-sm font-bold tracking-widest text-[#00A862]">{giftCardCode}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(giftCardCode);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1 text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-4 bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendCard} className="space-y-6">
              
              {/* Card Preview Banner */}
              <div className={`p-6 rounded-2xl border border-white/20 shadow-xl relative overflow-hidden transition-all ${
                cardDesigns.find(d => d.id === selectedDesign)?.bg
              }`}>
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span className="font-display font-bold text-lg text-white">STARBUCKS</span>
                  </div>
                  <span className="text-2xl font-extrabold text-white">${finalAmount}</span>
                </div>
                <div className="mt-8 relative z-10 flex justify-between items-end">
                  <span className="text-xs font-medium text-white/90">
                    To: {recipientName || 'Friend'}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">
                    eGift Pass
                  </span>
                </div>
              </div>

              {/* Design Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Choose Card Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {cardDesigns.map((design) => (
                    <button
                      key={design.id}
                      type="button"
                      onClick={() => setSelectedDesign(design.id)}
                      className={`p-3 rounded-xl border text-xs text-center transition-all ${
                        selectedDesign === design.id
                          ? 'bg-[#00A862] border-[#00A862] font-bold text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {design.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Gift Amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl border text-sm font-bold transition-all ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-[#00A862] border-[#00A862] text-white'
                          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00A862]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00A862]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Personal Greeting Message
                </label>
                <input
                  type="text"
                  placeholder="Enjoy coffee on me!"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00A862]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
              >
                <Gift className="w-4 h-4" />
                <span>Send eGift Card (${finalAmount})</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
