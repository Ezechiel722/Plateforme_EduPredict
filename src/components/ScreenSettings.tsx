import React, { useState } from 'react';
import { AVAILABLE_MODELS, INITIAL_SETTINGS } from '../data/mockData';
import { ScreenId, SystemSettings } from '../types';

interface ScreenSettingsProps {
  settings: SystemSettings;
  onUpdateSettings: (newSettings: SystemSettings) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ScreenSettings: React.FC<ScreenSettingsProps> = ({
  settings,
  onUpdateSettings,
  onNavigate,
}) => {
  const [localSettings, setLocalSettings] = useState<SystemSettings>(settings);
  const [showToast, setShowToast] = useState(false);

  const handleModelSelect = (modelId: string) => {
    setLocalSettings((prev) => ({ ...prev, selectedModel: modelId }));
  };

  const handleCriticalThresholdChange = (val: number) => {
    setLocalSettings((prev) => ({ ...prev, criticalThreshold: val }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateSettings(localSettings);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleReset = () => {
    setLocalSettings(INITIAL_SETTINGS);
    onUpdateSettings(INITIAL_SETTINGS);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const activeModel = AVAILABLE_MODELS.find((m) => m.id === localSettings.selectedModel) || AVAILABLE_MODELS[0];

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto flex flex-col gap-9 pb-24">
      {/* EN-TÊTE DE SECTION PARAMÈTRES (INITIAL SCREEN) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-blue-700 font-bold px-2 py-0.5 rounded bg-blue-100">
              Système & Préférences
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Instance ESGIS v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Paramètres & Configuration système
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
            Gérez les modèles prédictifs actifs, les seuils d'alerte et personnalisez l'expérience visuelle de votre tableau de bord.
          </p>
        </div>

        {/* Quick Telemetry Card & Direct Flow Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-xs border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-[24px]">tune</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400 font-medium">Pipeline IA</span>
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> {activeModel.name}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('screen-import')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            Importer une cohorte
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-8" onSubmit={handleSave}>
        {/* SECTION 1 : MODÈLE PRÉDICTIF D'INFÉRENCE */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]">memory</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Sélection du modèle d'évaluation actif
              </h2>
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
              Inférence temps réel • 4 pipelines disponibles
            </span>
          </div>

          {/* Grid des Modèles ML */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AVAILABLE_MODELS.map((model) => {
              const isSelected = localSettings.selectedModel === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => handleModelSelect(model.id)}
                  className={`relative flex flex-col p-5 rounded-2xl bg-white shadow-xs cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'border-2 border-blue-600 ring-2 ring-blue-500/10' : 'border border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">{model.name}</span>
                        {model.isDefault && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-semibold">
                            Actif par défaut
                          </span>
                        )}
                        {model.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 mt-0.5">{model.type}</span>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-300 text-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{model.description}</p>

                  <div className="mt-auto grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[11px]">Précision</span>
                      <span className="font-bold text-blue-700 text-sm">{model.precision}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[11px]">F1-Score</span>
                      <span className="font-bold text-slate-800 text-sm">{model.f1Score}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[11px]">Latence</span>
                      <span className="font-bold text-emerald-600 text-sm">{model.latencyMs} ms</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Réglages des seuils de décision de risque */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col gap-6 mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-blue-600 text-[22px]">speed</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Seuils de décision & Triage de risque
                  </h3>
                  <p className="text-xs text-slate-500">
                    Définissez les niveaux de déclenchement des alertes automatiques de décrochage.
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Règle institutionnelle ESGIS
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Slider Alerte Critique */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="critical-threshold"
                    className="text-xs font-bold text-slate-800 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Seuil d'alerte critique
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-extrabold text-red-600 font-mono">
                      {localSettings.criticalThreshold}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">%</span>
                  </div>
                </div>

                <div className="relative w-full pt-1">
                  <input
                    id="critical-threshold"
                    type="range"
                    min="60"
                    max="95"
                    value={localSettings.criticalThreshold}
                    onChange={(e) => handleCriticalThresholdChange(parseInt(e.target.value, 10))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Gradient bar representing risk bands */}
                <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-600 opacity-80" />

                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Sécurisé (&lt;50%)</span>
                  <span>Modéré (51-79%)</span>
                  <span className="text-red-600 font-bold">Critique (≥{localSettings.criticalThreshold}%)</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Les étudiants dont la probabilité d'abandon calculée est égale ou supérieure à ce seuil génèrent une notification prioritaire transmise au tuteur de promo.
                </p>
              </div>

              {/* Seuil de vigilance & Toggle Recalibration */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">
                      Seuil de vigilance frontière
                    </span>
                    <span className="text-xs text-slate-500">
                      Bascule de l'étudiant du statut stable vers le statut à surveiller.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-mono shadow-2xs">
                    <span className="text-sm font-bold text-slate-900">{localSettings.watchThreshold}</span>
                    <span className="text-xs text-slate-400 font-bold">%</span>
                  </div>
                </div>

                {/* Toggle Isotonic */}
                <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <div className="flex flex-col pr-4">
                    <span className="text-xs font-bold text-slate-800">
                      Recalibration des probabilités
                    </span>
                    <span className="text-xs text-slate-500">
                      Application automatique de la régression isotonique pour aligner les scores de confiance empiriques.
                    </span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={localSettings.isotonicCalibration}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          isotonicCalibration: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 : PERSONNALISATION DU THÈME & AFFICHAGE */}
        <section className="flex flex-col gap-5 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]">palette</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Thème visuel & Apparence de l'interface
              </h2>
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
              Conformité ergonomique ESGIS
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex flex-col gap-8">
            {/* Modes d'ambiance */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Mode d'ambiance lumineuse</span>
                <span className="text-xs text-slate-500">Préréglage pour conditions de luminosité en salle</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mode Clair */}
                <div
                  onClick={() => setLocalSettings((p) => ({ ...p, theme: 'light' }))}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all hover:shadow-xs bg-slate-50/70 ${
                    localSettings.theme === 'light'
                      ? 'border-2 border-blue-600 ring-2 ring-blue-500/10'
                      : 'border border-slate-200'
                  }`}
                >
                  <div className="h-24 w-full rounded-lg bg-[#f4f6f9] border border-slate-200 p-2 flex gap-1.5 mb-3 overflow-hidden shadow-inner">
                    <div className="w-1/4 h-full bg-white rounded border border-slate-200 flex flex-col gap-1 p-1">
                      <div className="w-full h-2 bg-blue-600 rounded-xs" />
                      <div className="w-3/4 h-1.5 bg-slate-200 rounded-xs" />
                      <div className="w-1/2 h-1.5 bg-slate-200 rounded-xs" />
                    </div>
                    <div className="w-3/4 h-full flex flex-col gap-1.5">
                      <div className="w-full h-3 bg-white rounded border border-slate-200" />
                      <div className="grid grid-cols-2 gap-1 h-full">
                        <div className="bg-white rounded border border-slate-200" />
                        <div className="bg-white rounded border border-slate-200" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">Standard Lumineux</span>
                      <span className="text-[11px] text-slate-400">Fond #f4f6f9, cartes blanches</span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        localSettings.theme === 'light' ? 'text-blue-600' : 'text-slate-300'
                      }`}
                    >
                      {localSettings.theme === 'light' ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                </div>

                {/* Mode Sombre */}
                <div
                  onClick={() => setLocalSettings((p) => ({ ...p, theme: 'dark' }))}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all hover:shadow-xs bg-slate-50/70 ${
                    localSettings.theme === 'dark'
                      ? 'border-2 border-blue-600 ring-2 ring-blue-500/10'
                      : 'border border-slate-200'
                  }`}
                >
                  <div className="h-24 w-full rounded-lg bg-[#0f172a] border border-slate-800 p-2 flex gap-1.5 mb-3 overflow-hidden shadow-inner">
                    <div className="w-1/4 h-full bg-[#1e293b] rounded flex flex-col gap-1 p-1">
                      <div className="w-full h-2 bg-blue-500 rounded-xs" />
                      <div className="w-3/4 h-1.5 bg-slate-700 rounded-xs" />
                      <div className="w-1/2 h-1.5 bg-slate-700 rounded-xs" />
                    </div>
                    <div className="w-3/4 h-full flex flex-col gap-1.5">
                      <div className="w-full h-3 bg-[#1e293b] rounded" />
                      <div className="grid grid-cols-2 gap-1 h-full">
                        <div className="bg-[#1e293b] rounded" />
                        <div className="bg-[#1e293b] rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">Dark Opérationnel</span>
                      <span className="text-[11px] text-slate-400">Ardoise nuit #0f172a, cartes #1e293b</span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        localSettings.theme === 'dark' ? 'text-blue-600' : 'text-slate-300'
                      }`}
                    >
                      {localSettings.theme === 'dark' ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                </div>

                {/* Mode Système */}
                <div
                  onClick={() => setLocalSettings((p) => ({ ...p, theme: 'system' }))}
                  className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all hover:shadow-xs bg-slate-50/70 ${
                    localSettings.theme === 'system'
                      ? 'border-2 border-blue-600 ring-2 ring-blue-500/10'
                      : 'border border-slate-200'
                  }`}
                >
                  <div className="h-24 w-full rounded-lg bg-gradient-to-r from-[#f4f6f9] via-slate-200 to-[#0f172a] border border-slate-300 p-2 flex items-center justify-center mb-3 overflow-hidden shadow-inner">
                    <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-xs shadow-xs flex items-center justify-center text-slate-800">
                      <span className="material-symbols-outlined text-[20px]">brightness_auto</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">Mode Système</span>
                      <span className="text-[11px] text-slate-400">Synchronisé avec les préférences OS</span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        localSettings.theme === 'system' ? 'text-blue-600' : 'text-slate-300'
                      }`}
                    >
                      {localSettings.theme === 'system' ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              {/* Nuancier Couleur d'accentuation */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-800">Palette de couleur d'accentuation</span>
                <span className="text-xs text-slate-500">
                  Teinte prépondérante des indicateurs prioritaires et boutons d'action.
                </span>
                <div className="flex items-center gap-3 pt-1">
                  {[
                    { color: '#2563eb', label: 'Bleu Institutionnel' },
                    { color: '#4f46e5', label: 'Indigo Tech' },
                    { color: '#059669', label: 'Émeraude' },
                    { color: '#7c3aed', label: 'Violet Analytique' },
                  ].map((c) => {
                    const isSelected = localSettings.accentColor === c.color;
                    return (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => setLocalSettings((p) => ({ ...p, accentColor: c.color }))}
                        title={c.label}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all ${
                          isSelected ? 'ring-4 ring-blue-200 scale-105 shadow-xs' : 'hover:opacity-90'
                        }`}
                        style={{ backgroundColor: c.color }}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Densité d'affichage */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-800">Densité d'affichage</span>
                <span className="text-xs text-slate-500">
                  Ajuste l'espacement vertical des tableaux de cohortes et des formulaires.
                </span>
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1">
                  <button
                    type="button"
                    onClick={() => setLocalSettings((p) => ({ ...p, density: 'comfortable' }))}
                    className={`py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all ${
                      localSettings.density === 'comfortable'
                        ? 'bg-white text-blue-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                    Confortable
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocalSettings((p) => ({ ...p, density: 'compact' }))}
                    className={`py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all ${
                      localSettings.density === 'compact'
                        ? 'bg-white text-blue-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">table_rows</span>
                    Compact (Dense)
                  </button>
                </div>
              </div>
            </div>

            {/* Options d'accessibilité visuelle */}
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">
                  accessibility_new
                </span>
                Accessibilité & Lisibilité inclusive
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Switch Daltonisme */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <div className="flex flex-col pr-3">
                    <span className="text-xs font-bold text-slate-800">
                      Mode daltonisme renforcé
                    </span>
                    <span className="text-xs text-slate-500">
                      Ajoute des motifs géométriques en filigrane aux badges de risque.
                    </span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={localSettings.colorblindMode}
                      onChange={(e) =>
                        setLocalSettings((p) => ({ ...p, colorblindMode: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                  </div>
                </label>

                {/* Switch WCAG AA Labels */}
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <div className="flex flex-col pr-3">
                    <span className="text-xs font-bold text-slate-800">
                      Étiquettes textuelles systématiques
                    </span>
                    <span className="text-xs text-slate-500">
                      Obligatoire pour la conformité WCAG 2.1 AA (évite la couleur seule).
                    </span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={localSettings.systematicLabels}
                      onChange={(e) =>
                        setLocalSettings((p) => ({ ...p, systematicLabels: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 : ACTIONS DE SAUVEGARDE (STICKY FOOTER ACTION BAR) */}
        <div className="sticky bottom-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <span className="material-symbols-outlined text-blue-600 text-[18px]">verified</span>
            <span>Les modifications s'appliqueront immédiatement à la session active ESGIS.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors"
            >
              Rétablir les paramètres par défaut
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </form>

      {/* NOTIFICATION TOAST INTERACTIF */}
      {showToast && (
        <div className="fixed bottom-24 right-8 z-50 animate-in fade-in slide-in-from-bottom-6 duration-300 flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-xl border border-blue-200 text-slate-900">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[20px]">check</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold">Préférences enregistrées</span>
            <span className="text-[11px] text-slate-500">
              Pipeline {activeModel.name} synchronisé avec succès.
            </span>
          </div>
        </div>
      )}

      {/* PIED DE PAGE LÉGAL & ÉTHIQUE */}
      <footer className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 pb-6 text-xs text-slate-500">
        <p>
          EduPredict est un outil d'aide à la décision algorithmique • Ne remplace pas la délibération du conseil académique ESGIS.
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> RGPD & Protection Pédagogique
          </span>
          <span>Licence 2024-2025</span>
        </div>
      </footer>
    </div>
  );
};
