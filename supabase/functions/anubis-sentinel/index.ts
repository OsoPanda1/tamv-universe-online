/**
 * ANUBIS SENTINEL™ - Security Monitor
 * Edge Function for 4-layer security analysis
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
    const { input, action, metadata = {} } = await req.json()

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

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()
    if (userError || !user) throw new Error("Unauthorized")

    // Layer 1: Firewall Cuántico
    const layer1 = analyzeInputLayer1(input)

    // Layer 2: Análisis Comportamental
    const layer2 = analyzeBehaviorLayer2(metadata)

    // Layer 3: Validación Ética
    const layer3 = validateEthicsLayer3(action)

    // Combined threat assessment
    const combinedScore = (layer1.score + layer2.score + layer3.score) / 3
    const threatLevel = calculateThreatLevel(combinedScore)

    // Layer 4: Decisión de acción
    const securityAction = decideAction(threatLevel)

    const eventId = `sentinel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Log to sentinel_events
    const { error: sentinelError } = await supabaseClient.from("sentinel_events").insert({
      event_id: eventId,
      user_id: user.id,
      event_type: action,
      threat_level: threatLevel,
      threat_score: combinedScore,
      threat_factors: [...layer1.factors, ...layer2.factors, ...layer3.factors],
      action_taken: securityAction,
      layer1_score: layer1.score,
      layer2_score: layer2.score,
      layer3_score: layer3.score,
      layer4_action: securityAction,
      metadata: { input, action, ...metadata },
    })

    if (sentinelError) console.error("Sentinel log error:", sentinelError)

    // Log to BookPI
    const bookpiEventId = `bookpi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    await supabaseClient.from("bookpi_ledger").insert({
      event_id: bookpiEventId,
      event_type: "security_event",
      actor_id: user.id,
      event_data: {
        sentinelEventId: eventId,
        threatLevel,
        action: securityAction,
      },
    })

    return new Response(
      JSON.stringify({
        eventId,
        threatLevel,
        threatScore: combinedScore,
        action: securityAction,
        analysis: {
          layer1,
          layer2,
          layer3,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.error("Anubis Sentinel error:", error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }
})

function analyzeInputLayer1(input: string) {
  const factors: string[] = []
  let score = 0

  // SQL Injection patterns
  if (/(\bOR\b|\bAND\b).*=.*--/i.test(input)) {
    score += 0.4
    factors.push("SQL_INJECTION_PATTERN")
  }

  // XSS patterns
  if (/<script|javascript:|onerror=/i.test(input)) {
    score += 0.5
    factors.push("XSS_PATTERN")
  }

  // Command injection
  if (/;|\||&&|`|\$\(/i.test(input)) {
    score += 0.3
    factors.push("COMMAND_INJECTION")
  }

  return { score: Math.min(1, score), factors }
}

function analyzeBehaviorLayer2(metadata: any) {
  const factors: string[] = []
  let score = 0

  if (metadata.requestsPerMinute > 100) {
    score += 0.3
    factors.push("HIGH_REQUEST_RATE")
  }

  if (metadata.ipCount > 5) {
    score += 0.2
    factors.push("MULTIPLE_IPS")
  }

  const hour = new Date().getHours()
  if (hour >= 2 && hour <= 5 && metadata.isNewUser) {
    score += 0.1
    factors.push("UNUSUAL_HOURS")
  }

  return { score: Math.min(1, score), factors }
}

function validateEthicsLayer3(action: string) {
  const factors: string[] = []
  let score = 0

  const maliciousKeywords = ["hack", "exploit", "breach", "steal", "ddos", "phishing"]

  const actionLower = action.toLowerCase()
  maliciousKeywords.forEach((keyword) => {
    if (actionLower.includes(keyword)) {
      score += 0.15
      factors.push(`MALICIOUS_KEYWORD_${keyword.toUpperCase()}`)
    }
  })

  return { score: Math.min(1, score), factors }
}

function calculateThreatLevel(score: number): string {
  if (score >= 0.8) return "critical"
  if (score >= 0.6) return "high"
  if (score >= 0.4) return "medium"
  if (score >= 0.2) return "low"
  return "none"
}

function decideAction(threatLevel: string): string {
  switch (threatLevel) {
    case "critical":
      return "isolate"
    case "high":
      return "block"
    case "medium":
      return "warn"
    case "low":
      return "allow"
    default:
      return "allow"
  }
}
