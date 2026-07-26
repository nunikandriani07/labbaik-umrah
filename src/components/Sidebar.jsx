import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, BookOpen, Heart, Compass, Camera, 
  MapPin, CheckSquare, Settings, LogOut, X, Sparkles
} from 'lucide-react';

export default function Sidebar({ currentTab, onSelectTab, onLogout, mobileOpen, onCloseMobile }) {
  const { isPremium, countdownDays, checklistProgress } = useApp();

  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Beranda', icon: Home, badge: null },
    { id: 'panduan', label: 'Panduan Ibadah', icon: BookOpen, badge: 'Step-by-Step' },
    { id: 'doa', label: 'Bank Doa Lengkap', icon: Heart, badge: 'Audio' },
    { id: 'perencanaan', label: 'Perencanaan Umroh', icon: Compass, badge: 'Kalkulator' },
    { id: 'spot-foto', label: 'Spot Foto Terbaik', icon: Camera, badge: 'Makkah & Madinah' },
    { id: 'praktis', label: 'Panduan Praktis', icon: MapPin, badge: 'Transport & Darurat' },
    { id: 'tracker', label: 'Tracker Persiapan', icon: CheckSquare, badge: `${checklistProgress}%` },
    { id: 'settings', label: 'Pengaturan', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 animate-fade-in"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 md:z-30 h-screen w-64 bg-[#0D4A28] text-white flex flex-col justify-between 
        border-r border-[#C9A84C]/30 bg-dark-islamic shadow-2xl transition-transform duration-300 ease-in-out shrink-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Header & Brand */}
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-[#1B6B3A]/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#a88632] text-[#0D4A28] flex items-center justify-center font-bold text-lg shadow-md">
                🕌
              </div>
              <div>
                <h2 className="font-extrabold tracking-tight text-white text-base">Labbaik</h2>
                <span className="text-[10px] text-[#C9A84C] font-semibold tracking-wider block -mt-1">
                  TEMAN SETIA UMROH
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {isPremium && (
                <span className="px-2 py-0.5 rounded-md bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C] text-[10px] font-bold">
                  PRO ✨
                </span>
              )}
              {/* Close button for mobile */}
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Departure Countdown Banner */}
          <div className="mx-3 mt-3 p-3 rounded-xl bg-[#1B6B3A]/80 border border-[#C9A84C]/40 text-center shrink-0">
            <p className="text-[11px] text-[#F5E6C8] font-medium">Menuju Tanah Suci 🕋</p>
            <div className="flex items-center justify-center gap-1 my-0.5">
              <span className="text-xl font-black text-[#C9A84C]">H-{countdownDays}</span>
              <span className="text-xs text-emerald-100 font-semibold">Hari Lagi</span>
            </div>
            <div className="w-full bg-[#0D4A28] h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-[#C9A84C] h-full transition-all duration-500" 
                style={{ width: `${checklistProgress}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-emerald-200 block mt-1">Checklist: {checklistProgress}% Siap</span>
          </div>

          {/* Scrollable Navigation Menu (Prevents cutoff on small screens) */}
          <nav className="p-3 space-y-1 mt-2 flex-1 overflow-y-auto scrollbar-thin">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#C9A84C] text-[#0D4A28] font-bold shadow-lg shadow-[#C9A84C]/20 scale-[1.01]' 
                      : 'text-emerald-100/90 hover:bg-[#1B6B3A]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0D4A28]' : 'text-[#C9A84C]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-1 ${
                      isActive ? 'bg-[#0D4A28]/20 text-[#0D4A28]' : 'bg-[#1B6B3A] text-[#C9A84C]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile & Logout (Fixed at bottom) */}
        <div className="p-3 border-t border-[#1B6B3A] shrink-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-rose-950/40 transition text-xs font-semibold"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>
    </>
  );
}
