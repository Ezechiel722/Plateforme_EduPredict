import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, NotificationItem } from '../types';

interface TopbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  selectedDatasetName: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentScreen,
  onNavigate,
  notifications,
  onMarkAllNotificationsRead,
  selectedDatasetName,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close notifications popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-[#e2e8f0] sticky top-0 z-30 px-6 sm:px-8 flex items-center justify-between gap-4">
      {/* Fil d'ariane & Contexte */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 truncate">
          <button
            type="button"
            onClick={() => onNavigate('screen-accueil')}
            className="hover:text-blue-600 transition-colors"
          >
            Accueil
          </button>
          <span>/</span>
          {currentScreen === 'screen-accueil' ? (
            <span className="text-slate-700 font-semibold truncate">Vue d'ensemble</span>
          ) : currentScreen === 'screen-5504779327101785572' ? (
            <span className="text-slate-700 font-semibold truncate">Paramètres & Configuration</span>
          ) : currentScreen === 'screen-import' ? (
            <>
              <button
                type="button"
                onClick={() => onNavigate('screen-import')}
                className="hover:text-blue-600 transition-colors"
              >
                Analyse Dataset
              </button>
              <span>/</span>
              <span className="text-slate-700 font-semibold truncate">Cohorte CSV</span>
            </>
          ) : currentScreen === 'screen-16963338263129267698' ? (
            <>
              <button
                type="button"
                onClick={() => onNavigate('screen-import')}
                className="hover:text-blue-600 transition-colors"
              >
                Analyse Dataset
              </button>
              <span>/</span>
              <span className="text-slate-700 font-semibold truncate">Résultats de cohorte</span>
            </>
          ) : (
            <span className="text-slate-700 font-semibold truncate">Test unitaire L2</span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[14px]">calendar_month</span>
            Session Pédagogique 2024-2025 • ESGIS Lomé
          </span>
        </div>
      </div>

      {/* Centre: Prototype Screens Quick Navigation */}
      <div className="hidden xl:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs">
        <button
          type="button"
          onClick={() => onNavigate('screen-accueil')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentScreen === 'screen-accueil'
              ? 'bg-white text-blue-700 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Accueil (Synthèse)
        </button>
        <button
          type="button"
          onClick={() => onNavigate('screen-import')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentScreen === 'screen-import'
              ? 'bg-white text-blue-700 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Import Dataset
        </button>
        <button
          type="button"
          onClick={() => onNavigate('screen-16963338263129267698')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentScreen === 'screen-16963338263129267698'
              ? 'bg-white text-blue-700 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cohorte (Résultats)
        </button>
        <button
          type="button"
          onClick={() => onNavigate('screen-test-unitaire')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentScreen === 'screen-test-unitaire'
              ? 'bg-white text-blue-700 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Test unitaire
        </button>
        <button
          type="button"
          onClick={() => onNavigate('screen-5504779327101785572')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            currentScreen === 'screen-5504779327101785572'
              ? 'bg-white text-blue-700 font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Paramètres
        </button>
      </div>

      {/* Action & Notifications Topbar */}
      <div className="flex items-center gap-4 relative shrink-0">
        {/* Dataset pill in Results View */}
        {currentScreen === 'screen-16963338263129267698' && (
          <div className="hidden lg:flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-600 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400 text-[11px]">dataset :</span>
            <code className="font-mono font-semibold text-slate-800">{selectedDatasetName}</code>
            <span className="text-slate-400 text-[10px] pl-1 font-sans">| 4 424 lignes</span>
          </div>
        )}

        {/* Bouton Cloche de Notification Interactive */}
        <button
          ref={buttonRef}
          aria-label="Notifications"
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors focus:outline-hidden"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>

        {/* DROPDOWN / POPOVER NOTIFICATIONS */}
        {showNotifications && (
          <div
            ref={popoverRef}
            className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-0 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-800">Notifications récentes</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    {unreadCount} non lues
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3.5 hover:bg-slate-50/80 transition-colors flex items-start gap-3 cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      notif.type === 'critical'
                        ? 'bg-red-100 text-red-600'
                        : notif.type === 'success'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {notif.type === 'critical'
                        ? 'emergency'
                        : notif.type === 'success'
                        ? 'cloud_done'
                        : 'event'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-xs flex-1">
                    <span className="font-bold text-slate-900">{notif.title}</span>
                    <p className="text-slate-600 leading-relaxed">{notif.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>{notif.timeAgo}</span>
                      <span>•</span>
                      <span>{notif.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={onMarkAllNotificationsRead}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Tout marquer comme lu
              </button>
            </div>
          </div>
        )}

        {/* Profil raccourci */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-sm shadow-xs">
            ES
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800">Conseiller ESGIS</span>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> En ligne
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
