import React from 'react';
import { ScreenId } from '../types';

interface ScreenHomeProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto flex flex-col gap-9 pb-16">
      {/* Titre de bienvenue & Sous-titre */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tableau de bord - Synthèse globale
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1">
            Surveillance prédictive en temps réel du décrochage étudiant &amp; pilotage des interventions académiques ESGIS.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Système 100% opérationnel
          </span>
        </div>
      </div>

      {/* RANGÉE 1 : HISTORIQUE & MÉTRIQUES GLOBALES (3 Blocs KPIs) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bloc 1 : Profils individuels analysés */}
        <div 
          onClick={() => onNavigate('screen-test-unitaire')}
          className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Analyses Unitaires</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">person_pin</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">1 248</span>
            <span className="text-sm font-semibold text-slate-500 ml-1">profils</span>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <span className="text-emerald-600 font-bold flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14,2%
              </span>
              <span>ce semestre via formulaire direct</span>
            </p>
          </div>
        </div>

        {/* Bloc 2 : Datasets analysés */}
        <div 
          onClick={() => onNavigate('screen-import')}
          className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Analyses Par Lot</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">42</span>
            <span className="text-sm font-semibold text-slate-500 ml-1">jeux de données</span>
            <p className="text-xs text-slate-600 mt-2 font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <strong className="text-slate-800">3 176 profils</strong> analysés via dataset
            </p>
          </div>
        </div>

        {/* Bloc 3 : Total général analysé */}
        <div 
          onClick={() => onNavigate('screen-16963338263129267698')}
          className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-white to-blue-50/40 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Couverture Totale</span>
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">analytics</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">4 424</span>
            <span className="text-sm font-semibold text-slate-500 ml-1">profils au total</span>
            <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-blue-600">verified</span>
              <span>100% traités avec explicabilité SHAP</span>
            </p>
          </div>
        </div>
      </section>

      {/* RANGÉE 2 : RÉPARTITION DES PRÉDICTIONS DE RISQUE (3 Blocs avec jauges) */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-700 text-[20px]">donut_large</span>
            <h2 className="text-lg font-bold text-slate-800">Répartition détaillée des prédictions de risque</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Échantillon consolidé : 4 424 profils analysés</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bloc 1 : Analyses Unitaires */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Détail des risques</span>
                  <h3 className="text-sm font-bold text-slate-800 mt-0.5">Analyses unitaires</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  1 248 profils
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Risque Faible ou moins */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Risque Faible ou moins
                    </span>
                    <span className="font-bold text-slate-800 font-mono">748 <span className="text-slate-400 font-normal font-sans">(60%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#10b981] transition-all duration-700" style={{ width: '60%' }} />
                  </div>
                </div>

                {/* Risque Modéré */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Risque Modéré
                    </span>
                    <span className="font-bold text-slate-800 font-mono">325 <span className="text-slate-400 font-normal font-sans">(26%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#f59e0b] transition-all duration-700" style={{ width: '26%' }} />
                  </div>
                </div>

                {/* Risque Élevé ou plus */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Risque Élevé ou plus
                    </span>
                    <span className="font-bold text-slate-800 font-mono">175 <span className="text-slate-400 font-normal font-sans">(14%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#ef4444] transition-all duration-700" style={{ width: '14%' }} />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-600 text-[15px]">person_pin</span>
              Évaluations unitaires directes en saisie continue.
            </p>
          </div>

          {/* Bloc 2 : Analyses Par Lot */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Détail des risques</span>
                  <h3 className="text-sm font-bold text-slate-800 mt-0.5">Analyses par lot</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                  3 176 profils
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Risque Faible ou moins */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Risque Faible ou moins
                    </span>
                    <span className="font-bold text-slate-800 font-mono">1 685 <span className="text-slate-400 font-normal font-sans">(53%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#10b981] transition-all duration-700" style={{ width: '53%' }} />
                  </div>
                </div>

                {/* Risque Modéré */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Risque Modéré
                    </span>
                    <span className="font-bold text-slate-800 font-mono">781 <span className="text-slate-400 font-normal font-sans">(25%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#f59e0b] transition-all duration-700" style={{ width: '25%' }} />
                  </div>
                </div>

                {/* Risque Élevé ou plus */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Risque Élevé ou plus
                    </span>
                    <span className="font-bold text-slate-800 font-mono">710 <span className="text-slate-400 font-normal font-sans">(22%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#ef4444] transition-all duration-700" style={{ width: '22%' }} />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-indigo-600 text-[15px]">inventory_2</span>
              Importés depuis 42 jeux de données de cohortes.
            </p>
          </div>

          {/* Bloc 3 : Couverture Totale */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50/30">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">Détail des risques</span>
                  <h3 className="text-sm font-bold text-slate-800 mt-0.5">Total global</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  4 424 profils
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Risque Faible ou moins */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Risque Faible ou moins
                    </span>
                    <span className="font-bold text-slate-800 font-mono">2 433 <span className="text-slate-400 font-normal font-sans">(55%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#10b981] transition-all duration-700" style={{ width: '55%' }} />
                  </div>
                </div>

                {/* Risque Modéré */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Risque Modéré
                    </span>
                    <span className="font-bold text-slate-800 font-mono">1 106 <span className="text-slate-400 font-normal font-sans">(25%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#f59e0b] transition-all duration-700" style={{ width: '25%' }} />
                  </div>
                </div>

                {/* Risque Élevé ou plus */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Risque Élevé ou plus
                    </span>
                    <span className="font-bold text-slate-800 font-mono">885 <span className="text-slate-400 font-normal font-sans">(20%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#ef4444] transition-all duration-700" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-blue-600 text-[15px]">analytics</span>
              Vue consolidée de l'ensemble des étudiants.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION INFÉRIEURE : CALL-TO-ACTION & ACTIONS RAPIDES */}
      <section className="bg-gradient-to-b from-white to-blue-50/40 rounded-3xl border border-[#e2e8f0] p-8 sm:p-10 shadow-xs flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4 shadow-inner">
          <span className="material-symbols-outlined text-[32px]">batch_prediction</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Prêt à diagnostiquer de nouveaux étudiants ?
        </h3>
        <p className="text-slate-500 text-sm max-w-lg mt-2">
          Évaluez la probabilité de réussite d'un dossier individuel ou téléversez les relevés d'une cohorte complète en quelques clics.
        </p>

        {/* Grand CTA Bleu */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onNavigate('screen-16963338263129267698')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Analyser maintenant</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('screen-import')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-500">upload_file</span>
            <span>Importer un CSV cohorte</span>
          </button>
        </div>

        {/* Raccourcis contextuels sous le bouton */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 w-full max-w-2xl flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">bolt</span>
            Inférence instantanée (18 ms)
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">psychology</span>
            Explications SHAP transparentes
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-blue-600">lock</span>
            Conformité RGPD &amp; Données ESGIS
          </span>
        </div>
      </section>

      {/* Mention d'aide à la décision */}
      <footer className="text-center text-xs text-slate-400 py-2">
        <p>EduPredict est un outil d'aide à la décision algorithmique • Ne remplace pas la délibération du conseil académique ESGIS.</p>
      </footer>
    </div>
  );
};
