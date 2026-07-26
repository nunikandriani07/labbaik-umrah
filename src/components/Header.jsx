import React from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, Bell, User, Sparkles } from 'lucide-react';

export default function Header({ currentTab, onNavigateHome }) {
  const { user, nightMode, setNightMode, isPremium, countdownDays } = useApp();

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return { title: 'Beranda Jamaah', sub: 'Ringkasan persiapan & ibadah harian' };
      case 'panduan': return { title: 'Panduan Ibadah Umroh', sub: 'Step-by-step ritual & Ziarah Madinah' };
      case 'doa': return { title: 'Bank Doa Lengkap', sub: 'Lafadz Arab, Latin, Terjemahan & Audio' };
      case 'perencanaan': return { title: 'Perencanaan Umroh Mandiri', sub: 'Kalkulator biaya, checklist & itinerary' };
      case 'spot-foto': return { title: 'Spot Foto Terbaik Tanah Suci', sub: 'Tips lokasi, waktu, & komposisi HP' };
      case 'praktis': return { title: 'Panduan Praktis Tanah Suci', sub: 'Bus Sholawat, cuaca, & darurat' };
      case 'tracker': return { title: 'Tracker Persiapan Umroh', sub: 'Progress visual & timeline keberangkatan' };
      case 'settings': return { title: 'Pengaturan Akun & App', sub: 'Profil & opsi offline mode' };
      default: return { title: 'Labbaik Umrah', sub: 'Teman setia perjalanan umrohmu' };
    }
  };

  const { title, sub } = getPageTitle();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#C9A84C]/20 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-[#0D4A28] flex items-center gap-2">
          <span>{title}</span>
          {isPremium && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5E6C8] text-[#0D4A28] font-bold border border-[#C9A84C]">
              Bismillah
            </span>
          )}
        </h1>
        <p className="text-xs text-slate-500 font-medium">{sub}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Countdown Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FBF7F0] border border-[#C9A84C]/40 text-xs font-semibold text-[#0D4A28]">
          <span>🕋 H-{countdownDays} Berangkat</span>
        </div>

        {/* Night Mode Toggle */}
        <button
          onClick={() => setNightMode(!nightMode)}
          className={`p-2.5 rounded-xl transition ${
            nightMode ? 'bg-[#0D4A28] text-[#C9A84C]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Mode Baca Malam / Terang"
        >
          {nightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#0D4A28] flex items-center justify-center font-bold border border-[#1B6B3A]/30">
            {user?.name ? user.name[0] : 'J'}
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-bold text-slate-800 block truncate max-w-[140px]">{user?.name || 'Jamaah Umroh'}</span>
            <span className="text-[10px] text-emerald-700 font-semibold">{user?.city || 'Indonesia'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
