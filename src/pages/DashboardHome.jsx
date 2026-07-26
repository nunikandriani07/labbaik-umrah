import React from 'react';
import { useApp } from '../context/AppContext';
import { DOA_LIST } from '../data/doaData';
import { 
  BookOpen, Heart, Compass, Camera, 
  CheckCircle2, ArrowRight, Play, Volume2, Sparkles, Clock, Calendar, Lock
} from 'lucide-react';

export default function DashboardHome({ onSelectTab }) {
  const { 
    user, countdownDays, checklistProgress, playAudioTrack, 
    isPlayingAudio, currentAudio, bookmarks, isPremium, setUpgradeModalOpen 
  } = useApp();

  const dailyTip = "Subuh dan jam 23:00 malam adalah waktu terbaik untuk Tawaf dengan tenang tanpa berdesakan. Pastikan tubuh tetap terhidrasi dengan minum 500ml Zamzam sebelum mulai.";
  const featuredDoa = DOA_LIST.find(d => d.id === 'doa-melihat-kabah') || DOA_LIST[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Premium Upgrade Banner for Free Users */}
      {!isPremium && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-[#0D4A28] to-amber-950 text-white border-2 border-[#C9A84C] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A84C] text-[#0D4A28] flex items-center justify-center text-2xl font-bold shrink-0">
              ✨
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Tingkatkan ke Paket Premium Access</h4>
              <p className="text-xs text-amber-200">Buka kalkulator biaya, PDF itinerary, spot foto lengkap & mode offline penuh Rp49.000 sekali bayar.</p>
            </div>
          </div>
          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-[#C9A84C] hover:bg-[#e0be5e] text-[#0D4A28] font-black text-xs shadow-md transition hover:scale-105 shrink-0 flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4" />
            <span>Dapatkan Akses Premium (Rp49.000)</span>
          </button>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0D4A28] via-[#1B6B3A] to-[#0D4A28] text-white p-6 sm:p-8 shadow-xl border border-[#C9A84C]/40 overflow-hidden bg-dark-islamic">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C] text-xs font-semibold">
            <span>🤲 Labbaik Allahumma Labbaik</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Bismillah, {user?.name || 'Jamaah Umroh'} 🤲
          </h2>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Semoga Allah mempermudah setiap langkah persiapan ibadah umrohmu dan mengabulkan segala hajat suci di Tanah Suci.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectTab('panduan')}
              className="px-5 py-2.5 rounded-xl bg-[#C9A84C] text-[#0D4A28] font-bold text-sm hover:bg-[#e0be5e] transition shadow-md flex items-center gap-2"
            >
              <span>Lanjut Panduan Ibadah</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('doa')}
              className="px-5 py-2.5 rounded-xl bg-[#1B6B3A] text-white font-semibold text-sm border border-[#C9A84C]/40 hover:bg-[#0D4A28] transition flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-[#C9A84C]" />
              <span>Buka Bank Doa</span>
            </button>
          </div>
        </div>

        {/* Decorative Kaaba Icon / Motif */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-9xl opacity-20 select-none">
          🕋
        </div>
      </div>

      {/* Grid Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Countdown & Readiness */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Hitung Mundur</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1B6B3A] flex items-center justify-center font-bold">
              🗓️
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-[#0D4A28]">H-{countdownDays}</span>
            <span className="text-xs text-slate-500 font-semibold">Hari Keberangkatan</span>
          </div>
          <p className="text-xs text-slate-600 mb-3">Persiapan dokumen & fisik sudah mencapai <strong>{checklistProgress}%</strong>.</p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#1B6B3A] h-full transition-all duration-500" style={{ width: `${checklistProgress}%` }}></div>
          </div>
        </div>

        {/* Card 2: Interactive Tawaf Shortcut */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Tawaf Counter</span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-[#C9A84C] flex items-center justify-center font-bold">
              🔄
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-1">Siap dipraktikkan saat tawaf:</p>
          <div className="text-2xl font-extrabold text-[#0D4A28] mb-3">
            7 Putaran dengan Audio Doa
          </div>
          <button
            onClick={() => onSelectTab('panduan')}
            className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0D4A28] font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Buka Counter Tawaf</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Saved Favorites */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Doa Tersimpan</span>
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              ❤️
            </span>
          </div>
          <div className="text-3xl font-black text-[#0D4A28] mb-1">
            {bookmarks.length} Doa
          </div>
          <p className="text-xs text-slate-600 mb-3">Siap dibaca offline di Tanah Suci</p>
          <button
            onClick={() => onSelectTab('doa')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
          >
            Lihat Doa Favorit
          </button>
        </div>
      </div>

      {/* Daily Spiritual Tip */}
      <div className="p-6 rounded-2xl bg-[#FBF7F0] border-2 border-[#C9A84C]/40 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#C9A84C] text-[#0D4A28] flex items-center justify-center font-bold text-xl shrink-0">
          💡
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#0D4A28]">Tips Ibadah Hari Ini</h4>
          <p className="text-xs text-slate-700 leading-relaxed">{dailyTip}</p>
        </div>
      </div>

      {/* Recommended Prayer Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#C9A84C]/30 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#0D4A28] font-bold text-xs">Doa Direkomendasikan</span>
            <span className="text-xs text-slate-400">Paling Utama</span>
          </div>
          <button
            onClick={() => playAudioTrack(featuredDoa)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1B6B3A] text-white text-xs font-bold hover:bg-[#0D4A28] transition"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#C9A84C]" />
            <span>Putar Audio Recitation</span>
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#0D4A28]">{featuredDoa.title}</h3>
          <div className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/20 text-right">
            <p className="font-arabic text-2xl text-[#0D4A28] leading-loose dir-rtl">
              {featuredDoa.arabic}
            </p>
          </div>
          <p className="text-xs text-emerald-800 font-semibold italic">{featuredDoa.latin}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{featuredDoa.translation}</p>
        </div>
      </div>
    </div>
  );
}
