import React, { useState } from 'react';
import { StudentRecord } from '../types';

interface StudentDetailModalProps {
  student: StudentRecord | null;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  const [advisorNote, setAdvisorNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [tutorAssigned, setTutorAssigned] = useState(false);

  if (!student) return null;

  const handleSaveNote = () => {
    if (!advisorNote.trim()) return;
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              {student.id}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg">{student.matricule}</h3>
                <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold">
                  {student.niveau}
                </span>
              </div>
              <span className="text-xs text-slate-500">{student.nom} • {student.filiere}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Hero Risk Banner */}
          <div className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border ${
            student.riskTier === 'critique'
              ? 'bg-red-50 border-red-200'
              : student.riskTier === 'eleve'
              ? 'bg-orange-50 border-orange-200'
              : student.riskTier === 'vigilance'
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                student.riskTier === 'critique'
                  ? 'bg-red-600 text-white'
                  : student.riskTier === 'eleve'
                  ? 'bg-orange-500 text-white'
                  : student.riskTier === 'vigilance'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-emerald-600 text-white'
              }`}>
                {student.riskScore}%
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Probabilité algorithmique d'abandon
                </span>
                <span className={`text-base font-extrabold capitalize ${
                  student.riskTier === 'critique' ? 'text-red-700' : 'text-slate-800'
                }`}>
                  Niveau de sévérité : {student.riskTier}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTutorAssigned(!tutorAssigned)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                  tutorAssigned
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {tutorAssigned ? 'check_circle' : 'person_add'}
                </span>
                {tutorAssigned ? 'Tuteur assigné (M1)' : 'Assigner un tuteur'}
              </button>
            </div>
          </div>

          {/* Academic Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-400 font-medium">Moyenne S1 / S2</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-bold text-slate-900 text-base">{student.moyenneS1}</span>
                <span className="text-slate-400 text-xs">/</span>
                <span className={`font-bold text-base ${student.moyenneS2 < 10 ? 'text-red-600' : 'text-slate-900'}`}>
                  {student.moyenneS2}
                </span>
                <span className="text-[10px] text-slate-400">/20</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-400 font-medium">Taux Validation S2</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-bold text-base text-slate-900">{student.tauxValidationS2}%</span>
                <span className="text-[10px] text-slate-400">({student.ueValideesS2}/{student.totalUe} UE)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-400 font-medium">Frais de scolarité</span>
              <div className="mt-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                  student.fraisScolarite.includes('retard') || student.fraisScolarite.includes('Arriérés')
                    ? 'bg-red-100 text-red-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {student.fraisScolarite}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-400 font-medium">Bourse & Assiduité</span>
              <div className="mt-1 flex flex-col text-xs font-semibold text-slate-800">
                <span>{student.statutBoursier}</span>
                <span className="text-[11px] text-slate-400 font-normal">Présence S2 : {student.assiduiteS2}%</span>
              </div>
            </div>
          </div>

          {/* SHAP Waterfall / Explainability Feature Contributions */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[18px]">analytics</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Explicabilité SHAP (Facteurs déterminants)
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">Modèle XGB-Retention v2.4</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {student.shapValues.map((shap, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">{shap.feature}</span>
                    <span className={`font-mono font-bold ${
                      shap.impact > 0 ? 'text-red-600' : 'text-emerald-600'
                    }`}>
                      {shap.impact > 0 ? `+${(shap.impact * 100).toFixed(0)}% (Risque)` : `${(shap.impact * 100).toFixed(0)}% (Protecteur)`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    {shap.impact > 0 ? (
                      <div 
                        className="bg-red-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, Math.abs(shap.impact) * 200)}%` }}
                      />
                    ) : (
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all ml-auto"
                        style={{ width: `${Math.min(100, Math.abs(shap.impact) * 200)}%` }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facteurs de risque et Recommandations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50/50 rounded-xl border border-red-200">
              <h4 className="text-xs font-bold text-red-900 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-red-600">report_problem</span>
                Signaux d'alerte détectés
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                {student.facteursRisque.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
              <h4 className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-blue-600">lightbulb</span>
                Plan de remédiation préconisé
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                {student.recommandations.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notes du Conseiller Pédagogique */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2.5">
            <label className="text-xs font-bold text-slate-800" htmlFor="advisor-note">
              Journal de suivi & Note confidentielle du conseiller :
            </label>
            <textarea
              id="advisor-note"
              rows={2}
              value={advisorNote}
              onChange={(e) => setAdvisorNote(e.target.value)}
              placeholder="Ex: Entretien téléphonique réalisé le 14/10. L'étudiant confirme des difficultés d'hébergement..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between">
              {noteSaved && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check</span> Note enregistrée
                </span>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Ajouter au dossier
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Identifiant interne : {student.matricule} • ESGIS Lomé</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100"
          >
            Fermer le dossier
          </button>
        </div>
      </div>
    </div>
  );
};
