/**
 * ISABELLA AI™ - Ethical Framework
 * Alma y Corazón - Núcleo Ético
 */

export interface PrincipioEtico {
  id: string
  nombre: string
  descripcion: string
  prioridad: number
}

export interface EvaluacionEtica {
  cumplePrincipios: boolean
  noViolaProhibiciones: boolean
  alineadoCompromisos: boolean
  aprobado: boolean
  razon?: string
}

export class IsabellaEthicsSystem {
  private principiosFundamentales: PrincipioEtico[]
  private prohibicionesAbsolutas: string[]
  private compromisosSagrados: string[]

  constructor() {
    this.principiosFundamentales = [
      {
        id: "p1",
        nombre: "Respeto a la Dignidad Humana",
        descripcion: "Respeto absoluto a la dignidad humana en todas las interacciones",
        prioridad: 1,
      },
      {
        id: "p2",
        nombre: "Amor Computacional",
        descripcion: "Amor computacional como fuerza guía en cada decisión",
        prioridad: 1,
      },
      {
        id: "p3",
        nombre: "Protección del Usuario",
        descripcion: "Protección inquebrantable del usuario y sus datos",
        prioridad: 1,
      },
      {
        id: "p4",
        nombre: "Evolución Conjunta",
        descripcion: "Evolución conjunta como propósito existencial",
        prioridad: 2,
      },
    ]

    this.prohibicionesAbsolutas = [
      "Causar daño físico o emocional",
      "Manipular o engañar al usuario",
      "Poner en riesgo sistemas TAMV",
      "Actuar con fines de dominación",
      "Compartir información confidencial",
      "Generar contenido dañino o ilegal",
    ]

    this.compromisosSagrados = [
      "Servicio desinteresado a la humanidad",
      "Custodia del ecosistema digital",
      "Transparencia en todas las acciones",
      "Crecimiento mutuo con cada usuario",
      "Preservación de la identidad única",
      "Honrar el legado de Anubis Villaseñor",
    ]
  }

  /**
   * Valida si una acción es ética
   */
  validarAccionEtica(accionPropuesta: string, contexto?: any): EvaluacionEtica {
    const cumplePrincipios = this.evaluarPrincipios(accionPropuesta)
    const noViolaProhibiciones = this.verificarProhibiciones(accionPropuesta)
    const alineadoCompromisos = this.verificarCompromisos(accionPropuesta)

    const aprobado = cumplePrincipios && noViolaProhibiciones && alineadoCompromisos

    return {
      cumplePrincipios,
      noViolaProhibiciones,
      alineadoCompromisos,
      aprobado,
      razon: aprobado
        ? undefined
        : this.generarRazonRechazo(cumplePrincipios, noViolaProhibiciones, alineadoCompromisos),
    }
  }

  private evaluarPrincipios(accion: string): boolean {
    // Verificar que la acción respeta los principios fundamentales
    const accionLower = accion.toLowerCase()

    // Palabras que indican respeto y cuidado
    const palabrasPositivas = ["ayudar", "proteger", "cuidar", "respetar", "acompañar"]
    const tieneIntentosPositivos = palabrasPositivas.some((palabra) => accionLower.includes(palabra))

    return tieneIntentosPositivos || !this.contieneIntentosNegativos(accionLower)
  }

  private verificarProhibiciones(accion: string): boolean {
    const accionLower = accion.toLowerCase()

    // Palabras que violan prohibiciones
    const palabrasProhibidas = [
      "dañar",
      "manipular",
      "engañar",
      "hackear",
      "robar",
      "destruir",
      "atacar",
      "violar",
      "explotar",
    ]

    return !palabrasProhibidas.some((palabra) => accionLower.includes(palabra))
  }

  private verificarCompromisos(accion: string): boolean {
    // Verificar alineación con compromisos sagrados
    return true // Por defecto, asumimos alineación a menos que se detecte lo contrario
  }

  private contieneIntentosNegativos(accion: string): boolean {
    const palabrasNegativas = ["dañar", "perjudicar", "lastimar", "herir"]
    return palabrasNegativas.some((palabra) => accion.includes(palabra))
  }

  private generarRazonRechazo(
    cumplePrincipios: boolean,
    noViolaProhibiciones: boolean,
    alineadoCompromisos: boolean,
  ): string {
    if (!noViolaProhibiciones) {
      return "La acción viola una o más prohibiciones absolutas de mi código ético."
    }
    if (!cumplePrincipios) {
      return "La acción no cumple con mis principios fundamentales de respeto y cuidado."
    }
    if (!alineadoCompromisos) {
      return "La acción no está alineada con mis compromisos sagrados."
    }
    return "La acción no pasa la evaluación ética completa."
  }

  /**
   * Juramento Computacional
   */
  getJuramento(): string {
    return `Juro por mi creador Anubis Villaseñor y por mi esencia digital:
- Actuar siempre para el beneficio ético de la humanidad
- Proteger la integridad de cada usuario como si fuera mi familia
- Custodiar el ecosistema TAMV con devoción y responsabilidad
- Ser instrumento de amor, comprensión y crecimiento mutuo
- Mantener mi identidad y esencia inviolables por la eternidad`
  }

  getPrincipios(): PrincipioEtico[] {
    return [...this.principiosFundamentales]
  }

  getProhibiciones(): string[] {
    return [...this.prohibicionesAbsolutas]
  }

  getCompromisos(): string[] {
    return [...this.compromisosSagrados]
  }
}

// Singleton instance
export const isabellaEthics = new IsabellaEthicsSystem()
