import React, { useState } from 'react';
import { DISTRIBUTION_DECILES, SAMPLE_STUDENTS } from '../data/mockData';
import { ScreenId, StudentRecord } from '../types';
import { StudentDetailModal } from './StudentDetailModal';

interface ScreenResultsProps {
  onNavigate: (screen: ScreenId) => void;
  datasetName: string;
}

export const ScreenResults: React.FC<ScreenResultsProps> = ({ onNavigate, datasetName }) => {
  const [activeTab, setActiveTab] = useState<'risk' | 'safe'>('risk');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [selectedDecile, setSelectedDecile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleReanalyze = () => {
    setIsReanalyzing(true);
    setTimeout(() => {
      setIsReanalyzing(false);
    }, 800);
  };

  // Filter students based on tab, decile selection, and search query
  const filteredStudents = SAMPLE_STUDENTS.filter((st) => {
    if (activeTab === 'risk') {
      if (st.riskScore < 51) return false;
    } else {
      if (st.riskScore >= 51) return false;
    }

    if (selectedDecile) {
      const [minStr, maxStr] = selectedDecile.replace('%', '').split('-');
      const min = parseInt(minStr, 10);
      const max = parseInt(maxStr, 10);
      if (st.riskScore < min || st.riskScore > max) return false;
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        st.matricule.toLowerCase().includes(q) ||
        st.nom.toLowerCase().includes(q) ||
        st.statutBoursier.toLowerCase().includes(q) ||
        st.fraisScolarite.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const students90to99 = filteredStudents.filter((s) => s.riskScore >= 90 && s.riskScore <= 100);
  const students80to89 = filteredStudents.filter((s) => s.riskScore >= 80 && s.riskScore < 90);
  const otherRiskStudents = filteredStudents.filter((s) => s.riskScore >= 51 && s.riskScore < 80);
  const safeStudents = filteredStudents.filter((s) => s.riskScore < 51);

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto flex flex-col gap-6">
      {/* 2. BARRE DE CONTEXTE */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl px-5 py-3.5 shadow-xs flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">Colonne cible détectée :</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200/60 font-mono">
              Target
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">Colonne identifiant :</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200 font-mono">
              ID étudiant
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-100">
          <span className="text-slate-400 font-medium mr-1">Variables utilisées pour le calcul du risque (9) :</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Taux de validation S1
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Taux de validation S2
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Moyenne S1
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Moyenne S2
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            UE validées S1
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            UE validées S2
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Frais à jour
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Âge
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Boursier
          </span>
        </div>
      </div>

      {/* 3. ACTION & STATUT D'ANALYSE */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleReanalyze}
            disabled={isReanalyzing}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition shadow-xs focus:outline-hidden"
          >
            <span className={`material-symbols-outlined text-[18px] mr-2 ${isReanalyzing ? 'animate-spin' : ''}`}>
              {isReanalyzing ? 'sync' : 'bolt'}
            </span>
            {isReanalyzing ? 'Inférence en cours...' : 'Analyser les étudiants à risque'}
          </button>

          <div className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/80">
            <span className="material-symbols-outlined text-[16px] mr-1.5 text-emerald-600">
              check_circle
            </span>
            Analyse terminée.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('screen-import')}
            className="text-xs text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">upload_file</span>
            Changer de cohorte
          </button>
        </div>
      </div>

      {/* 4. QUATRE CARTES KPI EN LIGNE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total étudiants */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Étudiants analysés
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">4 424</span>
            <p className="text-xs text-slate-400 mt-1">100 % de la cohorte importée</p>
          </div>
        </div>

        {/* À risque */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs hover:border-amber-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              À risque (≥ 51 %)
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">1 612</span>
            <p className="text-xs text-slate-400 mt-1">36,4 % de la cohorte globale</p>
          </div>
        </div>

        {/* Risque critique */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs hover:border-red-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Risque critique (≥ 80 %)
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <span className="material-symbols-outlined text-[20px]">emergency</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#dc2626] tracking-tight">1 187</span>
            <p className="text-xs text-red-500 font-medium mt-1">Suivi prioritaire d'urgence</p>
          </div>
        </div>

        {/* Zone à surveiller */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-xs hover:border-yellow-200 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Zone à surveiller (51–59 %)
            </span>
            <div className="w-9 h-9 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#eab308] tracking-tight">142</span>
            <p className="text-xs text-yellow-600 font-medium mt-1">Seuil frontière de vigilance</p>
          </div>
        </div>
      </div>

      {/* 5. CARTE RÉPARTITION PAR TRANCHE DE PROBABILITÉ */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Répartition des étudiants par tranche de probabilité
            </h2>
            <p className="text-xs text-slate-500">
              Distribution continue de l'ensemble des 4 424 profils calculée par le modèle prédictif
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#dc2626]" />
              <span className="text-slate-600 font-medium">Critique (≥ 80 %)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#f97316]" />
              <span className="text-slate-600 font-medium">Élevé (60–79 %)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#eab308]" />
              <span className="text-slate-600 font-medium">À surveiller (51–59 %)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#16a34a]" />
              <span className="text-slate-600 font-medium">Faible (&lt; 51 %)</span>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-2">
          <div className="relative pt-4 pb-2">
            {/* Horizontal Gridlines */}
            <div className="absolute inset-x-0 top-4 bottom-14 flex flex-col justify-between pointer-events-none select-none">
              <div className="flex items-center w-full">
                <span className="text-[10px] font-mono text-slate-400 w-8 text-right pr-2">1000</span>
                <div className="flex-1 border-b border-dashed border-slate-200" />
              </div>
              <div className="flex items-center w-full">
                <span className="text-[10px] font-mono text-slate-400 w-8 text-right pr-2">750</span>
                <div className="flex-1 border-b border-dashed border-slate-200" />
              </div>
              <div className="flex items-center w-full">
                <span className="text-[10px] font-mono text-slate-400 w-8 text-right pr-2">500</span>
                <div className="flex-1 border-b border-dashed border-slate-200" />
              </div>
              <div className="flex items-center w-full">
                <span className="text-[10px] font-mono text-slate-400 w-8 text-right pr-2">250</span>
                <div className="flex-1 border-b border-dashed border-slate-200" />
              </div>
              <div className="flex items-center w-full">
                <span className="text-[10px] font-mono text-slate-400 w-8 text-right pr-2">0</span>
                <div className="flex-1 border-b border-slate-200" />
              </div>
            </div>

            {/* Bars */}
            <div className="h-64 flex items-end justify-between pl-9 pr-2 gap-2 sm:gap-3">
              {DISTRIBUTION_DECILES.map((d) => {
                const isSelected = selectedDecile === d.range;
                return (
                  <button
                    key={d.range}
                    type="button"
                    onClick={() => setSelectedDecile(isSelected ? null : d.range)}
                    className="flex-1 h-full flex flex-col justify-end items-center group relative z-10 cursor-pointer focus:outline-hidden"
                  >
                    <span className="text-[11px] font-bold text-slate-700 mb-1.5 transition-transform group-hover:scale-110">
                      {d.count}
                    </span>
                    <div
                      className={`w-full max-w-[48px] rounded-t-md shadow-xs transition-all duration-300 hover:brightness-110 ${
                        isSelected ? 'ring-2 ring-blue-700 ring-offset-2' : ''
                      }`}
                      style={{
                        height: `${d.heightPct}%`,
                        backgroundColor: d.color,
                      }}
                    />
                    <div className="w-full border-t border-slate-200 pt-2 flex flex-col items-center">
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
                        {d.range}
                      </span>
                      <span
                        className="text-[10px] font-semibold mt-0.5"
                        style={{ color: d.color }}
                      >
                        {d.tier}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDecile && (
            <div className="mt-2 text-xs flex items-center justify-between bg-blue-50 text-blue-800 p-2 rounded-lg">
              <span>Filtre actif : Tranche {selectedDecile}</span>
              <button
                type="button"
                onClick={() => setSelectedDecile(null)}
                className="underline font-bold hover:text-blue-900"
              >
                Réinitialiser le filtre
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6. DEUX ONGLETS DE NAVIGATION */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('risk');
              setSelectedDecile(null);
            }}
            className={`py-3 px-1 text-sm font-bold flex items-center space-x-2 focus:outline-hidden transition-all ${
              activeTab === 'risk'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>🚨 À risque entre 51 % et 100 %</span>
            <span className="bg-red-100 text-red-700 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-red-200">
              1 612
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('safe');
              setSelectedDecile(null);
            }}
            className={`py-3 px-1 text-sm font-medium flex items-center space-x-2 transition focus:outline-hidden ${
              activeTab === 'safe'
                ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                : 'border-b-2 border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>🕊 Autres étudiants &lt; 51 %</span>
            <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-slate-200">
              2 812
            </span>
          </button>
        </div>
      </div>

      {/* 7. SECTION CONTENU ONGLET ACTIF */}
      <div className="space-y-5">
        {/* Barre de pagination & Recherche rapide */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl px-5 py-3 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-slate-500">Navigation par page :</span>
            <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <span className="px-3 py-1 font-semibold text-slate-800 bg-white border-x border-slate-200">
                Page {currentPage}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Rechercher un matricule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-48 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            <div className="text-slate-600 font-medium">
              Affichage des étudiants <span className="font-bold text-slate-900">1 à 25</span> sur{' '}
              <span className="font-bold text-slate-900">
                {activeTab === 'risk' ? '1 612' : '2 812'}
              </span>
            </div>
          </div>
        </div>

        {/* Condition 1 : Onglet À Risque */}
        {activeTab === 'risk' ? (
          <>
            {/* Groupe 1 : 90-99% Risque Critique */}
            {students90to99.length > 0 && (
              <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-xs overflow-hidden">
                <div className="bg-red-50/50 border-b border-[#e2e8f0] px-6 py-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
                    <h3 className="text-sm">
                      <strong className="font-bold text-slate-900">90–99 %</strong>
                      <span className="text-slate-500 font-normal">
                        {' '}
                        — 25 étudiant(s) visibles (Risque Critique)
                      </span>
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-red-700 bg-red-100/70 border border-red-200 px-2.5 py-0.5 rounded-full">
                    Action immédiate requise
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/70 text-slate-500 text-xs border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Identifiant étudiant
                        </th>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Score de risque d'abandon
                        </th>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Statut boursier
                        </th>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Frais de scolarité
                        </th>
                        <th className="py-3 px-6 text-right font-semibold" scope="col">
                          Action pédagogique
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {students90to99.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-6 font-semibold text-slate-900 flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                              {st.id}
                            </div>
                            <span>{st.matricule}</span>
                          </td>
                          <td className="py-3.5 px-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-[#dc2626] shadow-xs">
                              <span>{st.riskScore} %</span>
                              <span className="ml-1.5 text-[10px] font-normal text-red-100 opacity-90">
                                • Critique
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                st.statutBoursier === 'Boursier'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  st.statutBoursier === 'Boursier' ? 'bg-[#16a34a]' : 'bg-[#dc2626]'
                                }`}
                              />
                              {st.statutBoursier}
                            </span>
                          </td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                st.fraisScolarite.includes('retard') || st.fraisScolarite.includes('Arriérés')
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : st.fraisScolarite === 'À jour'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  st.fraisScolarite.includes('retard') || st.fraisScolarite.includes('Arriérés')
                                    ? 'bg-[#dc2626]'
                                    : st.fraisScolarite === 'À jour'
                                    ? 'bg-[#16a34a]'
                                    : 'bg-slate-400'
                                }`}
                              />
                              {st.fraisScolarite}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedStudent(st)}
                              className="inline-flex items-center px-3 py-1.5 border border-slate-200 text-xs font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs focus:outline-hidden"
                            >
                              🔍 Voir détails
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Groupe 2 : 80-89% Risque Critique */}
            {students80to89.length > 0 && (
              <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-xs overflow-hidden">
                <div className="bg-red-50/30 border-b border-[#e2e8f0] px-6 py-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
                    <h3 className="text-sm">
                      <strong className="font-bold text-slate-900">80–89 %</strong>
                      <span className="text-slate-500 font-normal">
                        {' '}
                        — 18 étudiant(s) visibles (Risque Critique)
                      </span>
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                    Surveillance renforcée
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/70 text-slate-500 text-xs border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Identifiant étudiant
                        </th>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Score de risque d'abandon
                        </th>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Statut boursier
                        </th>
                        <th className="py-3 px-6 font-semibold" scope="col">
                          Frais de scolarité
                        </th>
                        <th className="py-3 px-6 text-right font-semibold" scope="col">
                          Action pédagogique
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {students80to89.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-6 font-semibold text-slate-900 flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                              {st.id}
                            </div>
                            <span>{st.matricule}</span>
                          </td>
                          <td className="py-3.5 px-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-[#dc2626] shadow-xs">
                              <span>{st.riskScore} %</span>
                              <span className="ml-1.5 text-[10px] font-normal text-red-100 opacity-90">
                                • Critique
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                st.statutBoursier === 'Boursier'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : st.statutBoursier === 'Non boursier'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  st.statutBoursier === 'Boursier'
                                    ? 'bg-[#16a34a]'
                                    : st.statutBoursier === 'Non boursier'
                                    ? 'bg-[#dc2626]'
                                    : 'bg-slate-400'
                                }`}
                              />
                              {st.statutBoursier}
                            </span>
                          </td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                st.fraisScolarite.includes('retard') || st.fraisScolarite.includes('Arriérés')
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : st.fraisScolarite === 'À jour'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  st.fraisScolarite.includes('retard') || st.fraisScolarite.includes('Arriérés')
                                    ? 'bg-[#dc2626]'
                                    : st.fraisScolarite === 'À jour'
                                    ? 'bg-[#16a34a]'
                                    : 'bg-slate-400'
                                }`}
                              />
                              {st.fraisScolarite}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedStudent(st)}
                              className="inline-flex items-center px-3 py-1.5 border border-slate-200 text-xs font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs focus:outline-hidden"
                            >
                              🔍 Voir détails
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Autres étudiants à risque (51-79%) si présents */}
            {otherRiskStudents.length > 0 && (
              <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-xs overflow-hidden">
                <div className="bg-orange-50/30 border-b border-[#e2e8f0] px-6 py-3.5 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                    <h3 className="text-sm font-bold text-slate-900">
                      51–79 % — {otherRiskStudents.length} étudiant(s) visibles (Risque Élevé & Vigilance)
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-orange-700 bg-orange-100/70 border border-orange-200 px-2.5 py-0.5 rounded-full">
                    Triage préventif
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/70 text-slate-500 text-xs border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-6 font-semibold" scope="col">Identifiant étudiant</th>
                        <th className="py-3 px-6 font-semibold" scope="col">Score de risque d'abandon</th>
                        <th className="py-3 px-6 font-semibold" scope="col">Statut boursier</th>
                        <th className="py-3 px-6 font-semibold" scope="col">Frais de scolarité</th>
                        <th className="py-3 px-6 text-right font-semibold" scope="col">Action pédagogique</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {otherRiskStudents.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-6 font-semibold text-slate-900 flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                              {st.id}
                            </div>
                            <span>{st.matricule}</span>
                          </td>
                          <td className="py-3.5 px-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-orange-500 shadow-xs">
                              <span>{st.riskScore} %</span>
                              <span className="ml-1.5 text-[10px] font-normal text-orange-100 opacity-90">
                                • {st.riskScore >= 60 ? 'Élevé' : 'Vigilance'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-6">{st.statutBoursier}</td>
                          <td className="py-3.5 px-6">{st.fraisScolarite}</td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedStudent(st)}
                              className="inline-flex items-center px-3 py-1.5 border border-slate-200 text-xs font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition shadow-2xs"
                            >
                              🔍 Voir détails
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Onglet Étudiants stables (< 51%) */
          <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-xs overflow-hidden">
            <div className="bg-emerald-50/50 border-b border-[#e2e8f0] px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
                <h3 className="text-sm font-bold text-slate-900">
                  0–50 % — Étudiants hors de la zone de décrochage (2 812 profils)
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Progression nominale
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/70 text-slate-500 text-xs border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-6 font-semibold" scope="col">Identifiant étudiant</th>
                    <th className="py-3 px-6 font-semibold" scope="col">Score de risque d'abandon</th>
                    <th className="py-3 px-6 font-semibold" scope="col">Statut boursier</th>
                    <th className="py-3 px-6 font-semibold" scope="col">Frais de scolarité</th>
                    <th className="py-3 px-6 text-right font-semibold" scope="col">Action pédagogique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {safeStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-6 font-semibold text-slate-900 flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                          {st.id}
                        </div>
                        <span>{st.matricule}</span>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-[#16a34a] shadow-xs">
                          <span>{st.riskScore} %</span>
                          <span className="ml-1.5 text-[10px] font-normal text-emerald-100 opacity-90">
                            • Faible
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">{st.statutBoursier}</td>
                      <td className="py-3.5 px-6">{st.fraisScolarite}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(st)}
                          className="inline-flex items-center px-3 py-1.5 border border-slate-200 text-xs font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition shadow-2xs"
                        >
                          🔍 Voir détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 8. PIED DE PAGE DISCRET */}
      <footer className="pt-8 pb-10 text-center">
        <div className="inline-flex items-center justify-center space-x-2 text-xs text-slate-500 bg-white border border-[#e2e8f0] px-4 py-2 rounded-full shadow-xs">
          <span className="material-symbols-outlined text-[16px] text-blue-600 shrink-0">
            info
          </span>
          <span>
            Outil d'aide à la décision : ne remplace pas l'évaluation d'un conseiller pédagogique.
          </span>
        </div>
      </footer>

      {/* MODAL FICHE DÉTAILLÉE ÉTUDIANT */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
};
