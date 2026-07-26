import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AudioPlayerBar from './components/AudioPlayerBar';

// Subpages
import DashboardHome from './pages/DashboardHome';
import PanduanPage from './pages/PanduanPage';
import BankDoaPage from './pages/BankDoaPage';
import PerencanaanPage from './pages/PerencanaanPage';
import SpotFotoPage from './pages/SpotFotoPage';
import PanduanPraktisPage from './pages/PanduanPraktisPage';
import TrackerPage from './pages/TrackerPage';
import SettingsPage from './pages/SettingsPage';

function DashboardContainer({ activeTab, onSelectTab, onNavigateHome, onLogout }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome onSelectTab={onSelectTab} />;
      case 'panduan':
        return <PanduanPage />;
      case 'doa':
        return <BankDoaPage />;
      case 'perencanaan':
        return <PerencanaanPage />;
      case 'spot-foto':
        return <SpotFotoPage />;
      case 'praktis':
        return <PanduanPraktisPage />;
      case 'tracker':
        return <TrackerPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome onSelectTab={onSelectTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={activeTab}
        onSelectTab={onSelectTab}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <Header currentTab={activeTab} onNavigateHome={onNavigateHome} />
        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>

      {/* Sticky Audio Player Bar */}
      <AudioPlayerBar />
    </div>
  );
}

function MainApp() {
  const [currentView, setCurrentView] = useState('landing');
  const [dashboardTab, setDashboardTab] = useState('dashboard');
  const { user, logoutUser } = useApp();

  const handleNavigate = (view) => {
    if (view === 'auth') {
      if (user) {
        // If already logged in, redirect directly to dashboard
        setCurrentView('dashboard');
      } else {
        setCurrentView('auth');
      }
    } else if (view.startsWith('dashboard-')) {
      if (!user) {
        // If not logged in, protect route and go to auth
        setCurrentView('auth');
      } else {
        const tab = view.replace('dashboard-', '');
        setDashboardTab(tab);
        setCurrentView('dashboard');
      }
    } else if (view === 'dashboard') {
      if (!user) {
        // If not logged in, protect route and go to auth
        setCurrentView('auth');
      } else {
        setDashboardTab('dashboard');
        setCurrentView('dashboard');
      }
    } else {
      setCurrentView(view);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentView('landing');
  };

  // Guard view state against auth changes
  if (currentView === 'auth' && user) {
    return (
      <DashboardContainer
        activeTab={dashboardTab}
        onSelectTab={(tab) => setDashboardTab(tab)}
        onNavigateHome={() => setCurrentView('landing')}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === 'dashboard') {
    if (!user) {
      return <AuthPage onNavigate={handleNavigate} />;
    }
    return (
      <DashboardContainer
        activeTab={dashboardTab}
        onSelectTab={(tab) => setDashboardTab(tab)}
        onNavigateHome={() => setCurrentView('landing')}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === 'auth') {
    return <AuthPage onNavigate={handleNavigate} />;
  }

  return <LandingPage onNavigate={handleNavigate} />;
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
