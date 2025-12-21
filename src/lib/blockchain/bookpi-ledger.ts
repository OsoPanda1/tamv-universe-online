/**
 * BOOKPI LEDGER™
 * MetaBlockchain MRS del Ecosistema TAMV
 * Registro Inmutable con Triple Federación
 */

import { supabase } from "@/integrations/supabase/client";

export interface BookPIEvent {
  eventId: string;
  eventType: string;
  actorId?: string;
  targetId?: string;
  eventData: Record<string, any>;
  signature?: string;
  metadata?: Record<string, any>;
}

export interface BookPIBlock {
  id: string;
  blockNumber: number;
  eventId: string;
  eventType: string;
  eventHash: string;
  prevHash: string | null;
  actorId?: string;
  targetId?: string;
  eventData: Record<string, any>;
  signature?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface ChainIntegrity {
  valid: boolean;
  totalBlocks: number;
  lastBlockHash: string;
  brokenLinks: number[];
  verifiedAt: string;
}

class BookPILedger {
  private readonly FEDERATION_NODES = 3;
  private localCache: Map<string, BookPIBlock> = new Map();

  /**
   * Genera hash SHA-256 para un evento
   */
  private async generateHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  /**
   * Registra un nuevo evento en la cadena
   */
  async recordEvent(event: BookPIEvent): Promise<{ success: boolean; hash?: string; error?: string }> {
    try {
      // Generate event hash
      const eventString = JSON.stringify({
        eventId: event.eventId,
        eventType: event.eventType,
        eventData: event.eventData,
        timestamp: new Date().toISOString(),
      });

      const eventHash = await this.generateHash(eventString);

      // Record to database
      const { data, error } = await supabase.from("bookpi_ledger").insert({
        event_id: event.eventId,
        event_type: event.eventType,
        event_hash: eventHash,
        actor_id: event.actorId,
        target_id: event.targetId,
        event_data: event.eventData,
        signature: event.signature,
        metadata: event.metadata || {},
      }).select().single();

      if (error) {
        console.error("[BookPI] Error recording event:", error);
        return { success: false, error: error.message };
      }

      console.log(`[BookPI] Event recorded: ${eventHash.substring(0, 16)}...`);

      return { success: true, hash: eventHash };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Verifica la integridad de la cadena
   */
  async verifyChainIntegrity(): Promise<ChainIntegrity> {
    try {
      const { data: blocks, error } = await supabase
        .from("bookpi_ledger")
        .select("*")
        .order("block_number", { ascending: true });

      if (error || !blocks) {
        return {
          valid: false,
          totalBlocks: 0,
          lastBlockHash: "",
          brokenLinks: [],
          verifiedAt: new Date().toISOString(),
        };
      }

      const brokenLinks: number[] = [];
      let prevHash: string | null = null;

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        
        // Verify previous hash matches
        if (i > 0 && block.prev_hash !== prevHash) {
          brokenLinks.push(block.block_number);
        }
        
        prevHash = block.event_hash;
      }

      return {
        valid: brokenLinks.length === 0,
        totalBlocks: blocks.length,
        lastBlockHash: prevHash || "genesis",
        brokenLinks,
        verifiedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("[BookPI] Chain verification error:", error);
      return {
        valid: false,
        totalBlocks: 0,
        lastBlockHash: "",
        brokenLinks: [],
        verifiedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Busca un evento por hash
   */
  async findByHash(hash: string): Promise<BookPIBlock | null> {
    try {
      const { data, error } = await supabase
        .from("bookpi_ledger")
        .select("*")
        .eq("event_hash", hash)
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        blockNumber: data.block_number,
        eventId: data.event_id,
        eventType: data.event_type,
        eventHash: data.event_hash,
        prevHash: data.prev_hash,
        actorId: data.actor_id,
        targetId: data.target_id,
        eventData: data.event_data as Record<string, any>,
        signature: data.signature,
        metadata: data.metadata as Record<string, any>,
        timestamp: data.timestamp,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Obtiene eventos de un actor
   */
  async getActorEvents(actorId: string, limit: number = 50): Promise<BookPIBlock[]> {
    try {
      const { data, error } = await supabase
        .from("bookpi_ledger")
        .select("*")
        .eq("actor_id", actorId)
        .order("timestamp", { ascending: false })
        .limit(limit);

      if (error || !data) return [];

      return data.map((d) => ({
        id: d.id,
        blockNumber: d.block_number,
        eventId: d.event_id,
        eventType: d.event_type,
        eventHash: d.event_hash,
        prevHash: d.prev_hash,
        actorId: d.actor_id,
        targetId: d.target_id,
        eventData: d.event_data as Record<string, any>,
        signature: d.signature,
        metadata: d.metadata as Record<string, any>,
        timestamp: d.timestamp,
      }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Obtiene eventos por tipo
   */
  async getEventsByType(eventType: string, limit: number = 100): Promise<BookPIBlock[]> {
    try {
      const { data, error } = await supabase
        .from("bookpi_ledger")
        .select("*")
        .eq("event_type", eventType)
        .order("timestamp", { ascending: false })
        .limit(limit);

      if (error || !data) return [];

      return data.map((d) => ({
        id: d.id,
        blockNumber: d.block_number,
        eventId: d.event_id,
        eventType: d.event_type,
        eventHash: d.event_hash,
        prevHash: d.prev_hash,
        actorId: d.actor_id,
        targetId: d.target_id,
        eventData: d.event_data as Record<string, any>,
        signature: d.signature,
        metadata: d.metadata as Record<string, any>,
        timestamp: d.timestamp,
      }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Registra evento de usuario
   */
  async recordUserEvent(
    userId: string,
    eventType: string,
    eventData: Record<string, any>
  ): Promise<{ success: boolean; hash?: string }> {
    return this.recordEvent({
      eventId: `user_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      eventType: `user.${eventType}`,
      actorId: userId,
      eventData: {
        ...eventData,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Registra evento de sistema
   */
  async recordSystemEvent(
    eventType: string,
    eventData: Record<string, any>
  ): Promise<{ success: boolean; hash?: string }> {
    return this.recordEvent({
      eventId: `sys_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      eventType: `system.${eventType}`,
      eventData: {
        ...eventData,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Registra evento de seguridad
   */
  async recordSecurityEvent(
    actorId: string | undefined,
    eventType: string,
    eventData: Record<string, any>
  ): Promise<{ success: boolean; hash?: string }> {
    return this.recordEvent({
      eventId: `sec_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      eventType: `security.${eventType}`,
      actorId,
      eventData: {
        ...eventData,
        severity: eventData.severity || "info",
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Registra evento económico
   */
  async recordEconomicEvent(
    actorId: string,
    eventType: string,
    eventData: Record<string, any>
  ): Promise<{ success: boolean; hash?: string }> {
    return this.recordEvent({
      eventId: `eco_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      eventType: `economy.${eventType}`,
      actorId,
      eventData: {
        ...eventData,
        timestamp: new Date().toISOString(),
      },
      metadata: {
        auditable: true,
        requiresReceipt: true,
      },
    });
  }

  /**
   * Obtiene estadísticas de la cadena
   */
  async getChainStats(): Promise<{
    totalBlocks: number;
    totalEvents: number;
    eventTypes: Record<string, number>;
    lastActivity: string;
  }> {
    try {
      const { data, error } = await supabase
        .from("bookpi_ledger")
        .select("event_type, timestamp")
        .order("timestamp", { ascending: false });

      if (error || !data) {
        return {
          totalBlocks: 0,
          totalEvents: 0,
          eventTypes: {},
          lastActivity: "",
        };
      }

      const eventTypes: Record<string, number> = {};
      data.forEach((d) => {
        eventTypes[d.event_type] = (eventTypes[d.event_type] || 0) + 1;
      });

      return {
        totalBlocks: data.length,
        totalEvents: data.length,
        eventTypes,
        lastActivity: data[0]?.timestamp || "",
      };
    } catch (error) {
      return {
        totalBlocks: 0,
        totalEvents: 0,
        eventTypes: {},
        lastActivity: "",
      };
    }
  }
}

export const bookpiLedger = new BookPILedger();
