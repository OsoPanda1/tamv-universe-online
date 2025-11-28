import { DailyMission } from "@/types/tamv";

export const getDailyMission = (): DailyMission => {
  return {
    id: "daily-001",
    title: "Misión Diaria: Creador Activo",
    description: "Publica un post, comenta en 2 publicaciones y visita un Dream Space",
    reward: "50 TAMV + 10 XP",
    progress: 1,
    total: 3,
    completed: false,
  };
};
