import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, ChevronRight, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const { user, logoutUser } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    onNavigate('landing');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#FBF7F0]/90 backdrop-blur-md shadow-sm border-b border-[#C9A84C]/20 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(user ? 'dashboard' : 'landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B6B3A] to-[#0D4A28] flex items-center justify-center text-white shadow-md border border-[#C9A84C]/40">
              <span className="text-xl">🕌</span>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#0D4A28]">Labbaik</span>
              <span className="text-xs block text-[#C9A84C] font-semibold tracking-wider">TEMAN UMROHMU</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-700">
            <a href="#fitur" className="hover:text-[#1B6B3A] transition">Fitur Utama</a>
            <a href="#preview" className="hover:text-[#1B6B3A] transition">Live Preview</a>
            <a href="#harga" className="hover:text-[#1B6B3A] transition">Biaya & Pricing</a>
            <a href="#faq" className="hover:text-[#1B6B3A] transition">FAQ</a>
          </div>

          {/* CTA Buttons - Adaptive based on User Login Status */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-5 py-2.5 rounded-xl bg-[#1B6B3A] hover:bg-[#0D4A28] text-white font-bold text-xs shadow-md border border-[#C9A84C]/30 flex items-center gap-2 hover:scale-[1.02] transition"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" />
                  <span>Buka Dashboard ({user.name?.split(' ')[0] || 'Jamaah'})</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 rounded-xl text-rose-700 hover:bg-rose-50 font-semibold text-xs transition flex items-center gap-1.5"
                  title="Keluar Sesi Akun"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('auth')}
                  className="px-4 py-2 rounded-xl text-[#0D4A28] font-semibold hover:bg-[#C9A84C]/10 transition text-xs"
                >
                  Masuk
                </button>
                <button
                  onClick={() => onNavigate('auth')}
                  className="px-5 py-2.5 rounded-xl bg-[#1B6B3A] hover:bg-[#0D4A28] text-white font-semibold text-xs shadow-md border border-[#C9A84C]/30 flex items-center gap-2 hover:scale-[1.02] transition"
                >
                  <span>Mulai Gratis</span>
                  <ChevronRight className="w-4 h-4 text-[#C9A84C]" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-200/50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF7F0] border-b border-[#C9A84C]/30 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4 font-medium text-slate-700">
            <a href="#fitur" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200">Fitur Utama</a>
            <a href="#preview" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200">Live Preview</a>
            <a href="#harga" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200">Biaya & Pricing</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-200">FAQ</a>
            
            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onNavigate('dashboard'); }}
                    className="w-full py-2.5 rounded-xl bg-[#1B6B3A] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" />
                    <span>Dashboard ({user.name})</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="w-full py-2.5 rounded-xl border border-rose-300 text-rose-700 font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar Akun</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onNavigate('auth'); }}
                    className="w-full py-2.5 rounded-xl border border-[#1B6B3A] text-[#1B6B3A] font-semibold text-xs"
                  >
                    Masuk Akun
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onNavigate('auth'); }}
                    className="w-full py-2.5 rounded-xl bg-[#1B6B3A] text-white font-semibold text-xs shadow-md"
                  >
                    Mulai Gratis Sekarang
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
