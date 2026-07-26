import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Play, Pause, Plus, CheckCircle, ArrowRight, Star, 
  ChevronDown, ChevronUp, Sparkles, Heart, ShieldCheck, Camera, Compass, CheckSquare
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Interactive Live Preview State inside Landing Page
  const [previewTawafCount, setPreviewTawafCount] = useState(3);
  const [previewAudioPlaying, setPreviewAudioPlaying] = useState(false);
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const FAQS = [
    {
      q: 'Apakah konten doa bisa diakses offline?',
      a: 'Ya! Seluruh teks doa, terjemahan, dan fitur audio recitation dapat diunduh ke HP sehingga dapat digunakan 100% offline saat berada di Masjidil Haram atau Masjid Nabawi tanpa kuota internet.'
    },
    {
      q: 'Apakah audio doa bisa diputar saat layar HP mati?',
      a: 'Sangat bisa! Audio recitation didesain khusus agar tetap berjalan saat layar HP mati atau dimasukkan ke saku pakaian ihram, sehingga Anda bisa fokus khusyu ibadah.'
    },
    {
      q: 'Apakah panduan ibadahnya sesuai dengan tuntunan yang sahih?',
      a: 'Ya, seluruh rukun, tata cara, dan doa disusun berdasarkan Al-Qur\'an dan As-Sunnah yang sahih sesuai dengan mayoritas mazhab (termasuk Mazhab Syafi\'i).'
    },
    {
      q: 'Mengapa bayar sekali Rp 49.000, bukan langganan bulanan?',
      a: 'Karena ibadah umroh bukanlah kebutuhan bulanan. Anda hanya perlu membayar sekali untuk perjalanan umroh Anda dan dapat menggunakannya seumur hidup saat berangkat kembali.'
    },
    {
      q: 'Apakah app ini bisa dipakai untuk haji juga?',
      a: 'Tentu saja! Rangkaian dasar seperti Ihram, Tawaf, dan Sa\'i sama persis. Kami juga menyertakan tips ziarah Madinah yang relevan untuk jamaah Haji.'
    },
    {
      q: 'Apakah konten akan diupdate?',
      a: 'Ya, seluruh update fitur, spot foto baru, dan panduan terkini (seperti aturan Nusuk Saudi) diberikan secara gratis seumur hidup.'
    },
    {
      q: 'Bisakah satu akun dipakai untuk seluruh keluarga?',
      a: 'Bisa! Anda cukup mengunduh dan login di HP pasangan atau orang tua Anda agar seluruh keluarga bisa membaca doa dan checklist bersama.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-slate-800 font-sans selection:bg-[#C9A84C]/30 selection:text-[#0D4A28]">
      {/* Sticky Navbar */}
      <Navbar onNavigate={onNavigate} />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-islamic-pattern">
        {/* Floating Stars Decorative */}
        <div className="absolute top-20 left-10 text-3xl opacity-30 animate-pulse">✨</div>
        <div className="absolute top-40 right-12 text-2xl opacity-20 animate-pulse">🕌</div>

        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Pre-headline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5E6C8] border border-[#C9A84C] text-[#0D4A28] text-xs sm:text-sm font-bold shadow-xs">
            <span>🕌</span>
            <span>Panduan umroh terlengkap untuk jamaah Indonesia</span>
          </div>

          {/* Main H1 Headline */}
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

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
            <strong>Labbaik</strong> menemanimu dari persiapan sampai kepulangan — panduan ibadah lengkap dengan doa dan audio, spot foto terbaik, dan perencanaan biaya mandiri.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1B6B3A] hover:bg-[#0D4A28] text-white font-extrabold text-base shadow-xl border border-[#C9A84C]/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <span>Mulai Persiapan Umrohmu — Gratis</span>
              <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
            </button>
            <a
              href="#fitur"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 transition text-center"
            >
              Lihat fitur lengkap →
            </a>
          </div>

          {/* Micro-copy */}
          <p className="text-xs text-slate-500 font-semibold pt-1">
            Gratis untuk fitur utama · Sekali bayar untuk premium
          </p>

          {/* Social Proof */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['H', 'R', 'F', 'A', 'M'].map((letter, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-[#1B6B3A] text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                  {letter}
                </div>
              ))}
            </div>
            <div className="text-left text-xs font-semibold text-slate-700">
              <span>Dipercaya <strong>15.000+</strong> calon jamaah Indonesia</span>
              <div className="flex items-center text-amber-500 text-xs">
                ⭐⭐⭐⭐⭐ <span className="text-slate-500 ml-1 font-bold">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DASHBOARD PREVIEW WIDGET */}
      <section id="preview" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-[#1B6B3A] uppercase tracking-wider">LIVE INTERACTIVE DEMO</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D4A28]">Lihat Labbaik Beraksi</h2>
          <p className="text-xs sm:text-sm text-slate-600">Cobalah mengklik tombol counter dan audio player di bawah ini!</p>
        </div>

        {/* Browser Frame Window */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#C9A84C]/40 overflow-hidden relative">
          {/* Top Address Bar */}
          <div className="bg-[#0D4A28] px-4 py-3 flex items-center justify-between text-white border-b border-[#C9A84C]/30">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
            <div className="px-4 py-1 rounded-full bg-[#1B6B3A] text-[11px] font-mono text-[#C9A84C] border border-[#C9A84C]/30">
              🔒 app.labbaik.com/dashboard
            </div>
            <span className="px-2 py-0.5 rounded bg-[#C9A84C] text-[#0D4A28] text-[10px] font-black uppercase">
              Live Preview ✨
            </span>
          </div>

          {/* Preview Inside Content */}
          <div className="p-6 bg-[#FBF7F0] space-y-6">
            {/* Live Interactive Counter Card */}
            <div className="bg-gradient-to-r from-[#0D4A28] to-[#1B6B3A] text-white p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider block">TAWAF COUNTER LIVE DEMO</span>
                <h3 className="text-xl font-bold">Progress: Step 2 dari 6 — Tawaf</h3>
                <p className="text-xs text-emerald-200">Tekan tombol di kanan untuk menambah putaran secara real-time!</p>
              </div>

              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/20">
                <div className="text-center">
                  <span className="text-4xl font-black text-[#C9A84C]">{previewTawafCount}</span>
                  <span className="text-xs block text-emerald-200 font-bold">/ 7 Lap</span>
                </div>
                <button
                  onClick={() => setPreviewTawafCount((prev) => (prev >= 7 ? 0 : prev + 1))}
                  className="px-4 py-2.5 rounded-xl bg-[#C9A84C] text-[#0D4A28] font-black text-xs hover:scale-105 active:scale-95 transition flex items-center gap-1 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tap Putaran</span>
                </button>
              </div>
            </div>

            {/* Quick Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Doa Audio Quick Access */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D4A28]">Doa Putaran ke-{previewTawafCount}</span>
                  <button
                    onClick={() => setPreviewAudioPlaying(!previewAudioPlaying)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      previewAudioPlaying ? 'bg-amber-400 text-[#0D4A28]' : 'bg-[#1B6B3A] text-white'
                    }`}
                  >
                    {previewAudioPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                    <span>{previewAudioPlaying ? 'Sedang Memutar...' : 'Play Audio'}</span>
                  </button>
                </div>
                <p className="font-arabic text-lg text-right text-[#0D4A28]">
                  سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ
                </p>
                <span className="text-[10px] text-emerald-700 font-bold block">✨ Audio dapat diputar saat layar mati</span>
              </div>

              {/* Spot Foto Preview */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0D4A28]">📸 Spot Foto Terbaik</span>
                  <span className="text-amber-600 font-bold">05:30 WIB</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">Ka\'bah dari Lantai 2 Masjidil Haram</h4>
                <p className="text-[11px] text-slate-500">Cahaya golden hour subuh dari timur, jamaah tawaf rapi.</p>
              </div>

              {/* Cost Estimator Mini */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-[#0D4A28]">💰 Estimasi Biaya Mandiri</span>
                <div className="text-lg font-black text-[#1B6B3A]">Rp 28.500.000 / pax</div>
                <p className="text-[11px] text-slate-500">Jakarta → Makkah 12 Hari • Hotel Bintang 4</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE CITIES BAR */}
      <section className="py-8 bg-[#0D4A28] text-white border-y border-[#C9A84C]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
            Dipercaya calon jamaah dari berbagai kota di Indonesia
          </p>
        </div>
        <div className="flex items-center justify-center gap-8 sm:gap-16 font-extrabold text-sm sm:text-base text-emerald-100 opacity-90">
          <span>📍 JAKARTA</span>
          <span>📍 SURABAYA</span>
          <span>📍 BANDUNG</span>
          <span>📍 MEDAN</span>
          <span>📍 MAKASSAR</span>
          <span>📍 SEMARANG</span>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">TANTANGAN JAMAAH</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0D4A28]">
            Umroh adalah perjalanan sekali seumur hidup. Jangan sampai ada yang terlewat.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xl">
              📖
            </div>
            <h3 className="font-bold text-slate-900 text-base">Panduan Ibadah Tersebar Mana-Mana</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Buku manasik, video YouTube, dan artikel sering membuat bingung. Saat di depan Ka\'bah, panik karena tidak yakin doa mana yang dibaca pada putaran ke-3.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              💰
            </div>
            <h3 className="font-bold text-slate-900 text-base">Biaya Umroh Mandiri Membingungkan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tiket, visa, hotel, transportasi lokal, dan oleh-oleh — berapa total pasti yang harus disiapkan? Sering kaget di Tanah Suci karena tidak ada perencanaan rinci.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
              📸
            </div>
            <h3 className="font-bold text-slate-900 text-base">Momen Indah Terlewat Tanpa Kenangan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Banyak foto Ka\'bah yang blur atau kurang menarik karena tidak tahu waktu terbaik dan sudut pengambilan foto yang tepat.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION TRANSITION (QS. AL-BAQARAH: 196) */}
      <section className="py-16 bg-[#0D4A28] text-white text-center px-4 relative overflow-hidden bg-dark-islamic">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <p className="font-arabic text-3xl sm:text-4xl text-[#C9A84C] leading-loose">
            وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ
          </p>
          <p className="text-sm text-emerald-200 italic">
            "Dan sempurnakanlah ibadah haji dan umrah karena Allah" (QS. Al-Baqarah: 196)
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-white pt-2">
            Labbaik hadir untuk membantu kamu menyempurnakan setiap momennya.
          </h3>
        </div>
      </section>

      {/* 4 FEATURE SHOWCASE SECTIONS */}
      <section id="fitur" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24">
        {/* Fitur 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#0D4A28] text-xs font-bold">Fitur 1 — Panduan Terlengkap</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D4A28]">Panduan ibadah step-by-step dengan audio doa</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dari niat ihram sampai tahallul — semua ada panduannya. Counter tawaf dan sa\'i otomatis, doa lengkap tiap tahap dengan audio yang bisa diputar sambil ibadah saat layar mati.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ Counter tawaf & sa\'i otomatis (0/7)</li>
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ Audio doa dapat berputar di background</li>
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ Teks Arab besar & jernih (Amiri Font)</li>
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ Full mode offline</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#C9A84C]/40 shadow-xl space-y-4">
            <div className="p-4 rounded-2xl bg-[#0D4A28] text-white space-y-2">
              <span className="text-xs text-[#C9A84C] font-bold">DOA TAWAF PUTARAN KE-1</span>
              <p className="font-arabic text-xl text-[#C9A84C] text-right">سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ</p>
              <span className="text-xs text-emerald-200 block italic">Subḥānallāhi wal-ḥamdu lillāh...</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 text-[#0D4A28] text-xs font-bold">
              🔄 Tawaf Counter Active: Lap 3 / 7 Putaran
            </div>
          </div>
        </div>

        {/* Fitur 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="space-y-4 md:order-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">Fitur 2 — Fitur Eksklusif</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D4A28]">Abadikan momen terbaik di tempat yang tepat</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Panduan 15+ spot foto terbaik di Makkah dan Madinah — lengkap dengan waktu terbaik, tips angle, dan setting kamera HP. Momen sekali seumur hidup harus diabadikan dengan sempurna.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ 15+ spot foto Makkah & Madinah</li>
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ Waktu terbaik per spot (Golden Hour Subuh)</li>
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ Tips angle & kamera HP</li>
              <li className="flex items-center gap-2 text-[#1B6B3A]">✔ Integrasi koordinat Google Maps</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl space-y-3 md:order-1">
            <div className="h-56 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80"
                alt="Kaaba spot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-[#0D4A28]">
              <span>📸 Ka\'bah dari Lantai 2</span>
              <span className="text-[#C9A84C]"> Terbaik: 05:30 WIB</span>
            </div>
          </div>
        </div>

        {/* Fitur 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold">Fitur 3 — Umroh Mandiri</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D4A28]">Ketahui berapa biaya umroh mandirimu sebelum berangkat</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kalkulator biaya umroh mandiri yang komprehensif — tiket, visa, hotel, makan, transportasi, sampai oleh-oleh. Itinerary builder yang bisa dikustomisasi dan diexport PDF.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-3 font-mono text-xs">
            <div className="flex justify-between py-1 border-b">
              <span>✈️ Tiket Pesawat PP</span>
              <span className="font-bold">Rp 14.500.000</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span>🏨 Hotel Makkah (7 mlm)</span>
              <span className="font-bold">Rp 9.800.000</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0D4A28] text-white flex justify-between font-bold">
              <span>TOTAL ESTIMASI</span>
              <span className="text-[#C9A84C]">Rp 28.500.000</span>
            </div>
          </div>
        </div>

        {/* Fitur 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="space-y-4 md:order-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#0D4A28] text-xs font-bold">Fitur 4 — Persiapan Matang</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0D4A28]">Checklist persiapan yang tidak akan membiarkanmu lupa apapun</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dari H-6 bulan sampai H-1 hari — semua yang perlu disiapkan ada di sini. Countdown keberangkatan dan catatan perjalanan pribadi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-3 md:order-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-[#1B6B3A]">65%</span>
              <span className="text-xs text-slate-500 font-bold">Kesiapan Berangkat H-47 Hari</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#1B6B3A] h-full w-[65%]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL MASONRY GRID */}
      <section className="py-20 bg-[#FBF7F0] border-t border-[#C9A84C]/20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#1B6B3A] uppercase tracking-wider">KATA JAMAAH</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0D4A28]">Kata Mereka yang Sudah Terbantu Labbaik</h2>
          <p className="text-xs sm:text-sm text-slate-600">15.000+ calon jamaah sudah lebih siap dengan Labbaik</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Large */}
          <div className="md:col-span-2 bg-[#0D4A28] text-white p-8 rounded-3xl shadow-xl space-y-4 border border-[#C9A84C]/40 bg-dark-islamic">
            <div className="flex items-center gap-1 text-amber-400 text-sm">⭐⭐⭐⭐⭐</div>
            <p className="text-sm sm:text-base leading-relaxed text-emerald-100 font-medium">
              "Saya umroh pertama kali tanpa travel agent di usia 55 tahun. Banyak yang bilang terlalu berani, tapi dengan Labbaik saya benar-benar siap. Panduan doanya yang paling membantu — saya bisa dengarkan audio sambil tawaf tanpa harus baca layar. Tawaf 7 putaran lancar tanpa missed satu doa pun. Alhamdulillah."
            </p>
            <div className="pt-2 border-t border-[#1B6B3A] flex items-center justify-between text-xs text-[#C9A84C] font-bold">
              <span>Pak Hendra, 55 tahun</span>
              <span>Umroh Mandiri dari Bandung</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              "Spot foto-nya yang bikin beda! Foto Ka\'bah saya dari lantai 2 setelah subuh hasilnya luar biasa — banyak yang tanya fotografer mana yang motret. Padahal pakai HP biasa, hanya ikuti tipsnya."
            </p>
            <span className="text-xs font-bold text-slate-900 block pt-2 border-t border-slate-100">Bu Fitri, 38 tahun — Jakarta</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              "Kalkulator biayanya sangat membantu. Kami berdua (suami istri) bisa siapkan budget yang tepat — tidak kurang, tidak lebih. Tidak ada kaget-kagetan saat di sana."
            </p>
            <span className="text-xs font-bold text-slate-900 block pt-2 border-t border-slate-100">Pak & Bu Ridwan — Surabaya</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              "Doa-doanya lengkap banget, ada audio-nya juga. Orang tua saya yang tidak terlalu bisa baca Arab sangat terbantu."
            </p>
            <span className="text-xs font-bold text-slate-900 block pt-2 border-t border-slate-100">Mbak Aulia, 29 tahun — Menemani Orang Tua</span>
          </div>
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
              onClick={() => onNavigate('dashboard')}
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
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3.5 rounded-2xl bg-[#C9A84C] hover:bg-[#e0be5e] text-[#0D4A28] font-black text-sm shadow-lg transition hover:scale-105"
            >
              Dapatkan Premium Access (Rp49.000)
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
                className="rounded-2xl border border-slate-200 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-slate-800 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#1B6B3A] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FBF7F0]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0D4A28] via-[#1B6B3A] to-[#0D4A28] text-white text-center px-4 relative overflow-hidden bg-dark-islamic border-t border-[#C9A84C]/40">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C] text-[#C9A84C] text-xs font-bold">
            <span>🤲 UMROH MABRUR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white">Semoga umrohmu mabrur.</h2>
          <p className="text-sm sm:text-base text-emerald-100">Mulai persiapan hari ini — gratis.</p>

          <button
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-4 rounded-2xl bg-[#C9A84C] hover:bg-[#e0be5e] text-[#0D4A28] font-black text-base shadow-2xl transition hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Mulai Persiapan Umrohmu 🕌</span>
          </button>

          <p className="text-xs text-emerald-200/80">Gratis untuk fitur utama · Premium Rp49.000 sekali bayar</p>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
