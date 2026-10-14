import React from 'react';
import { ScreenId, SystemSettings } from '../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  settings: SystemSettings;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate, settings }) => {
  const isAccueil = currentScreen === 'screen-accueil';
  const isTestUnitaire = currentScreen === 'screen-test-unitaire';
  const isAnalyseDataset = currentScreen === 'screen-import' || currentScreen === 'screen-16963338263129267698';
  const isParametres = currentScreen === 'screen-5504779327101785572';

  return (
    <aside className="w-[260px] min-w-[260px] h-screen sticky top-0 bg-white border-r border-[#e2e8f0] flex flex-col justify-between z-40 select-none">
      <div className="flex flex-col">
        {/* Logo et marque */}
        <div 
          onClick={() => onNavigate('screen-accueil')}
          className="h-20 px-6 border-b border-[#f1f5f9] flex items-center gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">EduPredict</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase tracking-wide">
                ESGIS
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Aide à la décision IA</span>
          </div>
        </div>

        {/* Navigation Verticale */}
        <nav className="p-4 flex flex-col gap-1.5">
          {/* Accueil (Actif) */}
          <button
            type="button"
            onClick={() => onNavigate('screen-accueil')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all text-left ${
              isAccueil
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isAccueil ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'
              }`}
            >
              dashboard
            </span>
            <span>Accueil</span>
          </button>

          {/* Test unitaire */}
          <button
            type="button"
            onClick={() => onNavigate('screen-test-unitaire')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all text-left group ${
              isTestUnitaire
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isTestUnitaire ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'
                }`}
              >
                person_search
              </span>
              <span>Test unitaire</span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isTestUnitaire
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
              }`}
            >
              L2
            </span>
          </button>

          {/* Analyse Dataset */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => onNavigate('screen-import')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all text-left group ${
                isAnalyseDataset
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isAnalyseDataset ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'
                  }`}
                >
                  folder_data
                </span>
                <span>Analyse Dataset</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${isAnalyseDataset ? 'bg-emerald-400 ring-2 ring-white/30' : 'bg-emerald-500'}`} />
            </button>

            {/* Sub-items if inside Analyse Dataset */}
            {isAnalyseDataset && (
              <div className="pl-6 pr-2 py-1 flex flex-col gap-1 border-l-2 border-blue-200 ml-4 my-0.5">
                <button
                  type="button"
                  onClick={() => onNavigate('screen-import')}
                  className={`text-xs py-1.5 px-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                    currentScreen === 'screen-import'
                      ? 'font-bold text-blue-700 bg-blue-50'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>1. Import CSV</span>
                  {currentScreen === 'screen-import' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('screen-16963338263129267698')}
                  className={`text-xs py-1.5 px-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                    currentScreen === 'screen-16963338263129267698'
                      ? 'font-bold text-blue-700 bg-blue-50'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>2. Résultats cohorte</span>
                  {currentScreen === 'screen-16963338263129267698' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Paramètres */}
          <button
            type="button"
            onClick={() => onNavigate('screen-5504779327101785572')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all text-left group ${
              isParametres
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isParametres ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'
              }`}
            >
              settings
            </span>
            <span>Paramètres</span>
          </button>
        </nav>
      </div>

      {/* Pied de Sidebar: Profil & Modèle */}
      <div className="p-4 border-t border-[#f1f5f9] flex flex-col gap-3 bg-slate-50/60">
        {/* Statut du modèle */}
        <div 
          onClick={() => onNavigate('screen-5504779327101785572')}
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#e2e8f0] shadow-xs cursor-pointer hover:border-blue-300 transition-colors"
          title="Modifier le modèle actif dans Paramètres"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700">
              {settings.selectedModel === 'xgboost'
                ? 'XGB-Retention v2.4'
                : settings.selectedModel === 'random_forest'
                ? 'Random Forest v2.1'
                : settings.selectedModel === 'lightgbm'
                ? 'LightGBM v1.8'
                : 'Hybrid Stacking v3'}
            </span>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
            Prêt
          </span>
        </div>

        {/* Utilisateur */}
        <div className="flex items-center gap-3 pt-1">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-800 to-slate-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              CA
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-800 truncate">Conseiller Académique</span>
            <span className="text-[11px] text-slate-500 truncate">ESGIS Togo (Lomé)</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
