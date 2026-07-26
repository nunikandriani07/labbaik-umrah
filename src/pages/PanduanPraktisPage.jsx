import React, { useState } from 'react';
import { PANDUAN_PRAKTIS } from '../data/panduanPraktisData';
import { 
  Bus, Hospital, Thermometer, ShoppingBag, Smartphone, 
  PhoneCall, ShieldAlert, MapPin, CheckCircle, Info
} from 'lucide-react';

export default function PanduanPraktisPage() {
  const [activeCategory, setActiveCategory] = useState('transport'); // 'transport', 'darurat', 'cuaca', 'belanja', 'teknologi'

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-[#C9A84C]/30 shadow-xs max-w-2xl mx-auto overflow-x-auto">
        <button
          onClick={() => setActiveCategory('transport')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'transport' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>🚌 Transportasi</span>
        </button>
        <button
          onClick={() => setActiveCategory('darurat')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'darurat' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Hospital className="w-4 h-4" />
          <span>🏥 Darurat & KJRI</span>
        </button>
        <button
          onClick={() => setActiveCategory('cuaca')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'cuaca' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          <span>🌡️ Cuaca & Kesehatan</span>
        </button>
        <button
          onClick={() => setActiveCategory('belanja')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'belanja' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>🛍️ Belanja & Kuliner</span>
        </button>
        <button
          onClick={() => setActiveCategory('teknologi')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'teknologi' ? 'bg-[#0D4A28] text-[#C9A84C]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>📱 SIM Card & Maps</span>
        </button>
      </div>

      {/* TRANSPORTASI */}
      {activeCategory === 'transport' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PANDUAN_PRAKTIS.transportasi.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-extrabold text-[#0D4A28] text-base">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.desc}</p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {item.details.map((d, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FBF7F0] border border-[#C9A84C]/20 text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-[#1B6B3A] font-bold">✔</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DARURAT & KJRI */}
      {activeCategory === 'darurat' && (
        <div className="space-y-6">
          {/* Emergency Hotline Banner */}
          <div className="p-6 rounded-3xl bg-rose-900 text-white shadow-md space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-amber-400" />
              <span>Nomor Kontak Darurat Resmi</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {PANDUAN_PRAKTIS.darurat[1].contacts.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/10 border border-white/20">
                  <span className="text-[11px] text-amber-300 font-bold block">{c.label}</span>
                  <a href={`tel:${c.phone}`} className="text-base font-black text-white hover:underline block pt-1">
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0D4A28] text-sm">🏥 Posko Kesehatan Indonesia</h4>
              <p className="text-xs text-slate-600">{PANDUAN_PRAKTIS.darurat[0].desc}</p>
              <div className="space-y-2 pt-2">
                {PANDUAN_PRAKTIS.darurat[0].details.map((d, idx) => (
                  <p key={idx} className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{d}</p>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#0D4A28] text-sm">🗺️ Tips Jika Tersesat di Masjid</h4>
              <p className="text-xs text-slate-600">{PANDUAN_PRAKTIS.darurat[2].desc}</p>
              <div className="space-y-2 pt-2">
                {PANDUAN_PRAKTIS.darurat[2].details.map((d, idx) => (
                  <p key={idx} className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">{d}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUACA & KESEHATAN */}
      {activeCategory === 'cuaca' && (
        <div className="space-y-6">
          {/* Temperature Visual Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-[#0D4A28] text-sm">Visualisasi Suhu Rata-rata Makkah & Madinah Per Bulan</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {PANDUAN_PRAKTIS.cuaca.monthlyTemp.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-600 block">{m.month}</span>
                  <span className="text-lg font-black text-[#0D4A28] block">{m.temp}</span>
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full inline-block">{m.condition}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-bold">
            {PANDUAN_PRAKTIS.cuaca.heatstrokeWarning}
          </div>
        </div>
      )}

      {/* BELANJA & KULINER */}
      {activeCategory === 'belanja' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-[#0D4A28] text-sm">🛍️ Estimasi Harga Oleh-Oleh Wajib</h3>
            <div className="space-y-2">
              {PANDUAN_PRAKTIS.belanja[0].items.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.item}</span>
                  <span className="font-bold text-[#1B6B3A]">{item.est}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-[#0D4A28] text-sm">🍽️ Rekomendasi Kuliner Khas</h3>
            <div className="space-y-3">
              {PANDUAN_PRAKTIS.belanja[1].items.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FBF7F0] border border-[#C9A84C]/20 text-xs space-y-1">
                  <h4 className="font-bold text-[#0D4A28]">{item.name}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TEKNOLOGI & SIM CARD */}
      {activeCategory === 'teknologi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-[#0D4A28] text-sm">📱 Pilihan Kartu SIM Saudi</h3>
            {PANDUAN_PRAKTIS.teknologi[0].options.map((opt, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 text-xs space-y-1">
                <h4 className="font-bold text-[#1B6B3A]">{opt.provider}</h4>
                <p className="text-slate-600">{opt.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-[#0D4A28] text-sm">🗺️ Cara Download Peta Offline Google Maps</h3>
            <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside">
              {PANDUAN_PRAKTIS.teknologi[1].steps.map((step, idx) => (
                <li key={idx} className="p-2.5 rounded-xl bg-[#FBF7F0] border border-[#C9A84C]/20 mb-1">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
