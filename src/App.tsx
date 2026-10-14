import React, { useState, useEffect } from 'react';
import { ScreenId, SystemSettings, NotificationItem } from './types';
import { INITIAL_SETTINGS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ScreenHome } from './components/ScreenHome';
import { ScreenImport } from './components/ScreenImport';
import { ScreenResults } from './components/ScreenResults';
import { ScreenSettings } from './components/ScreenSettings';
import { ScreenUnitTest } from './components/ScreenUnitTest';

export default function App() {
  // Default to the brand new Accueil dashboard page
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('screen-accueil');
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedDataset, setSelectedDataset] = useState<string>('students_dropout_v2.csv');

  // Handle dark mode toggle
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // system
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className={`min-h-screen flex bg-[#f8f9fc] text-slate-800 ${settings.colorblindMode ? 'colorblind-mode' : ''}`}>
      {/* 1. SIDEBAR FIXE À GAUCHE */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        settings={settings}
      />

      {/* 2. CONTENEUR PRINCIPAL (HEADER + VIEWPORT) */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          selectedDatasetName={selectedDataset || 'students_dropout_v2.csv'}
        />

        <main className="flex-1 flex flex-col min-w-0">
          {currentScreen === 'screen-accueil' && (
            <ScreenHome onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'screen-5504779327101785572' && (
            <ScreenSettings
              settings={settings}
              onUpdateSettings={setSettings}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === 'screen-import' && (
            <ScreenImport
              onNavigate={setCurrentScreen}
              selectedDataset={selectedDataset}
              onSelectDataset={setSelectedDataset}
            />
          )}

          {currentScreen === 'screen-16963338263129267698' && (
            <ScreenResults
              onNavigate={setCurrentScreen}
              datasetName={selectedDataset || 'students_dropout_v2.csv'}
            />
          )}

          {currentScreen === 'screen-test-unitaire' && (
            <ScreenUnitTest
              settings={settings}
              onNavigate={setCurrentScreen}
            />
          )}
        </main>
      </div>
    </div>
  );
}
