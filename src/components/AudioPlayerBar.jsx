import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, X, Volume2, FastForward, Repeat } from 'lucide-react';

export default function AudioPlayerBar() {
  const { currentAudio, isPlayingAudio, playAudioTrack, stopAudioTrack, audioSpeed, changeAudioSpeed } = useApp();

  if (!currentAudio) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-[#0D4A28] text-white p-4 rounded-2xl shadow-2xl z-50 border border-[#C9A84C]/40 backdrop-blur-md transition-all duration-300 animate-slide-up">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0D4A28] shrink-0 font-bold">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#C9A84C] font-semibold tracking-wide uppercase">Memutar Audio Doa</p>
            <h4 className="text-sm font-semibold truncate text-white">{currentAudio.title}</h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Speed Toggle */}
          <button
            onClick={() => changeAudioSpeed(audioSpeed === 1.0 ? 0.8 : 1.0)}
            className="px-2 py-1 text-xs font-bold rounded bg-[#1B6B3A] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D4A28] transition"
            title="Ubah Kecepatan Audio"
          >
            {audioSpeed}x
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => playAudioTrack(currentAudio)}
            className="w-9 h-9 rounded-full bg-[#C9A84C] text-[#0D4A28] flex items-center justify-center font-bold hover:scale-105 transition"
          >
            {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          {/* Close Player */}
          <button
            onClick={stopAudioTrack}
            className="p-1.5 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Background Audio Badge Note */}
      <div className="mt-2 pt-2 border-t border-[#1B6B3A]/60 flex items-center justify-between text-[11px] text-[#F5E6C8]/80">
        <span>✨ Audio tetap berputar saat layar mati</span>
        <span className="text-[#C9A84C]">Mode Khusyu\'</span>
      </div>
    </div>
  );
}
