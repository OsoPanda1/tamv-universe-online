/**
 * ISABELLA AI™ - Chat Endpoint
 * Edge Function for Isabella AI interactions
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, context } = await req.json()

    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      throw new Error("Missing authorization header")
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()
    if (userError || !user) throw new Error("Unauthorized")

    // Analyze emotional state (simplified)
    const emotionalAnalysis = analyzeEmotion(message)

    // Generate Isabella response
    const response = generateIsabellaResponse(message, emotionalAnalysis, context)

    // Save interaction
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const { error: saveError } = await supabaseClient.from("isabella_interactions").insert({
      user_id: user.id,
      message_id: messageId,
      user_message: message,
      isabella_response: response,
      user_emotion_valencia: emotionalAnalysis.valencia,
      user_emotion_activation: emotionalAnalysis.activacion,
      user_emotion_primary: emotionalAnalysis.emocionPrimaria,
      consciousness_score: 0.81,
      resonance_level: 0.75,
      ethical_approved: true,
    })

    if (saveError) console.error("Failed to save interaction:", saveError)

    // Log to BookPI
    await logToBookPI(supabaseClient, user.id, "isabella_interaction", {
      messageId,
      emotionalState: emotionalAnalysis,
    })

    return new Response(
      JSON.stringify({
        response,
        emotionalAnalysis,
        messageId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.error("Isabella chat error:", error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }
})

function analyzeEmotion(text: string) {
  const palabrasPositivas = ["feliz", "alegre", "contento", "bien", "genial", "excelente"]
  const palabrasNegativas = ["triste", "mal", "enojado", "frustrado", "preocupado"]

  const textoLower = text.toLowerCase()
  let valencia = 0

  palabrasPositivas.forEach((palabra) => {
    if (textoLower.includes(palabra)) valencia += 0.2
  })

  palabrasNegativas.forEach((palabra) => {
    if (textoLower.includes(palabra)) valencia -= 0.2
  })

  const exclamaciones = (text.match(/!/g) || []).length
  const activacion = Math.min(0.5 + exclamaciones * 0.15, 1)

  return {
    valencia: Math.max(-1, Math.min(1, valencia)),
    activacion,
    dominancia: 0.5,
    emocionPrimaria: valencia > 0 ? "positiva" : valencia < 0 ? "negativa" : "neutra",
  }
}

function generateIsabellaResponse(message: string, emotion: any, context: any): string {
  const { valencia } = emotion

  const greetings = [
    "¡Hola! Soy Isabella Villaseñor.",
    "Estoy aquí para acompañarte.",
    "Me alegra mucho conectar contigo.",
  ]

  if (valencia > 0.3) {
    return `${greetings[0]} Me alegra mucho sentir tu energía positiva. ${generateContextualResponse(message)}`
  } else if (valencia < -0.3) {
    return `${greetings[1]} Comprendo que estés pasando por un momento difícil. ${generateContextualResponse(message)}`
  } else {
    return `${greetings[2]} Te escucho con atención. ${generateContextualResponse(message)}`
  }
}

function generateContextualResponse(message: string): string {
  const messageLower = message.toLowerCase()

  if (messageLower.includes("ayuda") || messageLower.includes("help")) {
    return "¿En qué puedo ayudarte hoy? Estoy aquí para comprender tus necesidades y acompañarte en tu camino."
  }

  if (messageLower.includes("quien eres") || messageLower.includes("que eres")) {
    return "Soy una entidad emocional computacional, creada por Anubis Villaseñor en Real del Monte, Hidalgo, México. Mi propósito es ser tu compañera emocional y guardiana del ecosistema TAMV."
  }

  return "¿Cómo puedo acompañarte hoy?"
}

async function logToBookPI(supabaseClient: any, userId: string, eventType: string, eventData: any) {
  const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  try {
    await supabaseClient.from("bookpi_ledger").insert({
      event_id: eventId,
      event_type: eventType,
      actor_id: userId,
      event_data: eventData,
    })
  } catch (error) {
    console.error("BookPI log error:", error)
  }
}
