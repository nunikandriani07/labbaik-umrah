import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SPOT_FOTO_LIST } from '../data/spotFotoData';
import { 
  Camera, MapPin, Clock, Star, ExternalLink, 
  X, AlertTriangle, Sparkles, Filter, SlidersHorizontal, Lock
} from 'lucide-react';

export default function SpotFotoPage() {
  const { isPremium, setUpgradeModalOpen } = useApp();
  const [selectedCity, setSelectedCity] = useState('all'); // 'all', 'makkah', 'madinah'
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpots = SPOT_FOTO_LIST.filter((spot) => {
    const matchesCity = selectedCity === 'all' || spot.city === selectedCity;
    const matchesSearch = spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spot.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleSpotClick = (spot, idx) => {
    if (!isPremium && idx >= 5) {
      setUpgradeModalOpen(true);
      return;
    }
    setSelectedSpot(spot);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0D4A28] via-[#1B6B3A] to-[#0D4A28] text-white shadow-xl border border-[#C9A84C]/40 relative overflow-hidden bg-dark-islamic">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold border border-[#C9A84C]">
            📸 FITUR EKSKLUSIF
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Abadikan Momen Terbaikmu di Tanah Suci
          </h2>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Tips spot, waktu terbaik, angle kamera, dan setting HP dari fotografer umroh profesional agar momen sekali seumur hidup terabadikan sempurna.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* City Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setSelectedCity('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCity === 'all' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Spot ({SPOT_FOTO_LIST.length})
          </button>
          <button
            onClick={() => setSelectedCity('makkah')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCity === 'makkah' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🕋 Makkah Al-Mukarramah
          </button>
          <button
            onClick={() => setSelectedCity('madinah')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCity === 'madinah' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌿 Madinah Al-Munawwarah
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari spot foto (contoh: Ka'bah, Clock Tower, Kubah Hijau)..."
          className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#C9A84C] bg-white w-full sm:w-72"
        />
      </div>

      {/* Photo Spot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot, idx) => {
          const isLocked = !isPremium && idx >= 5;
          return (
            <div
              key={spot.id}
              onClick={() => handleSpotClick(spot, idx)}
              className={`bg-white rounded-3xl border border-slate-200 shadow-xs transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group relative ${
                isLocked ? 'opacity-85' : 'hover:shadow-lg hover:border-[#C9A84C]'
              }`}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-[#0D4A28]/40 backdrop-blur-xs z-10 flex flex-col items-center justify-center p-4 text-center text-white space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#C9A84C] text-[#0D4A28] flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-amber-300">Spot Foto Premium #{idx + 1}</span>
                  <p className="text-[11px] text-emerald-100">Buka 15+ spot foto lengkap dengan Upgrade Rp49.000</p>
                </div>
              )}

              {/* Image Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0D4A28]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md uppercase tracking-wider border border-[#C9A84C]/40">
                  {spot.city}
                </div>
                <div className="absolute top-3 right-3 bg-amber-400 text-[#0D4A28] text-xs font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{spot.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#0D4A28] transition-colors">
                    {spot.title}
                  </h3>
                  
                  <div className="space-y-1.5 mt-2">
                    <div className="flex items-center gap-2 text-xs text-[#1B6B3A] font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-[#C9A84C]" />
                      <span className="truncate">{spot.bestTime}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                      <span className="line-clamp-1">{spot.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    {spot.tags.slice(0, 2).map((t, index) => <span key={index}>{t}</span>)}
                  </div>
                  <span className="text-xs font-bold text-[#1B6B3A] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Detail Spot →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Spot Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#C9A84C]/40 space-y-6 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#FBF7F0] text-[#0D4A28] border border-[#C9A84C]/30 text-xs font-bold uppercase tracking-wider">
                📍 {selectedSpot.city} Spot Foto
              </span>
              <h2 className="text-2xl font-black text-[#0D4A28]">{selectedSpot.title}</h2>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
                <span>{selectedSpot.location}</span>
              </p>
            </div>

            {/* Large Sample Image */}
            <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 relative">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.title}
                className="w-full h-full object-cover"
              />
              <a
                href={selectedSpot.gps}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#0D4A28] text-[#C9A84C] text-xs font-bold shadow-lg hover:scale-105 transition flex items-center gap-1.5"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Details Breakdown */}
            <div className="space-y-4 text-xs text-slate-700">
              {/* Best Time Reason */}
              <div className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 space-y-1">
                <h4 className="font-bold text-[#0D4A28] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A84C]" />
                  <span>Waktu Terbaik: {selectedSpot.bestTime}</span>
                </h4>
                <p className="text-slate-600 leading-relaxed">{selectedSpot.bestTimeReason}</p>
              </div>

              {/* Angle & Composition Tips */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <h4 className="font-bold text-emerald-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#1B6B3A]" />
                  <span>Tips Angle & Komposisi Kamera</span>
                </h4>
                <p className="text-emerald-950 leading-relaxed">{selectedSpot.angleTips}</p>
              </div>

              {/* HP Settings */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <h4 className="font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Setting Kamera HP yang Direkomendasikan</span>
                </h4>
                <p className="text-amber-950 leading-relaxed">{selectedSpot.cameraSettings}</p>
              </div>

              {/* Warnings */}
              {selectedSpot.warnings && selectedSpot.warnings.length > 0 && (
                <div className="space-y-1 pt-1">
                  {selectedSpot.warnings.map((w, index) => (
                    <p key={index} className="text-rose-700 font-semibold">{w}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
