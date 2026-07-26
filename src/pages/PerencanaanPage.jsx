import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, CheckSquare, Calendar, Printer, Download, 
  Plus, Trash2, ArrowRight, DollarSign, ShieldCheck, Sparkles, Clock, MapPin, Lock
} from 'lucide-react';

export default function PerencanaanPage() {
  const { 
    budgetPlan, setBudgetPlan, 
    checklist, toggleChecklist, checklistProgress,
    isPremium, setUpgradeModalOpen 
  } = useApp();

  const [activeTab, setActiveTab] = useState('biaya'); // 'biaya', 'checklist', 'itinerary'

  // Cost calculation constants (in IDR)
  const calculateCosts = () => {
    const flightCost = budgetPlan.originCity === 'Jakarta' || budgetPlan.originCity === 'Surabaya' ? 14500000 : 16000000;
    const visaCost = 2800000;
    const vaccineCost = 350000;
    
    const makkahNights = Math.ceil(budgetPlan.durationDays * 0.6);
    const madinahNights = budgetPlan.durationDays - makkahNights;

    const ratePerNight = budgetPlan.hotelStar === 5 ? 2500000 : budgetPlan.hotelStar === 4 ? 1400000 : 850000;

    const hotelMakkah = (makkahNights * ratePerNight) / (budgetPlan.paxCount >= 2 ? 2 : 1);
    const hotelMadinah = (madinahNights * ratePerNight) / (budgetPlan.paxCount >= 2 ? 2 : 1);

    const busSholawat = 450000;
    const foodCost = budgetPlan.durationDays * 250000;
    const souvenir = Number(budgetPlan.souvenirBudget) || 3000000;

    const totalPerPerson = flightCost + visaCost + vaccineCost + hotelMakkah + hotelMadinah + busSholawat + foodCost + souvenir;
    const totalGroup = totalPerPerson * budgetPlan.paxCount;
    const monthlySaving6Months = Math.ceil(totalPerPerson / 6);

    return {
      flightCost, visaCost, vaccineCost,
      hotelMakkah, hotelMadinah, makkahNights, madinahNights,
      busSholawat, foodCost, souvenir,
      totalPerPerson, totalGroup, monthlySaving6Months
    };
  };

  const costs = calculateCosts();

  // Print Summary Handler
  const handlePrint = () => {
    if (!isPremium) {
      setUpgradeModalOpen(true);
      return;
    }
    window.print();
  };

  // Preset Itinerary State
  const [itineraryDays, setItineraryDays] = useState([
    { day: 1, title: 'Keberangkatan Jakarta → Jeddah → Makkah', morning: 'Kumpul di Bandara Soekarno Hatta', afternoon: 'Penerbangan ke Jeddah, berniat ihram di Yalamlam', night: 'Tiba di Hotel Makkah, pelaksanaan Tawaf & Sa\'i Umroh ke-1' },
    { day: 2, title: 'Istirahat & Ibadah Mandiri di Masjidil Haram', morning: 'Sholat Dhuha & Tawaf Sunnah', afternoon: 'Membaca Al-Qur\'an di Lantai 2 Masjidil Haram', night: 'Sholat Maghrib & Isya berjamaah di depan Ka\'bah' },
    { day: 3, title: 'Ziarah Kota Makkah', morning: 'Ziarah ke Jabal Nur, Jabal Tsur, & Arafah', afternoon: 'Miqat di Masjid Aisha (Tan\'im) untuk Umroh ke-2', night: 'Tawaf & Sa\'i Umroh ke-2' },
    { day: 4, title: 'Makkah → Madinah Al-Munawwarah', morning: 'Tawaf Wada\' (Tawaf Perpisahan Makkah)', afternoon: 'Perjalanan naik Kereta Cepat Haramain (HHR) ke Madinah', night: 'Check-in Hotel Madinah & Sholat di Masjid Nabawi' },
    { day: 5, title: 'Ziarah Raudhah & Makam Rasulullah ﷺ', morning: 'Masuk Raudhah sesuai jadwal Tasrih Nusuk', afternoon: 'Ziarah Makam Nabi ﷺ & Sahabat', night: 'Dzikir harian di pelataran Masjid Nabawi' },
    { day: 6, title: 'Ziarah Kota Madinah', morning: 'Sholat 2 rakaat di Masjid Quba & Jabal Uhud', afternoon: 'Kunjungan ke Kebun Kurma Madinah', night: 'Belanja oleh-oleh khas Madinah' },
    { day: 7, title: 'Kepulangan Madinah → Jakarta', morning: 'Persiapan packing & check-out hotel', afternoon: 'Menuju Bandara Madinah (MED)', night: 'Penerbangan kembali ke Indonesia' },
  ]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Sub Tab Navigation */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-[#C9A84C]/30 shadow-xs max-w-lg mx-auto no-print">
        <button
          onClick={() => setActiveTab('biaya')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'biaya' ? 'bg-[#0D4A28] text-[#C9A84C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Tab 1: Estimasi Biaya</span>
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'checklist' ? 'bg-[#0D4A28] text-[#C9A84C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Tab 2: Checklist Dokumen</span>
        </button>
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'itinerary' ? 'bg-[#0D4A28] text-[#C9A84C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Tab 3: Itinerary Builder</span>
        </button>
      </div>

      {/* TAB 1: ESTIMASI BIAYA CALCULATOR */}
      {activeTab === 'biaya' && (
        <div className="space-y-8">
          {/* Premium Lock Banner if User is Free */}
          {!isPremium && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 to-[#0D4A28] text-white border-2 border-[#C9A84C] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A84C] text-[#0D4A28] flex items-center justify-center text-xl font-bold shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">Fitur Kalkulator Biaya Terkunci (Versi Gratis)</h4>
                  <p className="text-xs text-amber-200">Upgrade ke Premium Rp49.000 sekali bayar untuk menyesuaikan budget & export PDF.</p>
                </div>
              </div>
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-[#C9A84C] hover:bg-[#e0be5e] text-[#0D4A28] font-black text-xs shadow-md transition hover:scale-105 shrink-0"
              >
                Buka Akses Premium (Rp49.000)
              </button>
            </div>
          )}

          {/* Form & Output Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form Column */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5 no-print">
              <h3 className="text-base font-bold text-[#0D4A28] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#C9A84C]" />
                <span>Input Perencanaan Biaya Umroh Mandiri</span>
              </h3>

              {/* Kota Keberangkatan */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Kota Keberangkatan</label>
                <select
                  value={budgetPlan.originCity}
                  onChange={(e) => setBudgetPlan({ ...budgetPlan, originCity: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#C9A84C]"
                >
                  <option value="Jakarta">Jakarta (CGK)</option>
                  <option value="Surabaya">Surabaya (SUB)</option>
                  <option value="Medan">Medan (KNO)</option>
                  <option value="Bandung">Bandung / Kertajati (KJT)</option>
                  <option value="Makassar">Makassar (UPG)</option>
                  <option value="Semarang">Semarang (SRG)</option>
                </select>
              </div>

              {/* Durasi Hari & Jumlah Orang */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Durasi Perjalanan</label>
                  <select
                    value={budgetPlan.durationDays}
                    onChange={(e) => setBudgetPlan({ ...budgetPlan, durationDays: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#C9A84C]"
                  >
                    <option value={9}>9 Hari (Standard Makkah)</option>
                    <option value={12}>12 Hari (Balanced Makkah-Madinah)</option>
                    <option value={14}>14 Hari (Lengkap Ziarah)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Jumlah Jamaah</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={budgetPlan.paxCount}
                    onChange={(e) => setBudgetPlan({ ...budgetPlan, paxCount: Math.max(1, Number(e.target.value)) })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#C9A84C]"
                  />
                </div>
              </div>

              {/* Pilihan Bintang Hotel */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Pilihan Hotel</label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setBudgetPlan({ ...budgetPlan, hotelStar: star })}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                        budgetPlan.hotelStar === star
                          ? 'bg-[#1B6B3A] text-white border-[#C9A84C]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Bintang {star} ⭐
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Oleh-oleh Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Budget Oleh-oleh & Jajan:</span>
                  <span className="text-[#0D4A28]">Rp {costs.souvenir.toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={10000000}
                  step={500000}
                  value={budgetPlan.souvenirBudget}
                  onChange={(e) => setBudgetPlan({ ...budgetPlan, souvenirBudget: Number(e.target.value) })}
                  className="w-full accent-[#1B6B3A]"
                />
              </div>

              <button
                onClick={handlePrint}
                className="w-full py-3 rounded-xl bg-[#0D4A28] text-[#C9A84C] font-bold text-xs shadow-md hover:bg-[#1B6B3A] transition flex items-center justify-center gap-2"
              >
                {isPremium ? <Printer className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{isPremium ? 'Cetak / Export PDF Estimasi Biaya' : 'Buka PDF Export (Membutuhkan Premium)'}</span>
              </button>
            </div>

            {/* Output Receipt Box (Printable) */}
            <div id="printable-content" className="lg:col-span-7 bg-[#FBF7F0] p-6 sm:p-8 rounded-3xl border-2 border-[#C9A84C]/40 shadow-md space-y-6 relative overflow-hidden">
              {!isPremium && (
                <div className="absolute inset-0 bg-[#FBF7F0]/80 backdrop-blur-xs flex items-center justify-center p-6 text-center z-10">
                  <div className="bg-white p-6 rounded-3xl border border-[#C9A84C] shadow-xl max-w-sm space-y-3">
                    <Lock className="w-8 h-8 text-[#C9A84C] mx-auto" />
                    <h4 className="font-bold text-[#0D4A28] text-sm">Hasil Estimasi Detail Terkunci</h4>
                    <p className="text-xs text-slate-500">Bayar sekali Rp49.000 untuk melihat & mendownload hasil rincian biaya.</p>
                    <button
                      onClick={() => setUpgradeModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-[#C9A84C] text-[#0D4A28] font-bold text-xs shadow-md"
                    >
                      Buka Akses Premium Sekarang
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-[#C9A84C]/30 pb-4">
                <div>
                  <span className="text-xs font-extrabold text-[#0D4A28] tracking-widest uppercase">LABBAIK ESTIMATOR</span>
                  <h3 className="text-xl font-black text-[#0D4A28]">Estimasi Biaya Umroh Mandiri</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-semibold block">{budgetPlan.originCity} • {budgetPlan.durationDays} Hari</span>
                  <span className="text-xs text-[#1B6B3A] font-bold">{budgetPlan.paxCount} Orang Jamaah</span>
                </div>
              </div>

              {/* Itemized Breakdown Table */}
              <div className="space-y-3 font-mono text-xs text-slate-800">
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>✈️ Tiket Pesawat PP ({budgetPlan.originCity})</span>
                  <span className="font-bold">Rp {costs.flightCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>🛂 Visa Umroh & Asuransi Saudi</span>
                  <span className="font-bold">Rp {costs.visaCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>💉 Vaksin Meningitis (Wajib)</span>
                  <span className="font-bold">Rp {costs.vaccineCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>🏨 Hotel Makkah Bintang {budgetPlan.hotelStar} ({costs.makkahNights} Mlm)</span>
                  <span className="font-bold">Rp {costs.hotelMakkah.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>🏨 Hotel Madinah Bintang {budgetPlan.hotelStar} ({costs.madinahNights} Mlm)</span>
                  <span className="font-bold">Rp {costs.hotelMadinah.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>🚌 Transport Bus Sholawat & Kereta Haramain</span>
                  <span className="font-bold">Rp {costs.busSholawat.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>🍽️ Konsumsi / Makan ({budgetPlan.durationDays} Hari)</span>
                  <span className="font-bold">Rp {costs.foodCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-slate-300">
                  <span>🎁 Oleh-oleh & Alokasi Jajan</span>
                  <span className="font-bold">Rp {costs.souvenir.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Total Banner */}
              <div className="p-5 rounded-2xl bg-[#0D4A28] text-white space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">TOTAL ESTIMASI PER ORANG</span>
                  <span className="text-2xl font-black text-[#C9A84C]">Rp {costs.totalPerPerson.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-200 border-t border-[#1B6B3A] pt-2">
                  <span>Total untuk {budgetPlan.paxCount} Orang:</span>
                  <span className="font-bold text-white">Rp {costs.totalGroup.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Savings Goal Box */}
              <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-between text-xs text-emerald-900 font-bold">
                <span>💡 Perlu Menabung selama 6 Bulan:</span>
                <span className="text-base text-[#0D4A28]">Rp {costs.monthlySaving6Months.toLocaleString('id-ID')} / bulan</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHECKLIST DOKUMEN & PERSIAPAN */}
      {activeTab === 'checklist' && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0D4A28]">Checklist Dokumen & Persiapan Umroh</h3>
              <p className="text-xs text-slate-500">Persiapan bertahap dari H-6 bulan hingga H-1 hari keberangkatan.</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#1B6B3A]">{checklistProgress}%</span>
              <span className="text-xs text-slate-400 block font-semibold">Telah Selesai</span>
            </div>
          </div>

          {/* Timeline Phases */}
          <div className="space-y-6">
            {[
              { phase: '📅 H-6 Bulan', items: [
                { id: 'paspor-6b', label: 'Paspor valid minimal 6 bulan dari tanggal kembali', desc: 'Urus di kantor imigrasi terdekat, pastikan nama sesuai KTP' },
                { id: 'foto-paspor-6b', label: 'Foto paspor background putih (50 lembar)', desc: 'Ukuran 4x6 dengan fokus wajah 80%' },
                { id: 'akte-nikah-6b', label: 'Akte nikah / buku nikah (untuk suami istri)', desc: 'Syarat penerbitan visa mahram jika diperlukan' },
                { id: 'kk-6b', label: 'Kartu Keluarga terbaru', desc: 'Pastikan NIK terdaftar di Dukcapil' },
                { id: 'ktp-6b', label: 'KTP yang masih berlaku', desc: 'Format e-KTP fisik' },
              ]},
              { phase: '📅 H-3 Bulan', items: [
                { id: 'travel-visa-3b', label: 'Daftar ke travel agent / urus visa mandiri', desc: 'Visa Umroh elektronik (e-Visa Saudi)' },
                { id: 'tiket-pesawat-3b', label: 'Booking tiket pesawat PP', desc: 'Direct flight Jakarta/Surabaya ke Jeddah/Madinah' },
                { id: 'hotel-makkah-3b', label: 'Booking hotel Makkah', desc: 'Disarankan radius berjalan kaki ke Masjidil Haram' },
                { id: 'hotel-madinah-3b', label: 'Booking hotel Madinah', desc: 'Area pelataran Masjid Nabawi' },
                { id: 'vaksin-meningitis-3b', label: 'Vaksin meningitis (Wajib min. 2 minggu sebelum)', desc: 'Sertifikat vaksinasi Internasional (KIC/ICV)' },
                { id: 'app-nusuk-3b', label: 'Download & Aktivasi Aplikasi Nusuk', desc: 'Wajib untuk booking jadwal masuk Raudhah Madinah' },
              ]},
              { phase: '📅 H-1 Bulan', items: [
                { id: 'pakaian-ihram-1b', label: 'Pakaian ihram (2 set untuk pria)', desc: 'Bahan katun handuk yang menyerap keringat' },
                { id: 'mukena-1b', label: 'Mukena / sajadah ringan (untuk wanita)', desc: 'Bahan parasut tipis praktis dibawa di tas' },
                { id: 'koper-1b', label: 'Koper ukuran sesuai maskapai (max 23-30 kg)', desc: 'Beri penanda pita warna mencolok' },
                { id: 'tas-kecil-1b', label: 'Tas kecil selempang untuk dokumen & HP', desc: 'Untuk dibawa saat tawaf dan sa\'i' },
                { id: 'sandal-nyaman-1b', label: 'Sandal yang nyaman untuk berjalan jauh', desc: 'Bahan karet empuk memperlihatkan mata kaki' },
                { id: 'obat-p3k-1b', label: 'Obat-obatan pribadi + P3K', desc: 'Obat batuk, pereda nyeri, antasida, plaster' },
                { id: 'masker-1b', label: 'Masker pelindung debu & cuaca panas', desc: 'Bawa 1 box isi 50 pcs' },
                { id: 'botol-refill-1b', label: 'Botol minum refill kecil', desc: 'Untuk diisi air Zamzam di dalam masjid' },
              ]},
              { phase: '📅 H-1 Minggu', items: [
                { id: 'cek-jadwal-1w', label: 'Cek ulang jadwal penerbangan & terminal', desc: 'Pastikan jam kumpul di bandara' },
                { id: 'download-doa-1w', label: 'Download semua konten doa offline di Labbaik App', desc: 'Agar bisa diakses tanpa kuota internet' },
                { id: 'charge-powerbank-1w', label: 'Charge penuh Power Bank (Max 20.000 mAh)', desc: 'Sesuai regulasi penerbangan penerbangan internasional' },
                { id: 'konfirmasi-hotel-1w', label: 'Konfirmasi voucher booking hotel Makkah & Madinah', desc: 'Cetak fisik voucher booking' },
                { id: 'beritahu-keluarga-1w', label: 'Beritahu keluarga jadwal keberangkatan & kontak hotel', desc: 'Untuk ketenangan keluarga di tanah air' },
              ]},
              { phase: '📅 H-1 Hari', items: [
                { id: 'dokumen-tas-tangan-1d', label: 'Siapkan semua dokumen asli di tas tangan', desc: 'Paspor, tiket, KTP, dompet' },
                { id: 'timbang-koper-1d', label: 'Timbang koper bagasi', desc: 'Pastikan tidak lebih muatan (overweight)' },
                { id: 'mandi-sunnah-1d', label: 'Mandi sunnah ihram / safar', desc: 'Rapi-rapi sebelum menuju ke bandara' },
                { id: 'sholat-safar-1d', label: 'Sholat sunnah Safar 2 rakaat', desc: 'Berdoa memohon keselamatan perjalanan' },
              ]}
            ].map((section, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-sm font-extrabold text-[#0D4A28] border-b border-slate-100 pb-3">{section.phase}</h4>
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const isChecked = Boolean(checklist[item.id]);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked 
                            ? 'bg-emerald-50/60 border-emerald-300 text-slate-800' 
                            : 'bg-white border-slate-200 hover:border-[#C9A84C]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-5 h-5 rounded border-slate-300 text-[#1B6B3A] focus:ring-[#1B6B3A] mt-0.5"
                        />
                        <div className="flex-1">
                          <p className={`text-xs font-bold ${isChecked ? 'line-through text-emerald-900' : 'text-slate-800'}`}>
                            {item.label}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ITINERARY BUILDER */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0D4A28]">Itinerary Builder (7-12 Hari)</h3>
              <p className="text-xs text-slate-500">Jadwal kegiatan harian dari persiapan, ibadah di Makkah, hingga ziarah Madinah.</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#1B6B3A] text-white font-bold text-xs shadow-md hover:bg-[#0D4A28] transition flex items-center gap-2 no-print"
            >
              {isPremium ? <Printer className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isPremium ? 'Cetak Itinerary' : 'Buka Cetak (Premium)'}</span>
            </button>
          </div>

          {/* Days List */}
          <div className="space-y-4">
            {itineraryDays.map((dayItem) => (
              <div key={dayItem.day} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0D4A28] flex items-center justify-center font-bold text-xs">
                    H-{dayItem.day}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{dayItem.title}</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60">
                    <span className="font-bold text-amber-900 block mb-1">🌅 Pagi Hari:</span>
                    <p className="text-slate-700">{dayItem.morning}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                    <span className="font-bold text-emerald-900 block mb-1">☀️ Siang Hari:</span>
                    <p className="text-slate-700">{dayItem.afternoon}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-200/60">
                    <span className="font-bold text-indigo-900 block mb-1">🌙 Malam Hari:</span>
                    <p className="text-slate-700">{dayItem.night}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
