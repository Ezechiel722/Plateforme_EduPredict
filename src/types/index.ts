export type ScreenId = 
  | 'screen-accueil' // Tableau de bord - Synthèse globale (Accueil)
  | 'screen-5504779327101785572' // Paramètres & Configuration système
  | 'screen-16963338263129267698' // Cohort Results (Résultats de cohorte)
  | 'screen-import' // EduPredict - Analyse Dataset : Import
  | 'screen-test-unitaire'; // Test unitaire L2 simulator

export interface StudentRecord {
  id: string;
  matricule: string;
  nom: string;
  filiere: string;
  niveau: string;
  riskScore: number; // 0 - 100
  riskTier: 'critique' | 'eleve' | 'vigilance' | 'faible';
  statutBoursier: 'Boursier' | 'Non boursier' | 'Inconnu';
  fraisScolarite: 'À jour' | 'En retard (Arriérés)' | 'Inconnu';
  moyenneS1: number;
  moyenneS2: number;
  tauxValidationS1: number;
  tauxValidationS2: number;
  ueValideesS1: number;
  ueValideesS2: number;
  totalUe: number;
  ageInscription: number;
  assiduiteS1: number; // %
  assiduiteS2: number; // %
  facteursRisque: string[];
  recommandations: string[];
  shapValues: {
    feature: string;
    impact: number; // positive = risk contributor (+), negative = protective (-)
  }[];
}

export interface ModelConfig {
  id: string;
  name: string;
  version: string;
  type: string;
  description: string;
  precision: number;
  f1Score: number;
  latencyMs: number;
  isDefault?: boolean;
  badge?: string;
}

export interface SystemSettings {
  selectedModel: string;
  criticalThreshold: number; // default 80
  watchThreshold: number; // default 51
  isotonicCalibration: boolean;
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  density: 'comfortable' | 'compact';
  colorblindMode: boolean;
  systematicLabels: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  category: string;
  read: boolean;
  type: 'critical' | 'success' | 'warning';
}
