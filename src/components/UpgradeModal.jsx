import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { X, CheckCircle, ShieldCheck, Sparkles, CreditCard, QrCode, Lock } from 'lucide-react';

export default function UpgradeModal({ isOpen, onClose }) {
  const { unlockPremium } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successPaid, setSuccessPaid] = useState(false);

  if (!isOpen) return null;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessPaid(true);
      unlockPremium();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C9A84C', '#1B6B3A', '#FFFFFF']
      });

      setTimeout(() => {
        onClose();
        setSuccessPaid(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-[#C9A84C]/40 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-[#F5E6C8] text-[#0D4A28] border border-[#C9A84C] text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1B6B3A]" />
            <span>FITUR PREMIUM LABBAIK</span>
          </span>
          <h2 className="text-2xl font-black text-[#0D4A28]">Buka Akses Premium Seumur Hidup</h2>
          <div className="pt-1">
            <span className="text-3xl font-black text-[#C9A84C]">Rp49.000</span>
            <span className="text-xs font-bold text-slate-500 block">SEKALI BAYAR — Bukan langganan bulanan!</span>
          </div>
        </div>

        {/* Features List */}
        <div className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 space-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-bold text-[#0D4A28]">
            <CheckCircle className="w-4 h-4 text-[#1B6B3A] shrink-0" />
            <span>Kalkulator Biaya Umroh Mandiri & Export PDF</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-[#0D4A28]">
            <CheckCircle className="w-4 h-4 text-[#1B6B3A] shrink-0" />
            <span>Itinerary Builder Custom (7-14 Hari) & Cetak Voucher</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-[#0D4A28]">
            <CheckCircle className="w-4 h-4 text-[#1B6B3A] shrink-0" />
            <span>Panduan 15+ Spot Foto Makkah & Madinah Lengkap</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-[#0D4A28]">
            <CheckCircle className="w-4 h-4 text-[#1B6B3A] shrink-0" />
            <span>Mode Offline Penuh (Download Semua Konten ke HP)</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-[#0D4A28]">
            <CheckCircle className="w-4 h-4 text-[#1B6B3A] shrink-0" />
            <span>Update Panduan & Fitur Baru Seumur Hidup</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Pilih Metode Pembayaran Instant:</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'qris', label: 'QRIS / GoPay', icon: QrCode },
              { id: 'bank', label: 'Transfer Bank', icon: CreditCard },
              { id: 'card', label: 'Kartu Kredit', icon: ShieldCheck },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMethod === m.id
                      ? 'bg-[#1B6B3A] text-white border-[#C9A84C]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        {successPaid ? (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-center font-black text-sm text-emerald-900 animate-bounce">
            🎉 Pembayaran Berhasil! Akses Premium Aktif Seumur Hidup.
          </div>
        ) : (
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-[#C9A84C] hover:bg-[#e0be5e] text-[#0D4A28] font-black text-sm shadow-xl transition hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{isProcessing ? 'Memproses Pembayaran QRIS...' : 'Bayar Rp49.000 & Buka Akses Sekarang 💳'}</span>
          </button>
        )}

        <p className="text-[11px] text-slate-400 text-center">
          🔒 Transaksi aman & terverifikasi otomatis.
        </p>
      </div>
    </div>
  );
}
