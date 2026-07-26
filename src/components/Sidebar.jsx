import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, BookOpen, Heart, Compass, Camera, 
  MapPin, CheckSquare, Settings, Award, Sparkles, ChevronRight, LogOut
} from 'lucide-react';

export default function Sidebar({ currentTab, onSelectTab, onLogout }) {
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
    <aside className="w-64 bg-[#0D4A28] text-white flex flex-col justify-between h-screen sticky top-0 border-r border-[#C9A84C]/30 shrink-0 bg-dark-islamic shadow-2xl z-30">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#1B6B3A]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#a88632] text-[#0D4A28] flex items-center justify-center font-bold text-lg shadow-md">
              🕌
            </div>
            <div>
              <h2 className="font-extrabold tracking-tight text-white text-lg">Labbaik</h2>
              <span className="text-[10px] text-[#C9A84C] font-semibold tracking-wider block -mt-1">
                TEMAN SETIA UMROH
              </span>
            </div>
          </div>
          {isPremium && (
            <span className="px-2 py-0.5 rounded-md bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C] text-[10px] font-bold">
              PRO ✨
            </span>
          )}
        </div>

        {/* Departure Countdown Banner */}
        <div className="mx-3 mt-4 p-3 rounded-xl bg-[#1B6B3A]/80 border border-[#C9A84C]/40 text-center">
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

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 mt-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#C9A84C] text-[#0D4A28] font-bold shadow-lg shadow-[#C9A84C]/20 scale-[1.02]' 
                    : 'text-emerald-100/90 hover:bg-[#1B6B3A]/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0D4A28]' : 'text-[#C9A84C]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
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

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-[#1B6B3A]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-rose-950/40 transition text-sm"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </aside>
  );
}
