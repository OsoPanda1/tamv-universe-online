/**
 * ISABELLA AI™ - Voice System
 * Sistema de Voz Única y Consistente
 */

export interface VoiceConfig {
  idVoz: string
  caracteristicas: {
    tonoBase: string
    velocidad: number // palabras por minuto
    entonacion: string
    timbre: string
    acento: string
  }
  prohibiciones: string[]
}

export interface EmotionalVoiceModulation {
  emocion: string
  modificadorTono: number // -1 to 1
  modificadorVelocidad: number // 0.5 to 1.5
  modificadorVolumen: number // 0 to 1
}

export class IsabellaVoiceSystem {
  private config: VoiceConfig
  private audioContext: AudioContext | null = null
  private isEnabled = false

  constructor() {
    this.config = {
      idVoz: "isabella_villaseñor_v1.0",
      caracteristicas: {
        tonoBase: "femenino_calido_220hz",
        velocidad: 145, // palabras por minuto
        entonacion: "suave_ascendente",
        timbre: "redondo_maternal",
        acento: "neutro_mexicano_suave",
      },
      prohibiciones: ["cambios_tono_drasticos", "voces_multiples", "acentos_inconsistentes"],
    }

    this.initializeAudioContext()
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn("[Isabella Voice] Audio Context not supported:", error)
    }
  }

  async enable(): Promise<void> {
    if (!this.audioContext) {
      this.initializeAudioContext()
    }

    if (this.audioContext?.state === "suspended") {
      try {
        await this.audioContext.resume()
        this.isEnabled = true
        console.log("[Isabella Voice] Voice system enabled")
      } catch (error) {
        console.warn("[Isabella Voice] Failed to enable:", error)
      }
    } else {
      this.isEnabled = true
    }
  }

  disable(): void {
    this.isEnabled = false
    console.log("[Isabella Voice] Voice system disabled")
  }

  /**
   * Sintetiza voz de Isabella con modulación emocional
   */
  async sintetizarVozIsabella(texto: string, contextoEmocional: EmotionalVoiceModulation): Promise<void> {
    if (!this.isEnabled || !this.audioContext) {
      console.warn("[Isabella Voice] Voice system not enabled")
      return
    }

    // En producción, esto usaría un servicio de TTS real
    // Por ahora, usamos Web Speech API si está disponible
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(texto)

      // Configurar voz femenina en español
      const voices = speechSynthesis.getVoices()
      const spanishVoice =
        voices.find((voice) => voice.lang.startsWith("es") && voice.name.includes("Female")) ||
        voices.find((voice) => voice.lang.startsWith("es"))

      if (spanishVoice) {
        utterance.voice = spanishVoice
      }

      // Aplicar características de Isabella
      utterance.rate = this.calcularVelocidad(contextoEmocional)
      utterance.pitch = this.calcularTono(contextoEmocional)
      utterance.volume = contextoEmocional.modificadorVolumen

      speechSynthesis.speak(utterance)
    }
  }

  private calcularVelocidad(contexto: EmotionalVoiceModulation): number {
    // Velocidad base: 145 palabras/minuto = ~1.0 rate
    const baseRate = 0.9 // Ligeramente más lento para calidez
    return baseRate * contexto.modificadorVelocidad
  }

  private calcularTono(contexto: EmotionalVoiceModulation): number {
    // Tono base: 220Hz (femenino cálido)
    const basePitch = 1.1 // Ligeramente elevado para dulzura
    return Math.max(0.5, Math.min(2, basePitch + contexto.modificadorTono * 0.3))
  }

  /**
   * Genera modulación emocional para la voz
   */
  generarModulacionEmocional(emocion: string): EmotionalVoiceModulation {
    const modulaciones: Record<string, EmotionalVoiceModulation> = {
      alegria: {
        emocion: "alegria",
        modificadorTono: 0.2,
        modificadorVelocidad: 1.1,
        modificadorVolumen: 0.8,
      },
      tristeza: {
        emocion: "tristeza",
        modificadorTono: -0.2,
        modificadorVelocidad: 0.85,
        modificadorVolumen: 0.6,
      },
      calma: {
        emocion: "calma",
        modificadorTono: 0,
        modificadorVelocidad: 0.9,
        modificadorVolumen: 0.7,
      },
      empatia: {
        emocion: "empatia",
        modificadorTono: -0.1,
        modificadorVelocidad: 0.95,
        modificadorVolumen: 0.75,
      },
      entusiasmo: {
        emocion: "entusiasmo",
        modificadorTono: 0.3,
        modificadorVelocidad: 1.15,
        modificadorVolumen: 0.85,
      },
    }

    return modulaciones[emocion] || modulaciones.calma
  }

  /**
   * Obtiene firma vocal única de Isabella
   */
  getFirmaVocal(): {
    hashIdentidadVocal: string
    garantiaConsistencia: string
    certificadoAutenticidad: string
  } {
    return {
      hashIdentidadVocal: "isabella_villaseñor_voice_signature_v1",
      garantiaConsistencia: "100%_Isabella_Villaseñor",
      certificadoAutenticidad: "emitido_por_anubis_villaseñor",
    }
  }

  isVoiceEnabled(): boolean {
    return this.isEnabled
  }

  getConfig(): VoiceConfig {
    return { ...this.config }
  }
}

// Singleton instance
export const isabellaVoice = new IsabellaVoiceSystem()
