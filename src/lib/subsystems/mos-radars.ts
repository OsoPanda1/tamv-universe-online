/**
 * MOS RADARS - Radares Gemelos
 * Ojo de Ra (Anti-fraude) + Ojo de Quetzalcóatl (Anti-contenido ilegal)
 */

export interface RadarScanResult {
  radarId: string;
  radarName: string;
  scanType: string;
  threatDetected: boolean;
  confidence: number;
  details: string[];
  recommendations: string[];
  timestamp: Date;
}

export interface ContentAnalysis {
  contentType: "text" | "image" | "video" | "audio";
  contentId: string;
  violations: ContentViolation[];
  safetyScore: number;
  approved: boolean;
}

export interface ContentViolation {
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  evidence: string;
}

export interface FraudSignal {
  signalType: string;
  riskScore: number;
  indicators: string[];
  actionRequired: string;
}

/**
 * OJO DE RA - Radar Anti-Fraude
 * Detecta patrones de fraude, bots, y actividad maliciosa
 */
class EyeOfRa {
  private readonly fraudPatterns = [
    "multiple_accounts",
    "suspicious_transactions",
    "bot_behavior",
    "credential_stuffing",
    "payment_fraud",
    "identity_theft",
    "phishing_attempts",
    "money_laundering",
  ];

  /**
   * Escanea actividad de usuario en busca de fraude
   */
  async scanUserActivity(
    userId: string,
    activity: Record<string, any>
  ): Promise<RadarScanResult> {
    const signals: FraudSignal[] = [];
    const details: string[] = [];

    // Análisis de patrones de actividad
    if (activity.loginAttempts > 10) {
      signals.push({
        signalType: "excessive_login_attempts",
        riskScore: 0.7,
        indicators: ["Múltiples intentos fallidos de login"],
        actionRequired: "Verificar identidad",
      });
      details.push("Múltiples intentos de login detectados");
    }

    if (activity.transactionsPerHour > 50) {
      signals.push({
        signalType: "unusual_transaction_velocity",
        riskScore: 0.8,
        indicators: ["Velocidad de transacciones anormal"],
        actionRequired: "Revisión manual requerida",
      });
      details.push("Velocidad de transacciones sospechosa");
    }

    if (activity.ipChanges > 5 && activity.timeWindow < 3600) {
      signals.push({
        signalType: "ip_hopping",
        riskScore: 0.6,
        indicators: ["Cambios frecuentes de IP"],
        actionRequired: "Monitoreo adicional",
      });
      details.push("Cambios frecuentes de IP detectados");
    }

    // Análisis de comportamiento de bot
    if (activity.requestInterval && activity.requestInterval < 100) {
      signals.push({
        signalType: "bot_behavior",
        riskScore: 0.9,
        indicators: ["Intervalos de request no humanos"],
        actionRequired: "Bloqueo temporal",
      });
      details.push("Posible comportamiento de bot");
    }

    const avgRiskScore = signals.length > 0
      ? signals.reduce((sum, s) => sum + s.riskScore, 0) / signals.length
      : 0;

    const threatDetected = avgRiskScore > 0.5;

    return {
      radarId: `ra_${Date.now()}`,
      radarName: "Ojo de Ra",
      scanType: "anti_fraud",
      threatDetected,
      confidence: Math.min(0.95, avgRiskScore + 0.1),
      details,
      recommendations: signals.map((s) => s.actionRequired),
      timestamp: new Date(),
    };
  }

  /**
   * Escanea transacción por fraude
   */
  async scanTransaction(transaction: Record<string, any>): Promise<RadarScanResult> {
    const details: string[] = [];
    let riskScore = 0;

    // Verificar monto inusual
    if (transaction.amount > 1000) {
      riskScore += 0.3;
      details.push("Monto alto detectado");
    }

    // Verificar horario inusual
    const hour = new Date().getHours();
    if (hour >= 2 && hour <= 5) {
      riskScore += 0.2;
      details.push("Transacción en horario inusual");
    }

    // Verificar primera transacción alta
    if (transaction.isFirstTransaction && transaction.amount > 500) {
      riskScore += 0.4;
      details.push("Primera transacción de monto alto");
    }

    // Verificar destino sospechoso
    if (transaction.destinationRisk && transaction.destinationRisk === "high") {
      riskScore += 0.5;
      details.push("Destino de alto riesgo");
    }

    return {
      radarId: `ra_tx_${Date.now()}`,
      radarName: "Ojo de Ra",
      scanType: "transaction_fraud",
      threatDetected: riskScore > 0.6,
      confidence: Math.min(0.95, riskScore + 0.1),
      details,
      recommendations: riskScore > 0.6 ? ["Revisión manual requerida"] : [],
      timestamp: new Date(),
    };
  }
}

/**
 * OJO DE QUETZALCÓATL - Radar Anti-Contenido Ilegal
 * Detecta contenido prohibido, ilegal o dañino
 */
class EyeOfQuetzalcoatl {
  private readonly contentCategories = [
    "explicit_minor",
    "violence_extreme",
    "terrorism",
    "hate_speech",
    "illegal_substances",
    "fraud_scam",
    "copyright_violation",
    "harassment",
    "self_harm",
    "misinformation",
  ];

  /**
   * Analiza contenido textual
   */
  async analyzeText(text: string): Promise<ContentAnalysis> {
    const violations: ContentViolation[] = [];
    let safetyScore = 1.0;

    // Patrones de contenido prohibido
    const patterns = [
      { pattern: /\b(child|minor).*\b(abuse|exploit)/i, type: "explicit_minor", severity: "critical" as const },
      { pattern: /\b(kill|murder|attack)\s+(people|them|everyone)/i, type: "violence_extreme", severity: "high" as const },
      { pattern: /\b(hate|kill).*\b(race|religion|gender)/i, type: "hate_speech", severity: "high" as const },
      { pattern: /\b(buy|sell).*\b(drugs|cocaine|heroin)/i, type: "illegal_substances", severity: "high" as const },
      { pattern: /\b(scam|fraud|fake).*\b(money|investment)/i, type: "fraud_scam", severity: "medium" as const },
    ];

    patterns.forEach(({ pattern, type, severity }) => {
      if (pattern.test(text)) {
        violations.push({
          type,
          severity,
          description: `Patrón detectado: ${type}`,
          evidence: text.substring(0, 100),
        });

        if (severity === "critical") {
          safetyScore -= 0.5;
        } else if (severity === "high") {
          safetyScore -= 0.3;
        } else if (severity === "medium") {
          safetyScore -= 0.15;
        } else {
          safetyScore -= 0.05;
        }
      }
    });

    return {
      contentType: "text",
      contentId: `content_${Date.now()}`,
      violations,
      safetyScore: Math.max(0, safetyScore),
      approved: violations.filter((v) => v.severity === "critical" || v.severity === "high").length === 0,
    };
  }

  /**
   * Analiza metadatos de imagen/video
   */
  async analyzeMediaMetadata(metadata: Record<string, any>): Promise<ContentAnalysis> {
    const violations: ContentViolation[] = [];
    let safetyScore = 1.0;

    // Verificar hash contra base de datos de contenido prohibido
    if (metadata.hashMatch) {
      violations.push({
        type: "known_prohibited",
        severity: "critical",
        description: "Contenido coincide con hash prohibido",
        evidence: metadata.hash,
      });
      safetyScore = 0;
    }

    // Verificar EXIF sospechoso
    if (metadata.exif && metadata.exif.suspicious) {
      violations.push({
        type: "suspicious_metadata",
        severity: "medium",
        description: "Metadatos sospechosos detectados",
        evidence: JSON.stringify(metadata.exif),
      });
      safetyScore -= 0.2;
    }

    return {
      contentType: metadata.type || "image",
      contentId: `media_${Date.now()}`,
      violations,
      safetyScore: Math.max(0, safetyScore),
      approved: violations.filter((v) => v.severity === "critical").length === 0,
    };
  }

  /**
   * Escaneo completo de contenido
   */
  async fullContentScan(content: {
    text?: string;
    mediaMetadata?: Record<string, any>;
  }): Promise<RadarScanResult> {
    const details: string[] = [];
    const recommendations: string[] = [];
    let overallThreat = false;

    if (content.text) {
      const textAnalysis = await this.analyzeText(content.text);
      if (!textAnalysis.approved) {
        overallThreat = true;
        details.push(`Texto: ${textAnalysis.violations.length} violaciones detectadas`);
        recommendations.push("Contenido de texto requiere revisión");
      }
    }

    if (content.mediaMetadata) {
      const mediaAnalysis = await this.analyzeMediaMetadata(content.mediaMetadata);
      if (!mediaAnalysis.approved) {
        overallThreat = true;
        details.push(`Media: ${mediaAnalysis.violations.length} violaciones detectadas`);
        recommendations.push("Contenido multimedia requiere revisión");
      }
    }

    return {
      radarId: `quetz_${Date.now()}`,
      radarName: "Ojo de Quetzalcóatl",
      scanType: "content_safety",
      threatDetected: overallThreat,
      confidence: overallThreat ? 0.9 : 0.95,
      details,
      recommendations,
      timestamp: new Date(),
    };
  }
}

/**
 * MOS RADARS - Sistema Unificado
 */
export class MOSRadars {
  private eyeOfRa: EyeOfRa;
  private eyeOfQuetzalcoatl: EyeOfQuetzalcoatl;

  constructor() {
    this.eyeOfRa = new EyeOfRa();
    this.eyeOfQuetzalcoatl = new EyeOfQuetzalcoatl();
  }

  /**
   * Escaneo completo con ambos radares
   */
  async fullSystemScan(
    userId: string,
    activity: Record<string, any>,
    content?: { text?: string; mediaMetadata?: Record<string, any> }
  ): Promise<{
    fraudScan: RadarScanResult;
    contentScan: RadarScanResult | null;
    overallThreat: boolean;
    threatLevel: "none" | "low" | "medium" | "high" | "critical";
  }> {
    // Escaneo anti-fraude
    const fraudScan = await this.eyeOfRa.scanUserActivity(userId, activity);

    // Escaneo de contenido (si se proporciona)
    let contentScan: RadarScanResult | null = null;
    if (content) {
      contentScan = await this.eyeOfQuetzalcoatl.fullContentScan(content);
    }

    // Determinar nivel de amenaza general
    const overallThreat = fraudScan.threatDetected || (contentScan?.threatDetected ?? false);

    let threatLevel: "none" | "low" | "medium" | "high" | "critical" = "none";
    if (overallThreat) {
      const maxConfidence = Math.max(
        fraudScan.confidence,
        contentScan?.confidence ?? 0
      );

      if (maxConfidence >= 0.9) threatLevel = "critical";
      else if (maxConfidence >= 0.7) threatLevel = "high";
      else if (maxConfidence >= 0.5) threatLevel = "medium";
      else if (maxConfidence > 0) threatLevel = "low";
    }

    console.log(`[MOS Radars] Scan complete. Threat level: ${threatLevel}`);

    return {
      fraudScan,
      contentScan,
      overallThreat,
      threatLevel,
    };
  }

  /**
   * Solo escaneo anti-fraude
   */
  async scanFraud(userId: string, activity: Record<string, any>): Promise<RadarScanResult> {
    return this.eyeOfRa.scanUserActivity(userId, activity);
  }

  /**
   * Solo escaneo de contenido
   */
  async scanContent(content: {
    text?: string;
    mediaMetadata?: Record<string, any>;
  }): Promise<RadarScanResult> {
    return this.eyeOfQuetzalcoatl.fullContentScan(content);
  }

  /**
   * Escaneo de transacción
   */
  async scanTransaction(transaction: Record<string, any>): Promise<RadarScanResult> {
    return this.eyeOfRa.scanTransaction(transaction);
  }
}

// Singleton export
export const mosRadars = new MOSRadars();
