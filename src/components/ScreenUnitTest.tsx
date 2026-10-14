import React, { useState } from 'react';
import { ScreenId, SystemSettings } from '../types';

interface ScreenUnitTestProps {
  settings: SystemSettings;
  onNavigate: (screen: ScreenId) => void;
}

export const ScreenUnitTest: React.FC<ScreenUnitTestProps> = ({ settings, onNavigate }) => {
  const [moyenneS1, setMoyenneS1] = useState<number>(8.5);
  const [moyenneS2, setMoyenneS2] = useState<number>(7.2);
  const [tauxValS1, setTauxValS1] = useState<number>(40);
  const [tauxValS2, setTauxValS2] = useState<number>(20);
  const [ueValS1, setUeValS1] = useState<number>(3);
  const [ueValS2, setUeValS2] = useState<number>(1);
  const [assiduiteS2, setAssiduiteS2] = useState<number>(48);
  const [fraisRetard, setFraisRetard] = useState<boolean>(true);
  const [estBoursier, setEstBoursier] = useState<boolean>(false);
  const [age, setAge] = useState<number>(22);

  // Compute realistic simulated ML probability based on XGBoost feature weights
  let calculatedScore = 20;
  // S2 average impact (heavy weight)
  if (moyenneS2 < 10) calculatedScore += (10 - moyenneS2) * 4.5;
  else calculatedScore -= (moyenneS2 - 10) * 3;

  // Validation rate S2
  calculatedScore += (50 - tauxValS2) * 0.35;

  // Tuition delay penalty
  if (fraisRetard) calculatedScore += 18;

  // Non-scholarship penalty if struggling
  if (!estBoursier) calculatedScore += 7;

  // Attendance drop penalty
  if (assiduiteS2 < 70) calculatedScore += (70 - assiduiteS2) * 0.3;

  // Clamp 1 - 99
  const riskScore = Math.max(2, Math.min(98, Math.round(calculatedScore)));

  const isCritical = riskScore >= settings.criticalThreshold;
  const isHigh = riskScore >= 60 && riskScore < settings.criticalThreshold;
  const isWatch = riskScore >= settings.watchThreshold && riskScore < 60;
  const isLow = riskScore < settings.watchThreshold;

  const loadPreset = (preset: 'critical' | 'watch' | 'safe') => {
    if (preset === 'critical') {
      setMoyenneS1(7.8);
      setMoyenneS2(6.2);
      setTauxValS1(25);
      setTauxValS2(12);
      setUeValS1(2);
      setUeValS2(1);
      setAssiduiteS2(44);
      setFraisRetard(true);
      setEstBoursier(false);
      setAge(22);
    } else if (preset === 'watch') {
      setMoyenneS1(11.2);
      setMoyenneS2(10.1);
      setTauxValS1(70);
      setTauxValS2(55);
      setUeValS1(4);
      setUeValS2(3);
      setAssiduiteS2(78);
      setFraisRetard(false);
      setEstBoursier(false);
      setAge(21);
    } else {
      setMoyenneS1(15.4);
      setMoyenneS2(14.8);
      setTauxValS1(100);
      setTauxValS2(100);
      setUeValS1(6);
      setUeValS2(6);
      setAssiduiteS2(94);
      setFraisRetard(false);
      setEstBoursier(true);
      setAge(19);
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-blue-700 font-bold px-2 py-0.5 rounded bg-blue-100">
              Simulateur Unitaire • Licence 2
            </span>
            <span className="text-xs text-slate-500 font-medium">• Session 2024-2025</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic & Test unitaire d'un profil étudiant
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Ajustez dynamiquement les indicateurs académiques et financiers pour mesurer l'inférence du modèle actif.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 pl-2">Cas types :</span>
          <button
            type="button"
            onClick={() => loadPreset('critical')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
          >
            Décrochage critique
          </button>
          <button
            type="button"
            onClick={() => loadPreset('watch')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
          >
            Zone frontière (51-59%)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('safe')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            Réussite sereine
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Parameters (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-[18px]">tune</span>
              Variables académiques & contextuelles
            </h2>
            <span className="text-xs text-slate-400">9 attributs d'entrée</span>
          </div>

          {/* Notes S1 et S2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700" htmlFor="moy-s1">
                  Moyenne S1 : <span className="text-blue-700 font-mono text-sm">{moyenneS1} / 20</span>
                </label>
              </div>
              <input
                id="moy-s1"
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={moyenneS1}
                onChange={(e) => setMoyenneS1(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700" htmlFor="moy-s2">
                  Moyenne S2 :{' '}
                  <span className={`font-mono text-sm font-extrabold ${moyenneS2 < 10 ? 'text-red-600' : 'text-blue-700'}`}>
                    {moyenneS2} / 20
                  </span>
                </label>
              </div>
              <input
                id="moy-s2"
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={moyenneS2}
                onChange={(e) => setMoyenneS2(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Taux de validation S1 & S2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700" htmlFor="taux-val-s1">
                Taux validation S1 : <span className="text-blue-700 font-mono text-sm">{tauxValS1} %</span>
              </label>
              <input
                id="taux-val-s1"
                type="range"
                min="0"
                max="100"
                step="5"
                value={tauxValS1}
                onChange={(e) => setTauxValS1(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700" htmlFor="taux-val-s2">
                Taux validation S2 :{' '}
                <span className={`font-mono text-sm font-extrabold ${tauxValS2 < 40 ? 'text-red-600' : 'text-blue-700'}`}>
                  {tauxValS2} %
                </span>
              </label>
              <input
                id="taux-val-s2"
                type="range"
                min="0"
                max="100"
                step="5"
                value={tauxValS2}
                onChange={(e) => setTauxValS2(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          {/* UE Validées & Assiduité S2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700" htmlFor="ue-val-s2">
                UEs validées S2 : <span className="font-mono text-sm font-bold text-slate-900">{ueValS2} / 6</span>
              </label>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setUeValS2(n)}
                    className={`flex-1 py-1 text-xs rounded-md font-semibold transition-all ${
                      ueValS2 === n
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700" htmlFor="assiduite-s2">
                Assiduité en cours S2 : <span className="font-mono text-sm font-bold text-slate-900">{assiduiteS2}%</span>
              </label>
              <input
                id="assiduite-s2"
                type="range"
                min="20"
                max="100"
                step="2"
                value={assiduiteS2}
                onChange={(e) => setAssiduiteS2(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Toggles : Frais & Bourse */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Arriérés scolarité</span>
                <span className="text-[10px] text-slate-400">Paiement en retard</span>
              </div>
              <input
                type="checkbox"
                checked={fraisRetard}
                onChange={(e) => setFraisRetard(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
            </label>

            <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Boursier d'État</span>
                <span className="text-[10px] text-slate-400">Aide publique</span>
              </div>
              <input
                type="checkbox"
                checked={estBoursier}
                onChange={(e) => setEstBoursier(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Âge inscription</span>
                <span className="text-xs font-bold font-mono text-slate-900">{age} ans</span>
              </div>
              <input
                type="range"
                min="17"
                max="30"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Right: Real-time Inférence Diagnostic (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Main Risk Output Card */}
          <div className={`p-6 rounded-2xl border shadow-sm transition-all ${
            isCritical
              ? 'bg-red-50/70 border-red-300'
              : isHigh
              ? 'bg-orange-50/70 border-orange-300'
              : isWatch
              ? 'bg-yellow-50/70 border-yellow-300'
              : 'bg-emerald-50/70 border-emerald-300'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Score Prédictif Inférence
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                Latence : 18 ms
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-extrabold text-3xl shadow-sm text-white ${
                isCritical
                  ? 'bg-red-600'
                  : isHigh
                  ? 'bg-orange-500'
                  : isWatch
                  ? 'bg-yellow-500'
                  : 'bg-emerald-600'
              }`}>
                {riskScore}%
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-semibold">Triage Pédagogique :</span>
                <span className={`text-xl font-extrabold ${
                  isCritical ? 'text-red-700' : isHigh ? 'text-orange-700' : isWatch ? 'text-yellow-700' : 'text-emerald-700'
                }`}>
                  {isCritical
                    ? 'Risque Critique (≥ 80%)'
                    : isHigh
                    ? 'Risque Élevé (60–79%)'
                    : isWatch
                    ? 'Vigilance Frontière (51–59%)'
                    : 'Risque Faible (< 51%)'}
                </span>
                <span className="text-xs text-slate-600 mt-0.5">
                  {isCritical
                    ? 'Déclenchement immédiat de la cellule de soutien'
                    : isHigh
                    ? 'Surveillance renforcée des notes de rattrapage'
                    : isWatch
                    ? 'Vérification bimensuelle d’assiduité'
                    : 'Progression d’études sereine'}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Recommandation modèle :</span>
              <button
                type="button"
                onClick={() => onNavigate('screen-16963338263129267698')}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition shadow-2xs flex items-center gap-1.5"
              >
                <span>Comparer à la cohorte</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick SHAP breakdown for this test */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-600 text-[18px]">waterfall_chart</span>
              Contributions relatives au score (SHAP)
            </h3>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Moyenne S2 ({moyenneS2}/20)</span>
                <span className={`font-mono font-bold ${moyenneS2 < 10 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {moyenneS2 < 10 ? '+32% (aggravant)' : '-18% (protecteur)'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Arriérés scolarité</span>
                <span className={`font-mono font-bold ${fraisRetard ? 'text-red-600' : 'text-emerald-600'}`}>
                  {fraisRetard ? '+21% (aggravant)' : '-14% (protecteur)'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Validation S2 ({tauxValS2}%)</span>
                <span className={`font-mono font-bold ${tauxValS2 < 50 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {tauxValS2 < 50 ? '+24% (aggravant)' : '-20% (protecteur)'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Bourse & Âge ({age} ans)</span>
                <span className={`font-mono font-bold ${estBoursier ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {estBoursier ? '-8% (protecteur)' : '+5% (neutre)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
