/**
 * TAMV ONLINE - Tipos Globales
 * Tipos compartidos usados por varios módulos del ecosistema
 */

export type TourStepId =
  | "composer"
  | "experiences"
  | "puentesOniricos"
  | "wallet"
  | "challenges";

export interface ProductTourStep {
  id: TourStepId;
  targetSelector: string; // CSS selector
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right" | "center";
}

export interface ProductTourState {
  isActive: boolean;
  currentStepIndex: number;
}

export type TutorialCategory =
  | "inicio"
  | "creacionContenido"
  | "experiencias"
  | "puentesOniricos"
  | "monetizacion"
  | "concursos"
  | "seguridad";

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  category: TutorialCategory;
  videoUrl: string;
  durationSeconds: number;
  level: "basico" | "intermedio" | "avanzado";
}

export interface QALiveEvent {
  id: string;
  title: string;
  host: string;
  startTime: string; // ISO
}

export interface RecommendationItem {
  id: string;
  type: "creator" | "dreamspace" | "group" | "channel";
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface Challenge {
  id: string;
  name: string;
  shortDescription: string;
  reward: string;
  endDate: string; // ISO
  progressPercent: number;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  total: number;
  completed: boolean;
}

export interface TamvUserProfile {
  id: string;
  name: string;
  skills: string[];
  interests: string[];
  goals: string[];
}

export interface CollaborationMatch {
  id: string;
  users: TamvUserProfile[];
  reason: string;
}

export interface ReferralLeader {
  id: string;
  rank: number;
  name: string;
  referrals: number;
  reward: string;
}
