import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { 
  CheckCircle, ArrowRight, ShieldCheck, Heart, Sparkles, 
  ChevronDown, BookOpen, Compass, Camera, MapPin, CheckSquare, Star
} from 'lucide-react';

const FAQS = [
  {
    q: 'Apakah aplikasi Labbaik bisa digunakan secara offline di Makkah & Madinah?',
    a: 'Ya, 100%! Semua panduan ibadah, lafadz doa Arab, audio recitation, dan checklist persiapan dapat didownload dan diakses tanpa koneksi internet di Tanah Suci.'
  },
  {
    q: 'Apakah biaya Rp 49.000 berlaku seumur hidup?',
    a: 'Ya, sekali bayar untuk seumur hidup. Tidak ada biaya langganan bulanan atau tahunan tersembunyi.'
  },
  {
    q: 'Bagaimana cara menggunakan fitur counter Tawaf & Sa\'i?',
    a: 'Cukup tekan tombol "+1 Putaran" setiap kali Anda menyelesaikan satu putaran di Masjidil Haram. Aplikasi akan memutar doa putaran tersebut dan memberikan selebrasi saat putaran ke-7 selesai.'
  },
  {
    q: 'Apakah doa-doa di aplikasi ini sudah sesuai sunnah?',
    a: 'Ya, seluruh teks doa Arab, latin, dan terjemahan disadur dari kitab panduan umroh resmi Kementerian Agama RI dan dalil shahih.'
  }
];

export default function LandingPage({ onNavigate }) {
  const { user, setUpgradeModalOpen } = useApp();
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqId(openFaqId === idx ? null : idx);
  };

  const handlePremiumClick = () => {
    if (!user) {
      onNavigate('auth');
    } else {
      setUpgradeModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-slate-800 font-sans selection:bg-[#C9A84C]/30 selection:text-[#0D4A28]">
      {/* Sticky Navbar */}
      <Navbar onNavigate={onNavigate} />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-islamic-pattern">
        <div className="absolute top-20 left-10 text-3xl opacity-30 animate-pulse">✨</div>
        <div className="absolute top-40 right-12 text-2xl opacity-20 animate-pulse">🕌</div>

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5E6C8] border border-[#C9A84C] text-[#0D4A28] text-xs sm:text-sm font-bold shadow-xs">
            <span>🕌</span>
            <span>Panduan umroh terlengkap untuk jamaah Indonesia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0D4A28] tracking-tight leading-[1.15]">
            Setiap langkah di Tanah Suci adalah momen yang{' '}
            <span className="text-[#C9A84C] relative inline-block">
              tak akan terulang.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C9A84C]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>{' '}
            Pastikan kamu siap.
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
            <strong>Labbaik</strong> menemanimu dari persiapan sampai kepulangan — panduan ibadah lengkap dengan doa dan audio, spot foto terbaik, dan perencanaan biaya mandiri.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate(user ? 'dashboard' : 'auth')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1B6B3A] hover:bg-[#0D4A28] text-white font-extrabold text-base shadow-xl border border-[#C9A84C]/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <span>Mulai Persiapan Umrohmu — Gratis</span>
              <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
            </button>
            <a
              href="#harga"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 transition text-center"
            >
              Lihat Paket & Harga →
            </a>
          </div>

          <p className="text-xs text-slate-500 font-semibold pt-1">
            Gratis untuk fitur utama · Sekali bayar Rp49.000 untuk premium seumur hidup
          </p>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="harga" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#1B6B3A] uppercase tracking-wider">INVESTASI IBADAH</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0D4A28]">Investasi Kecil untuk Perjalanan Tak Ternilai</h2>
          <p className="text-xs sm:text-sm text-slate-600">Bayar sekali, pakai seumur hidup saat ibadah</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">PAKET GRATIS</span>
              <h3 className="text-3xl font-black text-slate-900">Rp 0</h3>
              <p className="text-xs text-slate-500">Gratis selamanya untuk fitur utama ibadah.</p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
                <li className="flex items-center gap-2">✔ Panduan ibadah lengkap & 6 tahap</li>
                <li className="flex items-center gap-2">✔ Bank doa lengkap + audio recitation</li>
                <li className="flex items-center gap-2">✔ Checklist dokumen dasar</li>
                <li className="flex items-center gap-2">✔ Panduan praktis Tanah Suci</li>
                <li className="flex items-center gap-2 text-slate-400">✖ Kalkulator estimasi biaya</li>
                <li className="flex items-center gap-2 text-slate-400">✖ Export PDF itinerary</li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate(user ? 'dashboard' : 'auth')}
              className="w-full py-3 rounded-2xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition"
            >
              Mulai Gratis
            </button>
          </div>

          {/* Premium Plan Highlighted Gold */}
          <div className="bg-gradient-to-br from-[#0D4A28] via-[#1B6B3A] to-[#0D4A28] text-white p-8 rounded-3xl shadow-2xl border-2 border-[#C9A84C] flex flex-col justify-between space-y-6 relative overflow-hidden bg-dark-islamic">
            <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#0D4A28] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
              Paling Direkomendasikan ✨
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">PAKET PREMIUM ACCESS</span>
              <div>
                <h3 className="text-4xl font-black text-[#C9A84C]">Rp 49.000</h3>
                <span className="text-xs text-emerald-200 font-bold block mt-1">SEKALI BAYAR — Bukan langganan bulanan!</span>
                <span className="text-[11px] text-amber-300 block italic">"Lebih murah dari satu porsi makan di Makkah"</span>
              </div>

              <ul className="space-y-2.5 text-xs text-emerald-100 pt-4 border-t border-[#1B6B3A]">
                <li className="flex items-center gap-2">✔ Semua fitur Paket Free</li>
                <li className="flex items-center gap-2 text-[#C9A84C] font-bold">✔ Kalkulator estimasi biaya detail</li>
                <li className="flex items-center gap-2 text-[#C9A84C] font-bold">✔ Itinerary builder + Export PDF</li>
                <li className="flex items-center gap-2">✔ 15+ spot foto lengkap Makkah & Madinah</li>
                <li className="flex items-center gap-2">✔ Tracker persiapan lengkap (H-6 Bulan)</li>
                <li className="flex items-center gap-2">✔ Mode offline penuh (download konten)</li>
                <li className="flex items-center gap-2">✔ Update konten seumur hidup</li>
              </ul>
            </div>

            <button
              onClick={handlePremiumClick}
              className="w-full py-3.5 rounded-2xl bg-[#C9A84C] hover:bg-[#e0be5e] text-[#0D4A28] font-black text-sm shadow-lg transition hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#0D4A28]" />
              <span>Dapatkan Akses Premium (Rp49.000) 💳</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#1B6B3A] uppercase tracking-wider">PERTANYAAN UMUM</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0D4A28]">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqId === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100/50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#1B6B3A]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D4A28] text-white py-12 px-4 border-t border-[#C9A84C]/30 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">🕌</span>
          <span className="text-xl font-bold tracking-tight text-white">Labbaik Umrah</span>
        </div>
        <p className="text-xs text-emerald-200 max-w-md mx-auto">
          Teman setia perjalanan umrohmu — dari persiapan sampai pulang.
        </p>
        <p className="text-[11px] text-emerald-300/60 pt-4 border-t border-[#1B6B3A] max-w-xs mx-auto">
          © {new Date().getFullYear()} Labbaik Umrah Indonesia. Hak Cipta Dilindungi.
        </p>
      </footer>
    </div>
  );
}
