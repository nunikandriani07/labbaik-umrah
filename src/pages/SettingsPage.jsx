import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Bell, Download, Shield, Save, CheckCircle, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { user, setUser, departureDate, setDepartureDate, isPremium, setUpgradeModalOpen } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [city, setCity] = useState(user?.city || 'Jakarta');
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = () => {
    setUser({ ...user, name, city });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadOfflineBundle = () => {
    if (!isPremium) {
      setUpgradeModalOpen(true);
      return;
    }

    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl">
      {/* Profile Settings */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-[#0D4A28] flex items-center gap-2">
            <User className="w-5 h-5 text-[#C9A84C]" />
            <span>Profil Jamaah Umroh</span>
          </h3>
          <button
            onClick={handleSaveProfile}
            className="px-4 py-2 rounded-xl bg-[#1B6B3A] text-white text-xs font-bold shadow-md hover:bg-[#0D4A28] transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{savedSuccess ? 'Tersimpan! ✅' : 'Simpan Profil'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Nama Lengkap Jamaah / Pasangan</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Kota Asal (Indonesia)</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 font-semibold text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Offline Bundle Downloader */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0D4A28] flex items-center gap-2">
              <Download className="w-5 h-5 text-[#C9A84C]" />
              <span>Download Mode Offline Penuh</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simpan semua panduan ibadah, doa, audio recitation, dan spot foto ke HP agar bisa dibuka tanpa internet di Makkah & Madinah.
            </p>
          </div>

          <button
            onClick={handleDownloadOfflineBundle}
            disabled={downloading || downloaded}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2 ${
              downloaded
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#0D4A28] text-[#C9A84C] hover:bg-[#1B6B3A]'
            }`}
          >
            {isPremium ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{downloading ? 'Mengunduh Konten...' : downloaded ? 'Konten Offline Siap ✅' : isPremium ? 'Download Paket Offline (12 MB)' : 'Buka Akses Offline (Premium)'}</span>
          </button>
        </div>

        {downloaded && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
            ✨ Semua konten doa dan audio berhasil disimpan secara offline di browsermu. Siap digunakan saat di Tanah Suci!
          </div>
        )}
      </div>
    </div>
  );
}
