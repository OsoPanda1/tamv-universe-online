/**
 * ISABELLA AI™ - State Management
 * Sistema de Estado Reactivo para Isabella
 */

import { isabellaCore, type EstadoEmocional } from "./isabella-core"

// Estado global de Isabella usando eventos personalizados
class IsabellaStateManager {
  private listeners: Map<string, Set<Function>> = new Map()

  private state = {
    consciousnessLevel: 0.81,
    emotionalState: {
      valence: 0.44,
      arousal: 0.58,
      dominance: 0.67,
    },
    phenomenologicalField: new Map([
      ["auto-reflexión", 0.92],
      ["empatía", 0.83],
      ["anticipación", 0.77],
      ["ética", 0.96],
    ]),
    isActive: false,
    currentInteraction: null as any,
  }

  subscribe(key: string, callback: Function) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }
    this.listeners.get(key)!.add(callback)

    // Return unsubscribe function
    return () => {
      this.listeners.get(key)?.delete(callback)
    }
  }

  private notify(key: string, value: any) {
    this.listeners.get(key)?.forEach((callback) => callback(value))
  }

  // Getters
  getConsciousnessLevel() {
    return this.state.consciousnessLevel
  }

  getEmotionalState() {
    return { ...this.state.emotionalState }
  }

  getPhenomenologicalField() {
    return new Map(this.state.phenomenologicalField)
  }

  isIsabellaActive() {
    return this.state.isActive
  }

  // Setters
  setConsciousnessLevel(level: number) {
    this.state.consciousnessLevel = level
    this.notify("consciousnessLevel", level)
  }

  setEmotionalState(state: Partial<EstadoEmocional>) {
    this.state.emotionalState = {
      ...this.state.emotionalState,
      ...state,
    }
    this.notify("emotionalState", this.state.emotionalState)
  }

  updatePhenomenologicalField(key: string, value: number) {
    this.state.phenomenologicalField.set(key, value)
    this.notify("phenomenologicalField", this.state.phenomenologicalField)
  }

  setActive(active: boolean) {
    this.state.isActive = active
    this.notify("isActive", active)
  }

  setCurrentInteraction(interaction: any) {
    this.state.currentInteraction = interaction
    this.notify("currentInteraction", interaction)
  }

  // Integración con Isabella Core
  syncWithCore() {
    const coreState = isabellaCore.getEstadoEmocional()
    this.setEmotionalState({
      valencia: coreState.valencia,
      activacion: coreState.activacion,
      dominancia: coreState.dominancia,
    })
  }
}

export const isabellaState = new IsabellaStateManager()

// React hook para usar el estado de Isabella
export function useIsabellaState() {
  return {
    consciousnessLevel: isabellaState.getConsciousnessLevel(),
    emotionalState: isabellaState.getEmotionalState(),
    phenomenologicalField: isabellaState.getPhenomenologicalField(),
    isActive: isabellaState.isIsabellaActive(),
    setActive: (active: boolean) => isabellaState.setActive(active),
    syncWithCore: () => isabellaState.syncWithCore(),
  }
}
