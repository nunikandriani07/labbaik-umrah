import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TAHAP_UMROH, ZIARAH_MADINAH } from '../data/panduanData';
import { DOA_LIST } from '../data/doaData';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, Circle, Play, RotateCcw, Plus, 
  MapPin, Info, AlertTriangle, ShieldCheck, Heart, ArrowRight, Sparkles, Smartphone, Calendar, Clock
} from 'lucide-react';

export default function PanduanPage() {
  const { 
    tawafCounter, setTawafCounter, 
    saiCounter, setSaiCounter, 
    playAudioTrack, isPlayingAudio, currentAudio 
  } = useApp();

  const [activeStepId, setActiveStepId] = useState(1);
  const [mainTab, setMainTab] = useState('umroh'); // 'umroh' or 'ziarah'
  const [showNusukModal, setShowNusukModal] = useState(false);

  const activeStep = TAHAP_UMROH.find(s => s.id === activeStepId) || TAHAP_UMROH[0];

  // Trigger celebratory confetti on 7th lap completion
  useEffect(() => {
    if (tawafCounter === 7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A84C', '#1B6B3A', '#FBF7F0']
      });
    }
  }, [tawafCounter]);

  useEffect(() => {
    if (saiCounter === 7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A84C', '#1B6B3A', '#FBF7F0']
      });
    }
  }, [saiCounter]);

  // Increment Tawaf Lap
  const handleNextTawaf = () => {
    if (tawafCounter < 7) {
      const nextLap = tawafCounter + 1;
      setTawafCounter(nextLap);
      // Automatically queue audio for that lap if available
      const doaForLap = DOA_LIST.find(d => d.id === `doa-tawaf-putaran-${nextLap}`);
      if (doaForLap) {
        playAudioTrack(doaForLap);
      }
    }
  };

  // Increment Sa'i Journey
  const handleNextSai = () => {
    if (saiCounter < 7) {
      setSaiCounter(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Main Tab Selector */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-[#C9A84C]/30 shadow-xs max-w-md mx-auto">
        <button
          onClick={() => setMainTab('umroh')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            mainTab === 'umroh' ? 'bg-[#0D4A28] text-[#C9A84C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🕋 Rangkaian Umroh (6 Tahap)</span>
        </button>
        <button
          onClick={() => setMainTab('ziarah')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            mainTab === 'ziarah' ? 'bg-[#0D4A28] text-[#C9A84C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🌿 Ziarah Madinah</span>
        </button>
      </div>

      {mainTab === 'umroh' ? (
        <>
          {/* Progress Tracker (6 Tahap) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-[#0D4A28] uppercase tracking-wider">
                Progress Tahapan Ibadah Umroh
              </h3>
              <span className="text-xs font-semibold text-[#1B6B3A] bg-emerald-50 px-3 py-1 rounded-full">
                Tahap {activeStepId} dari 6
              </span>
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
              {TAHAP_UMROH.map((step) => {
                const isActive = step.id === activeStepId;
                const isCompleted = step.id < activeStepId;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between ${
                      isActive 
                        ? 'border-[#C9A84C] bg-[#FBF7F0] ring-2 ring-[#C9A84C]/50 shadow-md scale-102' 
                        : isCompleted
                        ? 'border-emerald-300 bg-emerald-50/50 text-slate-700'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{step.icon}</span>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <p className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-[#0D4A28]' : 'text-slate-700'}`}>
                      {step.id}. {step.title.split('(')[0]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Detailed View */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#C9A84C]/30 shadow-md space-y-8">
            {/* Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E6C8] text-[#0D4A28] text-xs font-bold mb-2">
                  TAHAP {activeStep.id} — {activeStep.subtitle}
                </span>
                <h2 className="text-2xl font-black text-[#0D4A28] flex items-center gap-2">
                  <span>{activeStep.icon}</span>
                  <span>{activeStep.title}</span>
                </h2>
              </div>

              {/* Navigation prev/next */}
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepId === 1}
                  onClick={() => setActiveStepId(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition"
                >
                  ← Tahap Sebelumnya
                </button>
                <button
                  disabled={activeStepId === 6}
                  onClick={() => setActiveStepId(prev => Math.min(6, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-[#1B6B3A] text-white text-xs font-bold shadow-md hover:bg-[#0D4A28] disabled:opacity-40 transition flex items-center gap-1"
                >
                  <span>Tahap Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* STEP 1: MIQAT & NIAT */}
            {activeStep.id === 1 && (
              <div className="space-y-6">
                <p className="text-sm text-slate-700 leading-relaxed">{activeStep.summary}</p>
                
                {/* Miqat Locations */}
                <div>
                  <h4 className="text-sm font-bold text-[#0D4A28] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C9A84C]" />
                    <span>Lokasi Miqat Berdasarkan Rute Keberangkatan</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeStep.miqatLocations.map((loc, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 space-y-1">
                        <span className="text-[10px] font-bold text-[#1B6B3A] bg-emerald-100 px-2 py-0.5 rounded-md">
                          {loc.origin}
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm pt-1">{loc.name}</h5>
                        <p className="text-xs text-slate-500">{loc.dist}</p>
                        <p className="text-xs text-slate-600 italic pt-1">{loc.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Niat Ihram Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0D4A28] to-[#1B6B3A] text-white shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">Bacaan Niat Ihram Umroh</span>
                    <button
                      onClick={() => playAudioTrack({ id: 'niat-ihram', title: 'Niat Ihram Umroh', arabic: activeStep.niatArabic })}
                      className="px-3 py-1.5 rounded-xl bg-[#C9A84C] text-[#0D4A28] text-xs font-bold hover:scale-105 transition flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Putar Audio Niat</span>
                    </button>
                  </div>
                  <p className="font-arabic text-3xl text-[#C9A84C] text-right dir-rtl leading-loose">
                    {activeStep.niatArabic}
                  </p>
                  <p className="text-xs font-bold text-emerald-200 italic">{activeStep.niatLatin}</p>
                  <p className="text-xs text-emerald-100">{activeStep.niatTranslation}</p>
                </div>

                {/* Prohibitions */}
                <div>
                  <h4 className="text-sm font-bold text-rose-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Larangan Selama Berihram (Wajib Dihindari)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {activeStep.laranganIhram.map((lar, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center gap-3 text-xs text-rose-900 font-semibold">
                        <span className="text-lg">{lar.icon}</span>
                        <span>{lar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                  {activeStep.tips}
                </div>
              </div>
            )}

            {/* STEP 2: TAWAF (Interactive Counter & Per-Lap Prayers) */}
            {activeStep.id === 2 && (
              <div className="space-y-8">
                {/* Big Interactive Tawaf Counter */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0D4A28] via-[#1B6B3A] to-[#0D4A28] text-white text-center shadow-xl space-y-6 relative overflow-hidden bg-dark-islamic">
                  <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest block">
                    INTERACTIVE TAWAF COUNTER
                  </span>

                  <div className="inline-flex items-baseline justify-center gap-3">
                    <span className="text-7xl font-black text-[#C9A84C] drop-shadow-md">{tawafCounter}</span>
                    <span className="text-2xl font-bold text-emerald-200">/ 7 Putaran</span>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={handleNextTawaf}
                      disabled={tawafCounter >= 7}
                      className="px-8 py-4 rounded-2xl bg-[#C9A84C] text-[#0D4A28] font-black text-base shadow-lg hover:scale-105 hover:bg-[#e6c467] active:scale-95 disabled:opacity-50 transition flex items-center gap-2"
                    >
                      <Plus className="w-6 h-6 stroke-[3]" />
                      <span>+ Tambah Putaran Tawaf</span>
                    </button>

                    <button
                      onClick={() => setTawafCounter(0)}
                      className="p-4 rounded-2xl bg-white/10 text-emerald-200 hover:bg-white/20 transition"
                      title="Reset Putaran"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>

                  {tawafCounter === 7 && (
                    <div className="p-4 rounded-2xl bg-[#C9A84C] text-[#0D4A28] font-black text-base animate-bounce shadow-lg flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Alhamdulillah! 7 Putaran Tawaf Selesai. Lanjutkan ke Sholat Makam Ibrahim.</span>
                    </div>
                  )}
                </div>

                {/* Per Lap Audio & Prayers List */}
                <div>
                  <h4 className="text-sm font-bold text-[#0D4A28] uppercase tracking-wider mb-4">
                    Doa Khusus Tiap Putaran Tawaf
                  </h4>
                  <div className="space-y-4">
                    {[1,2,3,4,5,6,7].map((lap) => {
                      const lapDoa = DOA_LIST.find(d => d.id === `doa-tawaf-putaran-${lap}`);
                      const isCurrent = tawafCounter === lap;
                      return (
                        <div 
                          key={lap} 
                          className={`p-5 rounded-2xl border transition-all ${
                            isCurrent ? 'bg-[#FBF7F0] border-[#C9A84C] shadow-md ring-2 ring-[#C9A84C]/40' : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                                isCurrent ? 'bg-[#C9A84C] text-[#0D4A28]' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {lap}
                              </span>
                              <h5 className="font-bold text-slate-800 text-sm">Doa Putaran ke-{lap}</h5>
                            </div>

                            {lapDoa && (
                              <button
                                onClick={() => playAudioTrack(lapDoa)}
                                className="px-3 py-1 rounded-xl bg-[#1B6B3A] text-white text-xs font-bold hover:bg-[#0D4A28] transition flex items-center gap-1.5"
                              >
                                <Play className="w-3.5 h-3.5 fill-current text-[#C9A84C]" />
                                <span>Putar Audio</span>
                              </button>
                            )}
                          </div>

                          {lapDoa && (
                            <div className="space-y-2">
                              <p className="font-arabic text-xl text-[#0D4A28] text-right dir-rtl leading-loose">
                                {lapDoa.arabic}
                              </p>
                              <p className="text-xs font-semibold text-emerald-800 italic">{lapDoa.latin}</p>
                              <p className="text-xs text-slate-600">{lapDoa.translation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                    {activeStep.tipsWaktu}
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    {activeStep.tipsKursiRoda}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: SHOLAT MAKAM IBRAHIM */}
            {activeStep.id === 3 && (
              <div className="space-y-6">
                <p className="text-sm text-slate-700 leading-relaxed">{activeStep.summary}</p>

                <div className="p-5 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 space-y-3">
                  <h4 className="font-bold text-[#0D4A28] text-sm">Lokasi & Makna Makam Ibrahim</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{activeStep.lokasi}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#0D4A28] uppercase tracking-wider mb-3">Tata Cara Sholat 2 Rakaat Tawaf</h4>
                  <div className="space-y-2">
                    {activeStep.tataCara.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: MULTAZAM & ZAMZAM */}
            {activeStep.id === 4 && (
              <div className="space-y-6">
                <p className="text-sm text-slate-700 leading-relaxed">{activeStep.summary}</p>

                <div className="p-5 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 space-y-2">
                  <h4 className="font-bold text-[#0D4A28] text-sm">Keutamaan Berdoa di Multazam</h4>
                  <p className="text-xs text-slate-600">{activeStep.multazamGuide}</p>
                </div>

                {/* Zamzam Prayer */}
                <div className="p-6 rounded-2xl bg-[#0D4A28] text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">Doa Minum Air Zamzam</span>
                    <button
                      onClick={() => {
                        const zamzam = DOA_LIST.find(d => d.id === 'doa-minum-zamzam');
                        if (zamzam) playAudioTrack(zamzam);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#C9A84C] text-[#0D4A28] text-xs font-bold hover:scale-105 transition flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Putar Audio Zamzam</span>
                    </button>
                  </div>
                  <p className="font-arabic text-2xl text-[#C9A84C] text-right dir-rtl leading-loose">
                    اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ وَسَقَمٍ
                  </p>
                  <p className="text-xs text-emerald-200 italic">
                    Allāhumma innī as\'aluka \'ilman nāfi\'an wa rizqan wāsi\'an wa shifā\'an min kulli dā\'in wa saqam.
                  </p>
                  <p className="text-xs text-emerald-100">
                    Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang lapang, dan kesembuhan dari segala penyakit.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  {activeStep.tips}
                </div>
              </div>
            )}

            {/* STEP 5: SA'I (Interactive Counter Shafa-Marwa) */}
            {activeStep.id === 5 && (
              <div className="space-y-8">
                {/* Big Interactive Sa'i Counter */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0D4A28] via-[#1B6B3A] to-[#0D4A28] text-white text-center shadow-xl space-y-6 relative overflow-hidden bg-dark-islamic">
                  <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest block">
                    COUNTER PERJALANAN SA'I
                  </span>

                  <div className="inline-flex items-baseline justify-center gap-3">
                    <span className="text-7xl font-black text-[#C9A84C] drop-shadow-md">{saiCounter}</span>
                    <span className="text-2xl font-bold text-emerald-200">/ 7 Perjalanan</span>
                  </div>

                  {/* Odd / Even Indicator */}
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-emerald-200 text-xs font-bold border border-[#C9A84C]/30">
                    {saiCounter === 0 ? 'Mulai dari Bukit Shafa' : saiCounter % 2 !== 0 ? '📍 Posisi Saat Ini: Di Bukit Marwa (Ganjil)' : '📍 Posisi Saat Ini: Di Bukit Shafa (Genap)'}
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={handleNextSai}
                      disabled={saiCounter >= 7}
                      className="px-8 py-4 rounded-2xl bg-[#C9A84C] text-[#0D4A28] font-black text-base shadow-lg hover:scale-105 hover:bg-[#e6c467] active:scale-95 disabled:opacity-50 transition flex items-center gap-2"
                    >
                      <Plus className="w-6 h-6 stroke-[3]" />
                      <span>+ Tambah Perjalanan Sa'i</span>
                    </button>

                    <button
                      onClick={() => setSaiCounter(0)}
                      className="p-4 rounded-2xl bg-white/10 text-emerald-200 hover:bg-white/20 transition"
                      title="Reset Sa'i"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Green Light Zone Alert */}
                <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center gap-3 text-xs text-emerald-900 font-bold">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 animate-ping shrink-0" />
                  <span>{activeStep.greenLightZone}</span>
                </div>
              </div>
            )}

            {/* STEP 6: TAHALLUL */}
            {activeStep.id === 6 && (
              <div className="space-y-6">
                <p className="text-sm text-slate-700 leading-relaxed">{activeStep.summary}</p>
                <div className="p-5 rounded-2xl bg-[#FBF7F0] border border-[#C9A84C]/30 space-y-3">
                  <h4 className="font-bold text-[#0D4A28] text-sm">Tata Cara Tahallul</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activeStep.tataCara.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#C9A84C]">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold">
                  🎉 {activeStep.bolehSetelahTahallul}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* ZIARAH MADINAH TAB */
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0D4A28] to-[#1B6B3A] text-white shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#C9A84C] mb-1">Ziarah Kota Madinah Al-Munawwarah 🌿</h3>
              <p className="text-xs text-emerald-100">Panduan lengkap ziarah Masjid Nabawi, Raudhah, dan tempat bersejarah di Kota Nabi.</p>
            </div>
            <button
              onClick={() => setShowNusukModal(true)}
              className="px-4 py-2 rounded-xl bg-[#C9A84C] text-[#0D4A28] font-bold text-xs hover:bg-amber-300 transition flex items-center gap-1.5 shadow-md"
            >
              <Smartphone className="w-4 h-4" />
              <span>Panduan Nusuk App</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ZIARAH_MADINAH.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:border-[#C9A84C] transition">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>

                {item.bookingNusuk && (
                  <div 
                    onClick={() => setShowNusukModal(true)}
                    className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold cursor-pointer hover:bg-amber-100 transition"
                  >
                    📲 {item.bookingNusuk} (Klik untuk Lihat Panduan)
                  </div>
                )}

                <div className="p-3 rounded-xl bg-[#FBF7F0] border border-[#C9A84C]/20 text-xs text-slate-700 italic">
                  💡 {item.tips}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nusuk Booking Guide Modal */}
      {showNusukModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 border border-[#C9A84C]/40 shadow-2xl relative">
            <button
              onClick={() => setShowNusukModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0D4A28] text-[#C9A84C] flex items-center justify-center text-xl font-bold">
                📱
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0D4A28]">Panduan Booking Raudhah via Nusuk</h3>
                <span className="text-xs text-slate-500">Aplikasi Resmi Pemerintah Arab Saudi</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>Download aplikasi <strong>Nusuk (Official Saudi App)</strong> dari Google Play Store / App Store.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>Buat akun dengan memilih tipe <strong>"Visitor"</strong> lalu masukkan Nomor Paspor & Visa Umroh.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>Pilih menu <strong>"Praying in the Noble Rawdah"</strong> (Pria atau Wanita).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1B6B3A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <span>Pilih tanggal & slot jam kunjungan yang tersedia (berwarna hijau). Simpan barcode Izin Tasrih.</span>
              </div>
            </div>

            <button
              onClick={() => setShowNusukModal(false)}
              className="w-full py-3 rounded-2xl bg-[#0D4A28] text-white font-bold text-xs"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
