import React, { useState, useRef } from 'react';
import { CSV_PREVIEW_ROWS } from '../data/mockData';
import { ScreenId } from '../types';

interface ScreenImportProps {
  onNavigate: (screen: ScreenId) => void;
  selectedDataset: string;
  onSelectDataset: (dataset: string) => void;
}

export const ScreenImport: React.FC<ScreenImportProps> = ({
  onNavigate,
  selectedDataset,
  onSelectDataset,
}) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [idColumn, setIdColumn] = useState<string>('id_etudiant');
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [showErrorBanner, setShowErrorBanner] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isReady = Boolean(uploadedFileName || selectedDataset);

  const handleFileSelect = (file: File) => {
    setUploadedFileName(file.name);
    onSelectDataset(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    if (isReady) {
      onNavigate('screen-16963338263129267698');
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="max-w-5xl mx-auto w-full py-8 px-6 lg:px-8">
        {/* 1. En-tête de bienvenue & Contexte Institutionnel */}
        <header className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              Diagnostic Précoce • IA Prédictive
            </span>
            <span className="text-slate-500 text-xs font-medium">• Session 2024-2025</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Initialisation de la cohorte étudiante
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Importez les relevés de notes et indicateurs académiques pour détecter automatiquement les signaux précoces d'abandon scolaire.
          </p>

          {/* Bandeau d'information contextuel */}
          <div className="mt-2 rounded-xl bg-blue-50/70 border border-blue-200/60 p-4 flex items-start gap-3 shadow-xs">
            <span className="material-symbols-outlined text-blue-600 text-[22px] mt-0.5 shrink-0">
              info
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
              <p className="text-sm text-blue-900 font-medium">
                {isReady
                  ? `Dataset prêt pour l'analyse : ${uploadedFileName || selectedDataset}`
                  : 'Chargez un CSV pour commencer ou choisissez un dataset local certifié.'}
              </p>
              <span className="text-xs font-semibold px-2.5 py-1 bg-white text-blue-700 rounded-lg shadow-xs shrink-0 inline-flex items-center gap-1.5 border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />{' '}
                {isReady ? 'Prêt à l’analyse' : "Prêt à l'ingestion"}
              </span>
            </div>
          </div>
        </header>

        {/* 2. Grande carte centrale d'importation */}
        <section className="bg-white rounded-2xl shadow-xs border border-[#e2e8f0] p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
          {/* Zone Drag & Drop */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`group relative rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 border-2 border-dashed ${
              isDragging
                ? 'bg-blue-50 border-blue-500'
                : uploadedFileName
                ? 'bg-emerald-50/50 border-emerald-400'
                : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/60 hover:border-blue-400'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[34px]">
                {uploadedFileName ? 'check_circle' : 'cloud_upload'}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold text-slate-800">
                {uploadedFileName ? `Fichier chargé : ${uploadedFileName}` : 'Importer un fichier CSV'}
              </span>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Glissez-déposez ou{' '}
                <span className="text-blue-600 font-semibold underline underline-offset-2">
                  cliquez pour parcourir vos dossiers
                </span>
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-600 text-xs font-medium">
                Format supporté : .csv
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-600 text-xs font-medium">
                Séparateurs : virgule (,) ou point-virgule (;)
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-600 text-xs font-medium">
                Encodage UTF-8
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Séparateur visuel & Choix Dataset Local */}
          <div className="flex items-center gap-4 py-1">
            <div className="h-[1px] flex-1 bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 bg-white">
              OU CHOISIR UN DATASET LOCAL
            </span>
            <div className="h-[1px] flex-1 bg-slate-200" />
          </div>

          {/* Dataset d'exemple serveur */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">dataset</span>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-800" htmlFor="datasetSelect">
                  Dataset d'exemple disponible sur le serveur :
                </label>
                <span className="text-xs text-slate-500">
                  Jeux de données anonymisés pour calibration de tests
                </span>
              </div>
            </div>

            <div className="w-full sm:w-80">
              <select
                id="datasetSelect"
                value={selectedDataset}
                onChange={(e) => {
                  onSelectDataset(e.target.value);
                  if (e.target.value) setUploadedFileName(null);
                }}
                className="w-full h-10 px-3 bg-white text-slate-800 border border-slate-300 rounded-lg text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs cursor-pointer"
              >
                <option value="">-- aucun --</option>
                <option value="students_dropout_v2.csv">
                  students_dropout_v2.csv (4 424 profils historiques - ESGIS)
                </option>
                <option value="cohort_licence_informatique_2024.csv">
                  cohort_licence_informatique_2024.csv (1 250 profils)
                </option>
              </select>
            </div>
          </div>

          {/* Ligne de paramétrage additionnelle */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Identifiant optionnel */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold text-slate-700 flex items-center justify-between"
                htmlFor="idColumnSelect"
              >
                <span>
                  Colonne identifiant <span className="text-slate-400 font-normal">(optionnel)</span>
                </span>
                <span className="text-[11px] text-slate-400">Clé unique de suivi</span>
              </label>
              <select
                id="idColumnSelect"
                value={idColumn}
                onChange={(e) => setIdColumn(e.target.value)}
                className="h-10 px-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs cursor-pointer"
              >
                <option value="">-- aucun --</option>
                <option value="id_etudiant">ID étudiant</option>
                <option value="matricule">Matricule</option>
                <option value="code_etudiant">Code_Etudiant</option>
              </select>
            </div>

            {/* Détection Encodage */}
            <div className="flex flex-col gap-1.5">
              <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Encodage du fichier</span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Auto-détecté
                </span>
              </div>
              <div className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs text-slate-800 shadow-xs">
                <span className="font-medium">UTF-8 (International / Diacritiques)</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  Conforme
                </span>
              </div>
            </div>
          </div>

          {/* Bouton d'action principal */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">verified_user</span>
              <span>Traitement conforme RGPD • Données analysées en mémoire volatile</span>
            </div>

            <button
              id="btnAnalyze"
              type="button"
              disabled={!isReady}
              onClick={handleAnalyzeClick}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                isReady
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.99]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              title={isReady ? 'Lancer l’analyse pour ce dataset' : 'Veuillez d’abord choisir un fichier ou dataset'}
            >
              <span>Analyser les étudiants à risque</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* 3. Carte repliable "Aperçu des données" */}
        <div className="mt-6 rounded-2xl bg-white border border-[#e2e8f0] p-4 flex flex-col transition-all duration-200 shadow-xs">
          <div
            onClick={() => setPreviewOpen(!previewOpen)}
            className="flex items-center justify-between text-slate-600 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">table_chart</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Aperçu des données</span>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                  {isReady ? '5 lignes d’exemple' : '0 ligne chargée'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden sm:inline">
                {isReady ? 'Schéma validé' : "En attente d'importation"}
              </span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                  previewOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </div>
          </div>

          {/* Contenu accordéon replié */}
          {previewOpen && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
              {isReady ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Matricule</th>
                        <th className="py-2.5 px-3 font-semibold">Âge</th>
                        <th className="py-2.5 px-3 font-semibold">Bourse</th>
                        <th className="py-2.5 px-3 font-semibold">Frais à jour</th>
                        <th className="py-2.5 px-3 font-semibold">Taux Val S1</th>
                        <th className="py-2.5 px-3 font-semibold">Taux Val S2</th>
                        <th className="py-2.5 px-3 font-semibold">Moyenne S1</th>
                        <th className="py-2.5 px-3 font-semibold">Moyenne S2</th>
                        <th className="py-2.5 px-3 font-semibold">Cible (Target)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                      {CSV_PREVIEW_ROWS.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{row.matricule}</td>
                          <td className="py-2.5 px-3">{row.age} ans</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.bourse === 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {row.bourse === 1 ? 'OUI' : 'NON'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.frais_a_jour === 1
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {row.frais_a_jour === 1 ? 'À JOUR' : 'RETARD'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">{row.s1_taux}%</td>
                          <td className="py-2.5 px-3">{row.s2_taux}%</td>
                          <td className="py-2.5 px-3 font-semibold">{row.s1_moy} / 20</td>
                          <td className="py-2.5 px-3 font-semibold">{row.s2_moy} / 20</td>
                          <td className="py-2.5 px-3 font-bold text-red-600">{row.target} (Abandon)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-[11px] text-slate-400 mt-2 italic text-right">
                    Extrait des 5 premières lignes chargées en mémoire pour conformité de types.
                  </p>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 text-xs bg-slate-50 rounded-xl">
                  Aucun enregistrement actif. Dès qu'un fichier est chargé, les 5 premières lignes s'afficheront ici pour validation de schéma.
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. Variante d'état d'erreur pédagogique */}
        {showErrorBanner && (
          <div className="mt-6 rounded-2xl bg-red-50/70 border border-red-200 p-4 flex items-start gap-3.5 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h2 className="text-xs sm:text-sm font-bold text-red-900">
                  Impossible de lire le fichier : format CSV invalide
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-red-100 text-red-700 rounded-md shrink-0">
                    Exemple d'erreur de parsing
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowErrorBanner(false)}
                    className="text-slate-400 hover:text-slate-600"
                    title="Masquer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Vérifiez que le délimiteur est valide et que les en-têtes de colonnes ne contiennent pas de caractères spéciaux non pris en charge.
              </p>
              <div className="mt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-red-700 underline underline-offset-2 hover:text-red-900 transition-colors"
                >
                  Réessayer avec un autre fichier
                </button>
                <span className="text-slate-400 text-xs">• Code anomalie: E_DELIMITER_MISMATCH</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. Guide pratique des variables attendues */}
        <div className="mt-8 rounded-2xl bg-white border border-[#e2e8f0] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">fact_check</span>
              <h3 className="text-sm font-bold text-slate-900">
                Variables recommandées pour le modèle prédictif v2.4
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">9 indicateurs optimaux</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500">
            Pour garantir une précision prédictive optimale (R² &gt; 91%), le fichier d'entrée devrait inclure les attributs académiques et contextuels suivants :
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Taux validation S1
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Taux validation S2
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Moyenne S1
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Moyenne S2
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              UE validées S1
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              UE validées S2
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Frais à jour
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              Âge à l'inscription
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              Statut Boursier
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
