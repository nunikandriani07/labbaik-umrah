import React from 'react';
import { Heart, ShieldCheck, Mail, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#0D4A28] text-white pt-16 pb-12 border-t border-[#C9A84C]/30 relative overflow-hidden bg-dark-islamic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1B6B3A]">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C] text-[#0D4A28] flex items-center justify-center font-bold text-xl">
                🕌
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">Labbaik</span>
                <span className="text-xs block text-[#C9A84C] font-semibold">TEMAN UMROHMU</span>
              </div>
            </div>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              Teman setia perjalanan umrohmu — dari persiapan mandiri, panduan ibadah audio, hingga kepulangan ke tanah air.
            </p>
            <div className="flex items-center gap-3 text-emerald-300 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B6B3A] text-xs font-semibold text-[#C9A84C] border border-[#C9A84C]/30">
                🤲 Khusyu & Terpercaya
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C9A84C] mb-4">Fitur Aplikasi</h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li><button onClick={() => onNavigate('dashboard-panduan')} className="hover:text-[#C9A84C] transition flex items-center gap-1">Panduan Ibadah Step-by-Step</button></li>
              <li><button onClick={() => onNavigate('dashboard-doa')} className="hover:text-[#C9A84C] transition flex items-center gap-1">Bank Doa & Audio Recitation</button></li>
              <li><button onClick={() => onNavigate('dashboard-perencanaan')} className="hover:text-[#C9A84C] transition flex items-center gap-1">Kalkulator Biaya Umroh</button></li>
              <li><button onClick={() => onNavigate('dashboard-spot-foto')} className="hover:text-[#C9A84C] transition flex items-center gap-1">Spot Foto Makkah & Madinah</button></li>
              <li><button onClick={() => onNavigate('dashboard-tracker')} className="hover:text-[#C9A84C] transition flex items-center gap-1">Checklist Persiapan H-6 Bulan</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C9A84C] mb-4">Panduan & Bantuan</h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li><a href="#faq" className="hover:text-[#C9A84C] transition">Pertanyaan Umum (FAQ)</a></li>
              <li><button onClick={() => onNavigate('dashboard-praktis')} className="hover:text-[#C9A84C] transition">Panduan Bus Sholawat & Transport</button></li>
              <li><button onClick={() => onNavigate('dashboard-praktis')} className="hover:text-[#C9A84C] transition">Kontak Emergency KJRI Jeddah</button></li>
              <li><a href="#harga" className="hover:text-[#C9A84C] transition">Paket Sekali Bayar Rp 49.000</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C9A84C] mb-4">Komitmen Ibadah</h4>
            <p className="text-xs text-emerald-100/70 leading-relaxed mb-4">
              "Semua bacaan doa dan panduan ibadah disusun dari sumber shahih dengan disclaimer untuk dikonsultasikan kepada ustadz/pembimbing."
            </p>
            <div className="p-3 rounded-xl bg-[#1B6B3A]/60 border border-[#C9A84C]/30 text-xs text-emerald-200">
              🇮🇩 Didedikasikan untuk jamaah umroh Indonesia
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>© 2026 Labbaik App. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="font-arabic text-sm text-[#C9A84C] italic">
            وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ
          </p>
        </div>
      </div>
    </footer>
  );
}
