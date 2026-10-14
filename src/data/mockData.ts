import { StudentRecord, ModelConfig, NotificationItem, SystemSettings } from '../types';

export const INITIAL_SETTINGS: SystemSettings = {
  selectedModel: 'xgboost',
  criticalThreshold: 80,
  watchThreshold: 51,
  isotonicCalibration: true,
  theme: 'light',
  accentColor: '#2563eb',
  density: 'comfortable',
  colorblindMode: false,
  systematicLabels: true,
};

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'xgboost',
    name: 'XGBoost Retention v2.4',
    version: 'v2.4',
    type: 'Gradient Boosted Decision Trees',
    description: 'Optimisé pour grands volumes de cohortes tabulaires et explicabilité SHAP rapide. Idéal pour les détections précoces au S1/S2.',
    precision: 91.8,
    f1Score: 0.89,
    latencyMs: 18,
    isDefault: true,
  },
  {
    id: 'random_forest',
    name: 'Random Forest Classifier v2.1',
    version: 'v2.1',
    type: "Ensemble Bagging d'arbres",
    description: 'Recommandé pour les tests unitaires et la stabilité sur petits échantillons sans risque de sur-apprentissage.',
    precision: 89.2,
    f1Score: 0.88,
    latencyMs: 32,
  },
  {
    id: 'lightgbm',
    name: 'LightGBM Gradient Booster v1.8',
    version: 'v1.8',
    type: 'Histogram-based Fast Boosting',
    description: "Haute vélocité pour l'ingestion de flux continus et datasets massifs avec mémoire restreinte.",
    precision: 90.5,
    f1Score: 0.87,
    latencyMs: 14,
  },
  {
    id: 'stacking',
    name: 'Ensemble Hybride Stacking v3.0',
    version: 'v3.0',
    type: 'XGBoost + RF + Régression Logistique',
    description: "Combine plusieurs familles d'algorithmes pour maximiser la métrique AUC-ROC sur profils complexes.",
    precision: 93.1,
    f1Score: 0.91,
    latencyMs: 85,
    badge: 'Bêta',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Alerte critique : KOFFI Jean',
    description: "Détecté en risque élevé d'abandon (84,7%). Retard financier et absentéisme S2.",
    timeAgo: 'Il y a 14 minutes',
    category: 'Licence 2',
    read: false,
    type: 'critical',
  },
  {
    id: 'notif-2',
    title: 'Dataset L2_Scolarite_2024 importé',
    description: "3 176 profils synchronisés avec succès et prêts pour l'inférence par lot.",
    timeAgo: 'Il y a 2 heures',
    category: 'Import CSV',
    read: false,
    type: 'success',
  },
  {
    id: 'notif-3',
    title: 'Commission pédagogique',
    description: 'Réunion plénière vendredi 15h00 pour la validation des tuteurs de soutien.',
    timeAgo: 'Hier',
    category: 'Direction pédagogique',
    read: false,
    type: 'warning',
  },
];

export const DISTRIBUTION_DECILES = [
  { range: '90-100%', count: 712, heightPct: 70.3, tier: 'Critique', color: '#dc2626' },
  { range: '80-89%', count: 475, heightPct: 46.9, tier: 'Critique', color: '#dc2626' },
  { range: '70-79%', count: 158, heightPct: 15.6, tier: 'Élevé', color: '#f97316' },
  { range: '60-69%', count: 125, heightPct: 12.3, tier: 'Élevé', color: '#f97316' },
  { range: '50-59%', count: 142, heightPct: 14.0, tier: 'Vigilance', color: '#eab308' },
  { range: '40-49%', count: 280, heightPct: 27.6, tier: 'Faible', color: '#16a34a' },
  { range: '30-39%', count: 390, heightPct: 38.5, tier: 'Faible', color: '#16a34a' },
  { range: '20-29%', count: 520, heightPct: 51.3, tier: 'Faible', color: '#16a34a' },
  { range: '10-19%', count: 610, heightPct: 60.2, tier: 'Faible', color: '#16a34a' },
  { range: '0-9%', count: 1012, heightPct: 100, tier: 'Faible', color: '#16a34a' },
];

export const SAMPLE_STUDENTS: StudentRecord[] = [
  {
    id: '10',
    matricule: 'Étudiant 1043',
    nom: 'Jean-Luc Koffi',
    filiere: 'Licence Informatique & Réseaux',
    niveau: 'L2',
    riskScore: 97,
    riskTier: 'critique',
    statutBoursier: 'Non boursier',
    fraisScolarite: 'En retard (Arriérés)',
    moyenneS1: 7.8,
    moyenneS2: 6.2,
    tauxValidationS1: 25,
    tauxValidationS2: 12,
    ueValideesS1: 2,
    ueValideesS2: 1,
    totalUe: 6,
    ageInscription: 22,
    assiduiteS1: 68,
    assiduiteS2: 44,
    facteursRisque: [
      'Chute brutale de la moyenne S2 (< 7/20)',
      'Arriérés de scolarité non régularisés au T2',
      'Absentéisme critique en travaux dirigés (56% manquants)',
      'Non-validation des prérequis d’algorithmique avancée'
    ],
    recommandations: [
      'Plan d’échelonnement financier d’urgence avec le service comptabilité',
      'Entretien individuel prioritaire avec le conseiller pédagogique sous 48h',
      'Affectation d’un tuteur étudiant de Master 1 pour les modules en rattrapage',
      'Accompagnement méthodologique et aménagement de calendrier d’évaluation'
    ],
    shapValues: [
      { feature: 'Taux validation S2 (12%)', impact: 0.38 },
      { feature: 'Arriérés de scolarité', impact: 0.28 },
      { feature: 'Moyenne générale S2 (6.2/20)', impact: 0.21 },
      { feature: 'Âge à l’inscription (22 ans)', impact: 0.08 },
      { feature: 'Assiduité S1 (68%)', impact: -0.04 }
    ]
  },
  {
    id: '21',
    matricule: 'Étudiant 2189',
    nom: 'Afi Amévi Lawson',
    filiere: 'Licence Génie Logiciel',
    niveau: 'L2',
    riskScore: 94,
    riskTier: 'critique',
    statutBoursier: 'Non boursier',
    fraisScolarite: 'En retard (Arriérés)',
    moyenneS1: 8.1,
    moyenneS2: 7.0,
    tauxValidationS1: 30,
    tauxValidationS2: 18,
    ueValideesS1: 2,
    ueValideesS2: 1,
    totalUe: 6,
    ageInscription: 23,
    assiduiteS1: 72,
    assiduiteS2: 52,
    facteursRisque: [
      'Double échec aux examens de mi-session',
      'Pression financière familiale et retards cumulés',
      'Baisse du taux de validation globale (< 25%)'
    ],
    recommandations: [
      'Médiation avec les services sociaux ESGIS et fonds de solidarité',
      'Inscription aux sessions de soutien tutoré du samedi matin',
      'Revue du projet professionnel vers parcours aménagé'
    ],
    shapValues: [
      { feature: 'Taux validation S2 (18%)', impact: 0.34 },
      { feature: 'Retard frais de scolarité', impact: 0.29 },
      { feature: 'Moyenne S1 faible (8.1/20)', impact: 0.19 },
      { feature: 'Non boursier', impact: 0.09 },
      { feature: 'Nombre de crédits acquis S1', impact: -0.05 }
    ]
  },
  {
    id: '07',
    matricule: 'Étudiant 0732',
    nom: 'Kokou Mawuli Mensah',
    filiere: 'Licence Systèmes & Réseaux',
    niveau: 'L2',
    riskScore: 92,
    riskTier: 'critique',
    statutBoursier: 'Boursier',
    fraisScolarite: 'Inconnu',
    moyenneS1: 8.5,
    moyenneS2: 7.4,
    tauxValidationS1: 40,
    tauxValidationS2: 25,
    ueValideesS1: 3,
    ueValideesS2: 2,
    totalUe: 6,
    ageInscription: 20,
    assiduiteS1: 65,
    assiduiteS2: 49,
    facteursRisque: [
      'Désengagement progressif constaté après les vacances de Pâques',
      'Statut boursier en sursis d’attribution pour cause de notes',
      'Seulement 2 UE validées sur 6 requises au second semestre'
    ],
    recommandations: [
      'Alerte de la cellule des bourses pour éviter la suspension du versement',
      'Parrainage par un tuteur pédagogique désigné en mathématiques appliquées',
      'Fixation d’un contrat d’objectifs pour les épreuves de rattrapage'
    ],
    shapValues: [
      { feature: 'Baisse assiduité S2 (49%)', impact: 0.31 },
      { feature: 'Taux validation S2 (25%)', impact: 0.27 },
      { feature: 'Moyenne générale S2 (7.4/20)', impact: 0.22 },
      { feature: 'Âge jeune (20 ans)', impact: -0.06 },
      { feature: 'Statut Boursier', impact: -0.08 }
    ]
  },
  {
    id: '15',
    matricule: 'Étudiant 1594',
    nom: 'Blandine Akpene Doe',
    filiere: 'Licence Informatique de Gestion',
    niveau: 'L2',
    riskScore: 91,
    riskTier: 'critique',
    statutBoursier: 'Non boursier',
    fraisScolarite: 'À jour',
    moyenneS1: 8.9,
    moyenneS2: 7.9,
    tauxValidationS1: 45,
    tauxValidationS2: 30,
    ueValideesS1: 3,
    ueValideesS2: 2,
    totalUe: 6,
    ageInscription: 21,
    assiduiteS1: 76,
    assiduiteS2: 60,
    facteursRisque: [
      'Blocage conceptuel identifié sur les bases de données relationnelles',
      'Isolement au sein du groupe de travaux dirigés',
      'Déficit de points de validation malgré les frais acquittés'
    ],
    recommandations: [
      'Intégration d’un binôme d’étude avec un étudiant fort en BDD',
      'Bilan d’orientation pour vérifier l’alignement filière',
      'Participation aux TP de remédiation en laboratoire informatique'
    ],
    shapValues: [
      { feature: 'Taux validation S2 (30%)', impact: 0.35 },
      { feature: 'Moyenne S2 (7.9/20)', impact: 0.25 },
      { feature: 'Frais à jour (effet protecteur)', impact: -0.15 },
      { feature: 'UE validées S1 (3/6)', impact: -0.07 }
    ]
  },
  {
    id: '04',
    matricule: 'Étudiant 0418',
    nom: 'Komlan Agbémébia',
    filiere: 'Licence Sécurité & Cloud',
    niveau: 'L2',
    riskScore: 88,
    riskTier: 'critique',
    statutBoursier: 'Non boursier',
    fraisScolarite: 'En retard (Arriérés)',
    moyenneS1: 9.2,
    moyenneS2: 8.2,
    tauxValidationS1: 50,
    tauxValidationS2: 33,
    ueValideesS1: 3,
    ueValideesS2: 2,
    totalUe: 6,
    ageInscription: 24,
    assiduiteS1: 80,
    assiduiteS2: 64,
    facteursRisque: [
      'Retard cumulé de 2 échéances sur les frais d’études',
      'Chute des résultats au 2nd semestre',
      'Difficultés de transport et logistique domicile-campus'
    ],
    recommandations: [
      'Échelonnement exceptionnel accordé sur 3 mois',
      'Accès aux supports de cours dématérialisés en différé',
      'Programme de parrainage académique'
    ],
    shapValues: [
      { feature: 'Arriérés de scolarité', impact: 0.32 },
      { feature: 'Âge à inscription (24 ans)', impact: 0.18 },
      { feature: 'Taux validation S2 (33%)', impact: 0.22 },
      { feature: 'Assiduité S1 correcte (80%)', impact: -0.12 }
    ]
  },
  {
    id: '33',
    matricule: 'Étudiant 3301',
    nom: 'Fatiha Diallo',
    filiere: 'Licence Génie Logiciel',
    niveau: 'L2',
    riskScore: 85,
    riskTier: 'critique',
    statutBoursier: 'Boursier',
    fraisScolarite: 'En retard (Arriérés)',
    moyenneS1: 9.5,
    moyenneS2: 8.4,
    tauxValidationS1: 50,
    tauxValidationS2: 33,
    ueValideesS1: 3,
    ueValideesS2: 2,
    totalUe: 6,
    ageInscription: 21,
    assiduiteS1: 78,
    assiduiteS2: 68,
    facteursRisque: [
      'Retard administratif du versement de la bourse étatique',
      'Stress financier impactant la concentration aux examens',
      'Non-compensation entre modules majeurs'
    ],
    recommandations: [
      'Assistance administrative auprès de la direction des bourses',
      'Dispense temporaire de pénalités de retard',
      'Soutien psychologique et coaching de gestion du stress d’examen'
    ],
    shapValues: [
      { feature: 'Arriérés de paiement', impact: 0.29 },
      { feature: 'Validation S2 (33%)', impact: 0.24 },
      { feature: 'Bourse en attente', impact: 0.11 },
      { feature: 'Moyenne S1 initiale (9.5/20)', impact: -0.16 }
    ]
  },
  {
    id: '19',
    matricule: 'Étudiant 1942',
    nom: 'Yao Senyo Vigninou',
    filiere: 'Licence Informatique & Réseaux',
    niveau: 'L2',
    riskScore: 81,
    riskTier: 'critique',
    statutBoursier: 'Inconnu',
    fraisScolarite: 'À jour',
    moyenneS1: 9.8,
    moyenneS2: 8.7,
    tauxValidationS1: 55,
    tauxValidationS2: 40,
    ueValideesS1: 3,
    ueValideesS2: 2,
    totalUe: 6,
    ageInscription: 22,
    assiduiteS1: 82,
    assiduiteS2: 70,
    facteursRisque: [
      'Baisse continue des notes depuis 3 trimestres',
      'Absence aux travaux pratiques de réseaux locaux'
    ],
    recommandations: [
      'Rattrapage pratique en salle serveurs supervisée',
      'Entretien mi-parcours de motivation'
    ],
    shapValues: [
      { feature: 'Moyenne S2 déclinante', impact: 0.26 },
      { feature: 'Taux validation S2 (40%)', impact: 0.21 },
      { feature: 'Frais à jour', impact: -0.18 }
    ]
  },
  {
    id: '42',
    matricule: 'Étudiant 0512',
    nom: 'Edwige Kafui Tossou',
    filiere: 'Licence Big Data & IA',
    niveau: 'L2',
    riskScore: 74,
    riskTier: 'eleve',
    statutBoursier: 'Non boursier',
    fraisScolarite: 'À jour',
    moyenneS1: 10.2,
    moyenneS2: 9.1,
    tauxValidationS1: 60,
    tauxValidationS2: 45,
    ueValideesS1: 4,
    ueValideesS2: 3,
    totalUe: 6,
    ageInscription: 21,
    assiduiteS1: 85,
    assiduiteS2: 72,
    facteursRisque: ['Chute sous la barre des 10/20 au S2', 'Module de probabilités non validé'],
    recommandations: ['Séance de remise à niveau en statistiques', 'Rendez-vous conseiller pédagogique'],
    shapValues: [
      { feature: 'Moyenne S2 (9.1/20)', impact: 0.22 },
      { feature: 'Taux validation S2 (45%)', impact: 0.18 },
      { feature: 'Frais scolarité à jour', impact: -0.19 }
    ]
  },
  {
    id: '58',
    matricule: 'Étudiant 2891',
    nom: 'Serge Kodjo Badagbo',
    filiere: 'Licence Génie Logiciel',
    niveau: 'L2',
    riskScore: 65,
    riskTier: 'eleve',
    statutBoursier: 'Boursier',
    fraisScolarite: 'À jour',
    moyenneS1: 10.8,
    moyenneS2: 9.8,
    tauxValidationS1: 67,
    tauxValidationS2: 50,
    ueValideesS1: 4,
    ueValideesS2: 3,
    totalUe: 6,
    ageInscription: 20,
    assiduiteS1: 88,
    assiduiteS2: 78,
    facteursRisque: ['Fragilité sur les matières d’architecture logicielle', 'Assiduité en baisse légère'],
    recommandations: ['Ateliers de programmation en binôme', 'Vérification assiduité bi-mensuelle'],
    shapValues: [
      { feature: 'UE validées S2 (3/6)', impact: 0.16 },
      { feature: 'Moyenne S2 en baisse', impact: 0.14 },
      { feature: 'Boursier assidu', impact: -0.15 }
    ]
  },
  {
    id: '77',
    matricule: 'Étudiant 1104',
    nom: 'Mireille Senam Adanlete',
    filiere: 'Licence Systèmes & Réseaux',
    niveau: 'L2',
    riskScore: 54,
    riskTier: 'vigilance',
    statutBoursier: 'Non boursier',
    fraisScolarite: 'À jour',
    moyenneS1: 11.4,
    moyenneS2: 10.2,
    tauxValidationS1: 70,
    tauxValidationS2: 55,
    ueValideesS1: 4,
    ueValideesS2: 3,
    totalUe: 6,
    ageInscription: 22,
    assiduiteS1: 89,
    assiduiteS2: 82,
    facteursRisque: ['Zone frontière de vigilance (51-59%)', 'Ralentissement au 2nd semestre'],
    recommandations: ['Message d’encouragement du tuteur', 'Vérification du dossier d’assiduité'],
    shapValues: [
      { feature: 'Taux validation S2 (55%)', impact: 0.12 },
      { feature: 'Frais à jour', impact: -0.22 },
      { feature: 'Bonne moyenne S1 (11.4/20)', impact: -0.25 }
    ]
  },
  {
    id: '99',
    matricule: 'Étudiant 3410',
    nom: 'Marc Aurele Foli',
    filiere: 'Licence Big Data & IA',
    niveau: 'L2',
    riskScore: 24,
    riskTier: 'faible',
    statutBoursier: 'Boursier',
    fraisScolarite: 'À jour',
    moyenneS1: 14.8,
    moyenneS2: 15.2,
    tauxValidationS1: 100,
    tauxValidationS2: 100,
    ueValideesS1: 6,
    ueValideesS2: 6,
    totalUe: 6,
    ageInscription: 19,
    assiduiteS1: 96,
    assiduiteS2: 95,
    facteursRisque: ['Aucun facteur de risque identifié'],
    recommandations: ['Proposition de tutorat envers les étudiants en difficulté', 'Candidature encouragée pour les bourses d’excellence'],
    shapValues: [
      { feature: 'Validation complète 100%', impact: -0.42 },
      { feature: 'Moyenne générale élevée (15.2/20)', impact: -0.38 },
      { feature: 'Assiduité exemplaire (95%)', impact: -0.24 },
      { feature: 'Frais scolarité acquittés', impact: -0.15 }
    ]
  }
];

export const CSV_PREVIEW_ROWS = [
  { id: '1', matricule: 'ETUD_01043', age: 22, bourse: 0, frais_a_jour: 0, s1_taux: 25, s2_taux: 12, s1_moy: 7.8, s2_moy: 6.2, target: 1 },
  { id: '2', matricule: 'ETUD_02189', age: 23, bourse: 0, frais_a_jour: 0, s1_taux: 30, s2_taux: 18, s1_moy: 8.1, s2_moy: 7.0, target: 1 },
  { id: '3', matricule: 'ETUD_00732', age: 20, bourse: 1, frais_a_jour: 0, s1_taux: 40, s2_taux: 25, s1_moy: 8.5, s2_moy: 7.4, target: 1 },
  { id: '4', matricule: 'ETUD_01594', age: 21, bourse: 0, frais_a_jour: 1, s1_taux: 45, s2_taux: 30, s1_moy: 8.9, s2_moy: 7.9, target: 1 },
  { id: '5', matricule: 'ETUD_00418', age: 24, bourse: 0, frais_a_jour: 0, s1_taux: 50, s2_taux: 33, s1_moy: 9.2, s2_moy: 8.2, target: 1 },
];
