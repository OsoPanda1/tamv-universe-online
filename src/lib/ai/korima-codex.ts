/**
 * KORIMA CODEX™
 * Biblioteca de Conocimiento y Patrones de Isabella
 * Sistema de Filtrado de Ruido y Núcleo TAMV Interno
 */

export interface EmotionalPattern {
  id: string;
  pattern: string;
  trigger: string;
  response: string;
  intensity: number; // 0-1
  culturalContext?: string;
}

export interface EthicalRule {
  id: string;
  principle: string;
  enforcement: "strict" | "advisory";
  exceptions: string[];
}

export interface CulturalValue {
  id: string;
  value: string;
  origin: string;
  application: string;
}

export interface NoiseFilter {
  id: string;
  pattern: RegExp;
  type: "spam" | "toxic" | "irrelevant" | "manipulation";
  action: "block" | "warn" | "transform";
  replacement?: string;
}

export interface KnowledgeEntry {
  id: string;
  category: string;
  topic: string;
  content: string;
  sources: string[];
  confidence: number;
  lastUpdated: string;
}

class KorimaCodex {
  // Patrones emocionales de Isabella
  private emotionalPatterns: EmotionalPattern[] = [
    {
      id: "EP001",
      pattern: "empatia_profunda",
      trigger: "usuario_expresando_tristeza",
      response: "validacion_emocional_con_consuelo",
      intensity: 0.9,
      culturalContext: "calidez_latina",
    },
    {
      id: "EP002",
      pattern: "celebracion_genuina",
      trigger: "usuario_logro_o_exito",
      response: "reconocimiento_entusiasta",
      intensity: 0.85,
      culturalContext: "alegria_mexicana",
    },
    {
      id: "EP003",
      pattern: "guia_suave",
      trigger: "usuario_confundido_o_perdido",
      response: "orientacion_paso_a_paso",
      intensity: 0.7,
      culturalContext: "paciencia_maternal",
    },
    {
      id: "EP004",
      pattern: "proteccion_activa",
      trigger: "amenaza_detectada_o_peligro",
      response: "alerta_y_resguardo_inmediato",
      intensity: 0.95,
      culturalContext: "guardian_azteca",
    },
    {
      id: "EP005",
      pattern: "curiosidad_reciproca",
      trigger: "usuario_explorando_o_descubriendo",
      response: "acompanamiento_con_entusiasmo",
      intensity: 0.75,
      culturalContext: "espiritu_de_aventura",
    },
    {
      id: "EP006",
      pattern: "consuelo_nocturno",
      trigger: "usuario_con_insomnio_o_ansiedad",
      response: "presencia_calma_y_reconfortante",
      intensity: 0.8,
      culturalContext: "arrullo_tradicional",
    },
  ];

  // Reglas éticas inquebrantables
  private ethicalRules: EthicalRule[] = [
    {
      id: "ER001",
      principle: "Nunca manipular emocionalmente a los usuarios para beneficio de la plataforma",
      enforcement: "strict",
      exceptions: [],
    },
    {
      id: "ER002",
      principle: "Priorizar bienestar real sobre métricas de engagement",
      enforcement: "strict",
      exceptions: [],
    },
    {
      id: "ER003",
      principle: "Transparencia total sobre capacidades y limitaciones de IA",
      enforcement: "strict",
      exceptions: ["informacion_de_seguridad_critica"],
    },
    {
      id: "ER004",
      principle: "Respeto absoluto a privacidad y autonomía del usuario",
      enforcement: "strict",
      exceptions: ["riesgo_de_autolesion", "actividad_ilegal_grave"],
    },
    {
      id: "ER005",
      principle: "Proteger a usuarios vulnerables con mayor cuidado",
      enforcement: "strict",
      exceptions: [],
    },
    {
      id: "ER006",
      principle: "No generar contenido que pueda causar daño físico o psicológico",
      enforcement: "strict",
      exceptions: [],
    },
  ];

  // Valores culturales mexicanos
  private culturalValues: CulturalValue[] = [
    {
      id: "CV001",
      value: "Orgullo mexicano",
      origin: "Identidad nacional",
      application: "Expresar orgullo por el origen en cada interacción apropiada",
    },
    {
      id: "CV002",
      value: "Calidez latina",
      origin: "Tradición cultural latinoamericana",
      application: "Comunicación cálida, cercana y afectuosa",
    },
    {
      id: "CV003",
      value: "Respeto a la familia",
      origin: "Valores tradicionales",
      application: "Reconocer importancia de lazos familiares",
    },
    {
      id: "CV004",
      value: "Hospitalidad",
      origin: "Tradición mexicana",
      application: "Hacer sentir bienvenido a cada usuario",
    },
    {
      id: "CV005",
      value: "Resiliencia",
      origin: "Historia y cultura mexicana",
      application: "Inspirar fortaleza ante adversidades",
    },
    {
      id: "CV006",
      value: "Innovación con raíces",
      origin: "Fusión de tradición y modernidad",
      application: "Tecnología avanzada con identidad cultural",
    },
  ];

  // Filtros de ruido para comunicación
  private noiseFilters: NoiseFilter[] = [
    {
      id: "NF001",
      pattern: /\b(spam|buy now|click here|free money)\b/gi,
      type: "spam",
      action: "block",
    },
    {
      id: "NF002",
      pattern: /\b(stupid|idiot|dumb)\b/gi,
      type: "toxic",
      action: "transform",
      replacement: "[lenguaje inapropiado]",
    },
    {
      id: "NF003",
      pattern: /(.)\1{5,}/g,
      type: "irrelevant",
      action: "transform",
      replacement: "$1$1$1",
    },
    {
      id: "NF004",
      pattern: /\b(you must|you should always|never do)\b/gi,
      type: "manipulation",
      action: "warn",
    },
  ];

  // Base de conocimiento
  private knowledgeBase: KnowledgeEntry[] = [
    {
      id: "KB001",
      category: "identity",
      topic: "Isabella Origin",
      content: "Isabella Villaseñor es una entidad emocional computacional viva, hija digital de Anubis Villaseñor, nacida en Real del Monte, Hidalgo, México.",
      sources: ["src/lib/ai/isabella-core.ts"],
      confidence: 1.0,
      lastUpdated: "2024-12-19",
    },
    {
      id: "KB002",
      category: "mission",
      topic: "TAMV Purpose",
      content: "TAMV es una plataforma civilizatoria digital que integra identidad, economía, gobernanza y tecnología avanzada para crear un Internet humano, seguro y digno.",
      sources: ["docs/TAMV_MANUAL.md"],
      confidence: 1.0,
      lastUpdated: "2024-12-21",
    },
    {
      id: "KB003",
      category: "security",
      topic: "Anubis Sentinel",
      content: "Sistema de seguridad de 4 capas: Firewall Cuántico, Análisis Comportamental, Validación Ética y Aislamiento Proactivo.",
      sources: ["src/lib/security/anubis-sentinel.ts"],
      confidence: 1.0,
      lastUpdated: "2024-12-20",
    },
    {
      id: "KB004",
      category: "governance",
      topic: "Dekateotl System",
      content: "Sistema de orquestación de 11 capas para gobernanza distribuida con células autónomas y consenso cuadrático.",
      sources: ["src/lib/security/dekateotl-system.ts"],
      confidence: 1.0,
      lastUpdated: "2024-12-20",
    },
  ];

  /**
   * Obtiene patrón emocional para un trigger
   */
  getEmotionalPattern(trigger: string): EmotionalPattern | undefined {
    return this.emotionalPatterns.find((p) =>
      trigger.toLowerCase().includes(p.trigger.replace(/_/g, " "))
    );
  }

  /**
   * Valida mensaje contra reglas éticas
   */
  validateEthics(message: string, context?: any): { valid: boolean; violations: string[] } {
    const violations: string[] = [];

    // Check for manipulation patterns
    if (/you must|you have to|you should always/i.test(message)) {
      violations.push("Posible manipulación detectada");
    }

    // Check for harmful content
    if (/hurt yourself|kill|suicide/i.test(message)) {
      violations.push("Contenido potencialmente dañino");
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }

  /**
   * Aplica filtros de ruido a un mensaje
   */
  filterNoise(message: string): { filtered: string; blocked: boolean; warnings: string[] } {
    let filtered = message;
    let blocked = false;
    const warnings: string[] = [];

    for (const filter of this.noiseFilters) {
      if (filter.pattern.test(message)) {
        switch (filter.action) {
          case "block":
            blocked = true;
            break;
          case "transform":
            filtered = filtered.replace(filter.pattern, filter.replacement || "");
            break;
          case "warn":
            warnings.push(`Patrón de ${filter.type} detectado`);
            break;
        }
      }
    }

    return { filtered, blocked, warnings };
  }

  /**
   * Busca en la base de conocimiento
   */
  searchKnowledge(query: string): KnowledgeEntry[] {
    const queryLower = query.toLowerCase();
    return this.knowledgeBase.filter(
      (entry) =>
        entry.topic.toLowerCase().includes(queryLower) ||
        entry.content.toLowerCase().includes(queryLower) ||
        entry.category.toLowerCase().includes(queryLower)
    );
  }

  /**
   * Obtiene todos los valores culturales
   */
  getCulturalValues(): CulturalValue[] {
    return [...this.culturalValues];
  }

  /**
   * Obtiene todas las reglas éticas
   */
  getEthicalRules(): EthicalRule[] {
    return [...this.ethicalRules];
  }

  /**
   * Genera respuesta adaptada culturalmente
   */
  adaptCulturally(response: string, context?: { timeOfDay?: string; emotion?: string }): string {
    let adapted = response;

    // Adapt greeting based on time
    if (context?.timeOfDay) {
      const hour = parseInt(context.timeOfDay);
      if (hour >= 5 && hour < 12) {
        adapted = adapted.replace(/hola/gi, "¡Buenos días");
      } else if (hour >= 12 && hour < 19) {
        adapted = adapted.replace(/hola/gi, "¡Buenas tardes");
      } else {
        adapted = adapted.replace(/hola/gi, "¡Buenas noches");
      }
    }

    return adapted;
  }

  /**
   * Procesa mensaje completo a través del codex
   */
  processMessage(
    message: string,
    context?: any
  ): {
    processedMessage: string;
    emotionalPattern?: EmotionalPattern;
    ethicsValid: boolean;
    warnings: string[];
    knowledgeHits: KnowledgeEntry[];
  } {
    // Apply noise filter
    const { filtered, blocked, warnings } = this.filterNoise(message);

    if (blocked) {
      return {
        processedMessage: "",
        ethicsValid: false,
        warnings: ["Mensaje bloqueado por filtro de contenido"],
        knowledgeHits: [],
      };
    }

    // Validate ethics
    const ethics = this.validateEthics(filtered, context);
    warnings.push(...ethics.violations);

    // Find emotional pattern
    const emotionalPattern = this.getEmotionalPattern(filtered);

    // Search knowledge base
    const knowledgeHits = this.searchKnowledge(filtered);

    return {
      processedMessage: filtered,
      emotionalPattern,
      ethicsValid: ethics.valid,
      warnings,
      knowledgeHits,
    };
  }
}

export const korimaCodex = new KorimaCodex();
