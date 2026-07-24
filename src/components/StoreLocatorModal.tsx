import React, { useState } from 'react';
import { X, MapPin, Search, Clock, Car, Smartphone, Navigation, Check } from 'lucide-react';
import { STARBUCKS_STORES } from '../data/stores';
import { StoreLocation } from '../types';

interface StoreLocatorModalProps {
  onClose: () => void;
  onSelectStore?: (store: StoreLocation) => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  onClose,
  onSelectStore,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STARBUCKS_STORES[0]);
  const [confirmedStoreId, setConfirmedStoreId] = useState<string | null>('store-1');

  const filteredStores = STARBUCKS_STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#072e20] border border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-white flex flex-col h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#003824]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A862] flex items-center justify-center text-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Starbucks Store Locator</h3>
              <p className="text-xs text-emerald-300">Find stores near you & order ahead</p>
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
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Store list */}
          <div className="md:col-span-6 p-4 sm:p-5 flex flex-col border-r border-white/10 overflow-hidden">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Find city, zip, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#00A862]"
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredStores.map((store) => {
                const isSelected = selectedStore.id === store.id;
                const isSet = confirmedStoreId === store.id;

                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-[#003824] border-[#00A862] ring-1 ring-[#00A862]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm text-white">{store.name}</h4>
                      <span className="text-xs text-[#00A862] font-semibold">{store.distance}</span>
                    </div>

                    <p className="text-xs text-white/70 mt-1">{store.address}, {store.city}, {store.state}</p>

                    <div className="flex items-center gap-3 mt-3 text-[11px] text-white/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#00A862]" /> {store.hours}
                      </span>
                      {store.hasDriveThru && (
                        <span className="flex items-center gap-1 text-emerald-300">
                          <Car className="w-3 h-3" /> Drive-Thru
                        </span>
                      )}
                    </div>

                    {isSet && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-[#00A862]/20 text-[#00A862] font-bold px-2 py-0.5 rounded-md mt-2">
                        <Check className="w-3 h-3" /> Selected Store for Pickup
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Store Map & Action Details */}
          <div className="md:col-span-6 bg-[#0B4530] p-6 flex flex-col justify-between overflow-y-auto">
            
            <div className="space-y-4">
              {/* Simulated Map View Container */}
              <div className="relative w-full h-44 rounded-2xl bg-[#002d1d] border border-white/10 overflow-hidden flex items-center justify-center p-4">
                {/* Background grid lines mimicking a map */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00A862_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Map Pin Indicator */}
                <div className="relative z-10 text-center space-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#00A862] text-white flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                    <MapPin className="w-6 h-6 fill-current" />
                  </div>
                  <span className="block text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    {selectedStore.name}
                  </span>
                </div>
              </div>

              {/* Store Metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Store Status
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full">
                    Open Now
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-white/80">
                  <p className="font-semibold text-white">{selectedStore.address}</p>
                  <p>{selectedStore.city}, {selectedStore.state}</p>
                  <p className="text-white/60">Hours: {selectedStore.hours}</p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-white/80">
                    <Smartphone className="w-3.5 h-3.5 text-[#00A862]" /> Mobile Order & Pay
                  </span>
                  {selectedStore.hasDriveThru && (
                    <span className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-white/80">
                      <Car className="w-3.5 h-3.5 text-[#00A862]" /> Drive-Thru Window
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Set Store Button */}
            <div className="pt-6 border-t border-white/10 mt-auto space-y-2">
              <button
                onClick={() => {
                  setConfirmedStoreId(selectedStore.id);
                  if (onSelectStore) onSelectStore(selectedStore);
                }}
                className="w-full bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Select For Mobile Pickup</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
