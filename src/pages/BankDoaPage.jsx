import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DOA, DOA_LIST } from '../data/doaData';
import { 
  Search, Heart, Play, Pause, Sun, Moon, 
  Volume2, Type, Sparkles, Filter, Check
} from 'lucide-react';

export default function BankDoaPage() {
  const { 
    bookmarks, toggleBookmark, 
    playAudioTrack, isPlayingAudio, currentAudio,
    nightMode, setNightMode,
    fontSize, setFontSize
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Filter prayers
  const filteredDoa = DOA_LIST.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = onlyFavorites ? bookmarks.includes(item.id) : true;
    return matchesCategory && matchesSearch && matchesFav;
  });

  // Dynamic Arabic Font Size Class
  const getArabicFontSize = () => {
    switch (fontSize) {
      case 'large': return 'text-3xl leading-loose';
      case 'xlarge': return 'text-4xl leading-[2.2]';
      default: return 'text-2xl leading-relaxed';
    }
  };

  return (
    <div className={`space-y-8 animate-fade-in pb-16 transition-colors duration-300 ${
      nightMode ? 'bg-[#0a1910] text-emerald-100 p-6 rounded-3xl' : ''
    }`}>
      {/* Top Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari doa (contoh: Ka'bah, Zamzam, Tawaf, Safar)..."
            className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] transition ${
              nightMode ? 'bg-[#0D4A28] border-[#1B6B3A] text-white placeholder-emerald-200/60' : 'bg-white border-slate-200 text-slate-800'
            }`}
          />
        </div>

        {/* Action Controls: Font Size & Favorites Toggle & Night Mode */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Font Size Selector */}
          <div className={`flex items-center gap-1 p-1 rounded-2xl border ${nightMode ? 'bg-[#0D4A28] border-[#1B6B3A]' : 'bg-white border-slate-200'}`}>
            <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
              <Type className="w-3.5 h-3.5" />
              <span>Ukuran Font Arab:</span>
            </span>
            {(['normal', 'large', 'xlarge']).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                  fontSize === size ? 'bg-[#C9A84C] text-[#0D4A28]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {size === 'normal' ? '24px' : size === 'large' ? '28px' : '34px'}
              </button>
            ))}
          </div>

          {/* Filter Only Favorites */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition ${
              onlyFavorites 
                ? 'bg-rose-500 text-white border-rose-600 shadow-sm' 
                : nightMode ? 'bg-[#0D4A28] border-[#1B6B3A] text-emerald-200' : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-current' : 'text-rose-500'}`} />
            <span>Favorit ({bookmarks.length})</span>
          </button>

          {/* Night Mode Toggle */}
          <button
            onClick={() => setNightMode(!nightMode)}
            className={`px-3 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition ${
              nightMode ? 'bg-[#C9A84C] text-[#0D4A28] border-[#C9A84C]' : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            {nightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{nightMode ? 'Mode Siang' : 'Mode Malam'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES_DOA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-[#1B6B3A] text-white shadow-md border border-[#C9A84C]/40 scale-105'
                : nightMode
                ? 'bg-[#0D4A28]/80 text-emerald-200 hover:bg-[#0D4A28]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Prayers List */}
      {filteredDoa.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <span className="text-5xl">🤲</span>
          <h3 className="text-base font-bold text-slate-800">Tidak ada doa yang ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba ganti kata kunci pencarian atau pilih kategori doa yang lain.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredDoa.map((doa) => {
            const isFav = bookmarks.includes(doa.id);
            const isPlayingThis = currentAudio?.id === doa.id && isPlayingAudio;

            return (
              <div
                key={doa.id}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 space-y-5 shadow-xs ${
                  nightMode
                    ? 'bg-[#0D4A28]/90 border-[#1B6B3A]'
                    : 'bg-white border-slate-200/90 hover:border-[#C9A84C]'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-1.5 ${
                      nightMode ? 'bg-[#1B6B3A] text-[#C9A84C]' : 'bg-[#FBF7F0] text-[#0D4A28] border border-[#C9A84C]/30'
                    }`}>
                      {doa.category.replace('_', ' ')}
                    </span>
                    <h3 className={`text-lg font-bold ${nightMode ? 'text-white' : 'text-[#0D4A28]'}`}>
                      {doa.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Audio Play Button */}
                    <button
                      onClick={() => playAudioTrack(doa)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
                        isPlayingThis
                          ? 'bg-amber-400 text-[#0D4A28] animate-pulse'
                          : 'bg-[#1B6B3A] text-white hover:bg-[#0D4A28]'
                      }`}
                    >
                      {isPlayingThis ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current text-[#C9A84C]" />}
                      <span>{isPlayingThis ? 'Jeda Audio' : 'Putar Audio'}</span>
                    </button>

                    {/* Bookmark Favorite Button */}
                    <button
                      onClick={() => toggleBookmark(doa.id)}
                      className={`p-2.5 rounded-xl border transition ${
                        isFav 
                          ? 'bg-rose-50 border-rose-200 text-rose-600' 
                          : nightMode ? 'bg-[#1B6B3A]/40 border-[#1B6B3A] text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500'
                      }`}
                      title="Simpan ke Doa Favorit"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Text Display Box */}
                <div className={`p-6 rounded-2xl text-right border transition ${
                  nightMode ? 'bg-[#072413] border-[#1B6B3A]' : 'bg-[#FBF7F0] border-[#C9A84C]/30'
                }`}>
                  <p className={`font-arabic text-[#0D4A28] ${nightMode ? 'text-[#C9A84C]' : ''} ${getArabicFontSize()} dir-rtl select-all`}>
                    {doa.arabic}
                  </p>
                </div>

                {/* Latin Transliteration */}
                <div>
                  <p className={`text-xs font-semibold italic ${nightMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
                    "{doa.latin}"
                  </p>
                </div>

                {/* Indonesian Translation */}
                <div className="pt-2 border-t border-slate-100">
                  <p className={`text-xs leading-relaxed ${nightMode ? 'text-emerald-100/90' : 'text-slate-700'}`}>
                    <strong className="text-slate-900 font-bold block mb-1">Artinya:</strong>
                    {doa.translation}
                  </p>
                </div>

                {/* Virtue & Context */}
                {doa.virtue && (
                  <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    nightMode ? 'bg-[#1B6B3A]/40 text-emerald-200 border border-[#1B6B3A]' : 'bg-amber-50 text-amber-900 border border-amber-200/60'
                  }`}>
                    <Sparkles className="w-4 h-4 shrink-0 text-[#C9A84C] mt-0.5" />
                    <span><strong>Keutamaan / Konteks:</strong> {doa.virtue}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
