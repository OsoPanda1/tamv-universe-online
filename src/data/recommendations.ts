import { RecommendationItem } from "@/types/tamv";
import techPattern from "@/assets/tech-pattern.jpg";
import dreamspaceBg from "@/assets/dreamspace-background.jpg";
import concertBg from "@/assets/concert-background.jpg";

export const RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: "rec-001",
    type: "creator",
    title: "Isabella Studio",
    subtitle: "Arte sensorial y diseño inmersivo",
    imageUrl: techPattern,
  },
  {
    id: "rec-002",
    type: "dreamspace",
    title: "Océano Astral XR",
    subtitle: "Experiencia multisensorial única",
    imageUrl: dreamspaceBg,
  },
  {
    id: "rec-003",
    type: "channel",
    title: "Tech Innovators LATAM",
    subtitle: "Comunidad de desarrolladores",
    imageUrl: techPattern,
  },
  {
    id: "rec-004",
    type: "group",
    title: "Creadores Visuales MX",
    subtitle: "Arte digital y NFTs",
    imageUrl: concertBg,
  },
  {
    id: "rec-005",
    type: "creator",
    title: "Quantum Beats",
    subtitle: "Productor musical experimental",
    imageUrl: concertBg,
  },
];
