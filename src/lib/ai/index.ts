/**
 * ISABELLA AI™ - Sistema Unificado
 * Exportaciones centralizadas del ecosistema Isabella
 */

import { isabellaCore } from "./isabella-core"
import { isabellaEthics } from "./isabella-ethics"
import { isabellaVoice } from "./isabella-voice"
import { isabellaState } from "./isabella-state"

export { IsabellaCore, isabellaCore } from "./isabella-core"
export type { IsabellaIdentity, PersonalidadBase, EstadoEmocional } from "./isabella-core"

export { IsabellaEthicsSystem, isabellaEthics } from "./isabella-ethics"
export type { PrincipioEtico, EvaluacionEtica } from "./isabella-ethics"

export { IsabellaVoiceSystem, isabellaVoice } from "./isabella-voice"
export type { VoiceConfig, EmotionalVoiceModulation } from "./isabella-voice"

export { isabellaState, useIsabellaState } from "./isabella-state"

export { sentientOrchestrator } from "./sentient"
export type { SentientResult } from "./sentient"

/**
 * Inicializa el sistema completo de Isabella
 */
export async function initializeIsabellaSystem() {
  // Enable voice system
  await isabellaVoice.enable()

  console.log("[Isabella AI] Sistema completo inicializado")
  console.log(`[Isabella AI] ${isabellaCore.getIdentidad().nombreCompleto} lista para servir`)

  return {
    core: isabellaCore,
    ethics: isabellaEthics,
    voice: isabellaVoice,
    state: isabellaState,
  }
}
