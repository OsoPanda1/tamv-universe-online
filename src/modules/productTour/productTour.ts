import { ProductTourState, ProductTourStep, TourStepId } from "@/types/tamv";

const ONBOARDING_KEY = "tamv_onboarding_status";

export const PRODUCT_TOUR_STEPS: ProductTourStep[] = [
  {
    id: "composer",
    targetSelector: "#tamv-composer",
    title: "1. Crea contenido en segundos",
    description:
      "Publica fotos, videos y posts sobre tus experiencias sensoriales y proyectos creativos.",
    position: "bottom",
  },
  {
    id: "experiences",
    targetSelector: "#tamv-experiences",
    title: "2. Explora experiencias inmersivas",
    description:
      "Entra a Dream Spaces, conciertos sensoriales, subastas y marketplaces creativos.",
    position: "right",
  },
  {
    id: "puentesOniricos",
    targetSelector: "#tamv-puentes",
    title: "3. Puentes Oníricos",
    description:
      "Analiza tus intereses y te enlaza con personas que completan tu proyecto.",
    position: "right",
  },
  {
    id: "wallet",
    targetSelector: "#tamv-wallet",
    title: "4. Monetiza tu creatividad",
    description:
      "Administra tus recompensas, membresías y economía creativa desde el Banco TAMV.",
    position: "bottom",
  },
  {
    id: "challenges",
    targetSelector: "#tamv-challenges",
    title: "5. Acepta retos y gana beneficios",
    description:
      "Participa en concursos, misiones y desafíos que impulsan tu visibilidad y recompensas.",
    position: "top",
  },
];

interface UserOnboardingStatus {
  hasCompletedMainTour: boolean;
  completedAt?: string;
  lastStepSeen?: TourStepId;
}

export function shouldShowTour(): boolean {
  const raw = localStorage.getItem(ONBOARDING_KEY);
  if (!raw) return true;
  try {
    const status: UserOnboardingStatus = JSON.parse(raw);
    return !status.hasCompletedMainTour;
  } catch {
    return true;
  }
}

export function startTour(): ProductTourState {
  return { isActive: true, currentStepIndex: 0 };
}

export function nextStep(state: ProductTourState): ProductTourState {
  const nextIndex = state.currentStepIndex + 1;
  if (nextIndex >= PRODUCT_TOUR_STEPS.length) {
    completeTour();
    return { isActive: false, currentStepIndex: 0 };
  }
  return { isActive: true, currentStepIndex: nextIndex };
}

export function skipTour(): void {
  const status: UserOnboardingStatus = {
    hasCompletedMainTour: true,
    completedAt: new Date().toISOString(),
  };
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(status));
}

export function completeTour(): void {
  const status: UserOnboardingStatus = {
    hasCompletedMainTour: true,
    completedAt: new Date().toISOString(),
    lastStepSeen: PRODUCT_TOUR_STEPS[PRODUCT_TOUR_STEPS.length - 1].id,
  };
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(status));
}

export function resetTour(): void {
  localStorage.removeItem(ONBOARDING_KEY);
}
