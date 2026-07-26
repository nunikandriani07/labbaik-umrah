import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, Calendar, Bell, FileText, Phone, Plane, Save, Sparkles 
} from 'lucide-react';

export default function TrackerPage() {
  const { departureDate, setDepartureDate, countdownDays, checklistProgress } = useApp();

  const [flightNo, setFlightNo] = useState('SV-819 (Saudia Direct)');
  const [hotelContact, setHotelContact] = useState('Pullman Zamzam Makkah (+966-12-571-5555)');
  const [personalNotes, setPersonalNotes] = useState('Catatan: Bawa vitamin C ekstra, titip doa untuk anak-anak agar lulus ujian.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveNotes = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Progress & Departure Header Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Readiness Wheel */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-extrabold text-[#0D4A28] uppercase tracking-wider">Tingkat Kesiapan</span>
          
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="60" stroke="#FBF7F0" strokeWidth="12" fill="transparent" />
              <circle
                cx="72" cy="72" r="60"
                stroke="#1B6B3A"
                strokeWidth="12"
                strokeDasharray={376.8}
                strokeDashoffset={376.8 - (376.8 * checklistProgress) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-[#0D4A28]">{checklistProgress}%</span>
              <span className="text-[10px] text-slate-500 font-semibold">Telah Siap</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500">Lengkapi checklist untuk mencapai 100% kesiapan.</p>
        </div>

        {/* Departure Date Selector */}
        <div className="md:col-span-2 bg-gradient-to-r from-[#0D4A28] to-[#1B6B3A] text-white p-8 rounded-3xl border border-[#C9A84C]/40 shadow-md space-y-6 bg-dark-islamic">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">TANGGAL KEBERANGKATAN</span>
              <h3 className="text-2xl font-black text-white">Target Keberangkatan Umroh</h3>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-[#C9A84C]">H-{countdownDays}</span>
              <span className="text-xs text-emerald-200 block font-semibold">Hari Lagi</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <label className="text-xs font-bold text-emerald-200">Atur Tanggal Pergi:</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="p-3 rounded-xl bg-white text-slate-800 font-bold text-sm focus:ring-2 focus:ring-[#C9A84C]"
            />
          </div>
        </div>
      </div>

      {/* Visual Phase Timeline */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[#0D4A28] uppercase tracking-wider">Timeline Visual Per Fase Persiapan</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { phase: 'H-6 Bulan', title: 'Paspor & Dokumen', desc: 'Paspor, foto, buku nikah' },
            { phase: 'H-3 Bulan', title: 'Visa & Booking', desc: 'Tiket, hotel, vaksin, Nusuk' },
            { phase: 'H-1 Bulan', title: 'Perlengkapan', desc: 'Pakaian ihram, mukena, P3K' },
            { phase: 'H-1 Minggu', title: 'Persiapan Akhir', desc: 'Download doa offline, konfirmasi' },
            { phase: 'H-1 Hari', title: 'Keberangkatan', desc: 'Mandi sunnah, sholat safar' },
          ].map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 space-y-1 relative">
              <span className="text-[10px] font-black text-[#1B6B3A] bg-emerald-100 px-2 py-0.5 rounded-md">
                {step.phase}
              </span>
              <h4 className="font-bold text-slate-900 text-sm pt-1">{step.title}</h4>
              <p className="text-xs text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Notes & Flight Log */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-[#0D4A28] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C9A84C]" />
            <span>Catatan Perjalanan & Informasi Kontak</span>
          </h3>
          <button
            onClick={handleSaveNotes}
            className="px-4 py-2 rounded-xl bg-[#1B6B3A] text-white text-xs font-bold shadow-md hover:bg-[#0D4A28] transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{savedSuccess ? 'Tersimpan! ✅' : 'Simpan Catatan'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                <Plane className="w-4 h-4 text-[#1B6B3A]" />
                <span>Info Penerbangan (Kode Tiket / Jam)</span>
              </label>
              <input
                type="text"
                value={flightNo}
                onChange={(e) => setFlightNo(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                <Phone className="w-4 h-4 text-[#1B6B3A]" />
                <span>Kontak Penting Hotel / Travel</span>
              </label>
              <input
                type="text"
                value={hotelContact}
                onChange={(e) => setHotelContact(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Catatan Pribadi & Titipan Doa</label>
            <textarea
              rows={5}
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#C9A84C]"
              placeholder="Tulis titipan doa dari kerabat atau catatan khusus perjalanan di sini..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
