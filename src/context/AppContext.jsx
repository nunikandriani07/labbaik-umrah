import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioEngine } from '../services/audioEngine';
import { supabase } from '../services/supabaseClient';

const AppContext = createContext();

const DEFAULT_CHECKLIST = {
  // H-6 Bulan
  'paspor-6b': true,
  'foto-paspor-6b': true,
  'akte-nikah-6b': false,
  'kk-6b': true,
  'ktp-6b': true,
  // H-3 Bulan
  'travel-visa-3b': true,
  'tiket-pesawat-3b': true,
  'hotel-makkah-3b': true,
  'hotel-madinah-3b': true,
  'vaksin-meningitis-3b': false,
  'app-nusuk-3b': true,
  // H-1 Bulan
  'pakaian-ihram-1b': true,
  'mukena-1b': true,
  'koper-1b': true,
  'tas-kecil-1b': true,
  'sandal-nyaman-1b': false,
  'obat-p3k-1b': true,
  'masker-1b': true,
  'botol-refill-1b': true,
  // H-1 Minggu
  'cek-jadwal-1w': false,
  'download-doa-1w': true,
  'charge-powerbank-1w': false,
  'konfirmasi-hotel-1w': true,
  'beritahu-keluarga-1w': true,
  // H-1 Hari
  'dokumen-tas-tangan-1d': false,
  'timbang-koper-1d': false,
  'mandi-sunnah-1d': false,
  'sholat-safar-1d': false,
};

const DEFAULT_BUDGET = {
  originCity: 'Jakarta',
  departureMonth: 'Oktober 2026',
  durationDays: 12,
  paxCount: 2,
  hotelStar: 4,
  souvenirBudget: 3500000,
};

export const AppProvider = ({ children }) => {
  // Real User Session state from Supabase / localStorage fallback
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('labbaik_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [session, setSession] = useState(null);

  // Premium status (Defaults to false for free users)
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('labbaik_is_premium') === 'true';
  });

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  // Departure date state
  const [departureDate, setDepartureDate] = useState(() => {
    const saved = localStorage.getItem('labbaik_departure_date');
    if (saved) return saved;
    const d = new Date();
    d.setDate(d.getDate() + 47);
    return d.toISOString().split('T')[0];
  });

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('labbaik_bookmarks');
    return saved ? JSON.parse(saved) : ['doa-melihat-kabah', 'doa-minum-zamzam', 'doa-tawaf-putaran-1'];
  });

  // Checklist state
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('labbaik_checklist');
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
  });

  // Budget Calculator state
  const [budgetPlan, setBudgetPlan] = useState(() => {
    const saved = localStorage.getItem('labbaik_budget');
    return saved ? JSON.parse(saved) : DEFAULT_BUDGET;
  });

  // Counters state
  const [tawafCounter, setTawafCounter] = useState(3);
  const [saiCounter, setSaiCounter] = useState(2);

  // UI preferences
  const [nightMode, setNightMode] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  // Audio Player State
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);

  // Real Supabase Auth Listener on Mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const u = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Jamaah Umroh',
          email: session.user.email,
          city: session.user.user_metadata?.city || 'Jakarta',
        };
        setUser(u);
        localStorage.setItem('labbaik_user', JSON.stringify(u));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        const u = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Jamaah Umroh',
          email: session.user.email,
          city: session.user.user_metadata?.city || 'Jakarta',
        };
        setUser(u);
        localStorage.setItem('labbaik_user', JSON.stringify(u));
      } else if (_event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('labbaik_user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('labbaik_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('labbaik_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('labbaik_is_premium', isPremium ? 'true' : 'false');
  }, [isPremium]);

  const unlockPremium = () => {
    setIsPremium(true);
    localStorage.setItem('labbaik_is_premium', 'true');
  };

  // Auth Methods - Strict Password Validation
  const loginUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { 
          success: false, 
          error: error.message === 'Invalid login credentials' 
            ? 'Email atau kata sandi yang Anda masukkan salah.' 
            : error.message 
        };
      }
      const u = {
        id: data.user.id,
        name: data.user.user_metadata?.name || email.split('@')[0] || 'Jamaah Umroh',
        email: data.user.email,
        city: 'Jakarta'
      };
      setUser(u);
      return { success: true, user: u };
    } catch (err) {
      return { success: false, error: 'Terjadi kesalahan koneksi. Silakan coba lagi.' };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, city: 'Jakarta' }
        }
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (!data.user) {
        return { success: false, error: 'Gagal membuat akun baru.' };
      }
      const u = {
        id: data.user.id,
        name: name || 'Jamaah Umroh',
        email,
        city: 'Jakarta'
      };
      setUser(u);
      return { success: true, user: u };
    } catch (err) {
      return { success: false, error: 'Gagal mendaftar. Silakan coba lagi.' };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Gagal mengirim instruksi reset kata sandi.' };
    }
  };

  const logoutUser = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.log('Logout:', err);
    }
    setUser(null);
    localStorage.removeItem('labbaik_user');
  };

  // Bookmark actions
  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Checklist actions
  const toggleChecklist = (id) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Audio Player controls
  const playAudioTrack = (track) => {
    if (currentAudio?.id === track.id && isPlayingAudio) {
      audioEngine.stop();
      setIsPlayingAudio(false);
      return;
    }

    setCurrentAudio(track);
    setIsPlayingAudio(true);
    audioEngine.speak(
      track.arabic || track.title,
      'ar-SA',
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const stopAudioTrack = () => {
    audioEngine.stop();
    setIsPlayingAudio(false);
  };

  const changeAudioSpeed = (speed) => {
    setAudioSpeed(speed);
    audioEngine.setRate(speed);
  };

  // Calculate days remaining
  const calculateCountdown = () => {
    if (!departureDate) return 47;
    const target = new Date(departureDate);
    const today = new Date();
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate overall preparation percentage
  const calculateChecklistProgress = () => {
    const total = Object.keys(checklist).length;
    if (total === 0) return 0;
    const completed = Object.values(checklist).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      session,
      loginUser, registerUser, resetPassword, logoutUser,
      isPremium, setIsPremium, unlockPremium,
      upgradeModalOpen, setUpgradeModalOpen,
      departureDate, setDepartureDate,
      bookmarks, toggleBookmark,
      checklist, toggleChecklist,
      budgetPlan, setBudgetPlan,
      tawafCounter, setTawafCounter,
      saiCounter, setSaiCounter,
      nightMode, setNightMode,
      fontSize, setFontSize,
      currentAudio, playAudioTrack, stopAudioTrack, isPlayingAudio,
      audioSpeed, changeAudioSpeed,
      countdownDays: calculateCountdown(),
      checklistProgress: calculateChecklistProgress(),
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
