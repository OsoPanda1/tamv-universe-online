import { TamvUserProfile, CollaborationMatch } from "@/types/tamv";

/**
 * Sistema de matching colaborativo para Puentes Oníricos
 * Conecta usuarios con habilidades e intereses complementarios
 */

export function matchCollaborators(
  users: TamvUserProfile[]
): CollaborationMatch[] {
  const matches: CollaborationMatch[] = [];

  // Buscar combinaciones complementarias
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const user1 = users[i];
      const user2 = users[j];

      const matchScore = calculateMatchScore(user1, user2);
      if (matchScore > 0.5) {
        matches.push({
          id: `match_${user1.id}_${user2.id}`,
          users: [user1, user2],
          reason: generateMatchReason(user1, user2),
        });
      }
    }
  }

  return matches.sort((a, b) => {
    // Ordenar por relevancia (por ahora simple)
    return b.users.length - a.users.length;
  });
}

function calculateMatchScore(
  user1: TamvUserProfile,
  user2: TamvUserProfile
): number {
  let score = 0;

  // Intereses compartidos
  const sharedInterests = user1.interests.filter((i) =>
    user2.interests.includes(i)
  );
  score += sharedInterests.length * 0.2;

  // Habilidades complementarias
  const complementarySkills = user1.skills.filter(
    (s) => !user2.skills.includes(s)
  );
  score += complementarySkills.length * 0.3;

  // Objetivos compatibles
  const compatibleGoals = user1.goals.filter((g) => user2.goals.includes(g));
  score += compatibleGoals.length * 0.3;

  return Math.min(score, 1);
}

function generateMatchReason(
  user1: TamvUserProfile,
  user2: TamvUserProfile
): string {
  const reasons: string[] = [];

  // Analizar habilidades complementarias
  const user1Skills = new Set(user1.skills);
  const user2Skills = new Set(user2.skills);

  const complementary: string[] = [];
  user1.skills.forEach((skill) => {
    if (!user2Skills.has(skill)) {
      complementary.push(skill);
    }
  });

  if (complementary.length > 0) {
    reasons.push(
      `${user1.name} aporta ${complementary.slice(0, 2).join(", ")} mientras ${user2.name} complementa con otras habilidades`
    );
  }

  // Intereses compartidos
  const sharedInterests = user1.interests.filter((i) =>
    user2.interests.includes(i)
  );
  if (sharedInterests.length > 0) {
    reasons.push(
      `Comparten interés en ${sharedInterests.slice(0, 2).join(", ")}`
    );
  }

  // Objetivos comunes
  const sharedGoals = user1.goals.filter((g) => user2.goals.includes(g));
  if (sharedGoals.length > 0) {
    reasons.push(
      `Ambos buscan ${sharedGoals.slice(0, 1).join(", ")}`
    );
  }

  return reasons.length > 0
    ? reasons.join(". ")
    : "Perfiles complementarios ideales para colaboración creativa";
}

// Datos mock para testing
export const MOCK_USERS: TamvUserProfile[] = [
  {
    id: "user1",
    name: "Ana Martínez",
    skills: ["Diseño 3D", "Modelado", "Animación"],
    interests: ["Arte digital", "Metaverso", "NFTs"],
    goals: ["Crear experiencias inmersivas", "Monetizar arte"],
  },
  {
    id: "user2",
    name: "Carlos Dev",
    skills: ["Programación", "Unity", "Backend"],
    interests: ["Tecnología", "Metaverso", "IA"],
    goals: ["Crear experiencias inmersivas", "Desarrollar plataformas"],
  },
  {
    id: "user3",
    name: "María Sonido",
    skills: ["Producción musical", "Diseño sonoro", "Mezcla"],
    interests: ["Música", "Audio inmersivo", "Conciertos"],
    goals: ["Conciertos sensoriales", "Monetizar música"],
  },
  {
    id: "user4",
    name: "Luis Marketing",
    skills: ["Marketing digital", "Community management", "Analytics"],
    interests: ["Redes sociales", "Comunidades", "Growth"],
    goals: ["Construir audiencias", "Estrategias de crecimiento"],
  },
];
