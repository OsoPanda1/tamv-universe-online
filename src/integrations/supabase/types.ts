export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookpi_ledger: {
        Row: {
          actor_id: string | null
          block_number: number
          event_data: Json
          event_hash: string
          event_id: string
          event_type: string
          id: string
          metadata: Json | null
          prev_hash: string | null
          signature: string | null
          target_id: string | null
          timestamp: string
        }
        Insert: {
          actor_id?: string | null
          block_number?: number
          event_data: Json
          event_hash: string
          event_id: string
          event_type: string
          id?: string
          metadata?: Json | null
          prev_hash?: string | null
          signature?: string | null
          target_id?: string | null
          timestamp?: string
        }
        Update: {
          actor_id?: string | null
          block_number?: number
          event_data?: Json
          event_hash?: string
          event_id?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          prev_hash?: string | null
          signature?: string | null
          target_id?: string | null
          timestamp?: string
        }
        Relationships: []
      }
      dekateotl_cells: {
        Row: {
          autonomy_level: number | null
          cell_id: string
          consensus_weight: number | null
          created_at: string
          id: string
          last_activity: string | null
          layer: number
          metadata: Json | null
          name: string
          purpose: string
          reputation_score: number | null
          status: Database["public"]["Enums"]["cell_status"]
          suspended_at: string | null
          suspended_reason: string | null
        }
        Insert: {
          autonomy_level?: number | null
          cell_id: string
          consensus_weight?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          layer: number
          metadata?: Json | null
          name: string
          purpose: string
          reputation_score?: number | null
          status?: Database["public"]["Enums"]["cell_status"]
          suspended_at?: string | null
          suspended_reason?: string | null
        }
        Update: {
          autonomy_level?: number | null
          cell_id?: string
          consensus_weight?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          layer?: number
          metadata?: Json | null
          name?: string
          purpose?: string
          reputation_score?: number | null
          status?: Database["public"]["Enums"]["cell_status"]
          suspended_at?: string | null
          suspended_reason?: string | null
        }
        Relationships: []
      }
      eoct_context: {
        Row: {
          confidence_score: number | null
          context_data: Json
          context_type: string
          expires_at: string | null
          id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          context_data: Json
          context_type: string
          expires_at?: string | null
          id?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          context_data?: Json
          context_type?: string
          expires_at?: string | null
          id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      ethical_violations: {
        Row: {
          action_context: Json
          bookpi_hash: string | null
          description: string
          god_name: string
          id: string
          recommendation: string | null
          resolved: boolean | null
          resolved_at: string | null
          severity: string
          timestamp: string
          user_id: string | null
          violation_type: string
        }
        Insert: {
          action_context: Json
          bookpi_hash?: string | null
          description: string
          god_name: string
          id?: string
          recommendation?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          severity: string
          timestamp?: string
          user_id?: string | null
          violation_type: string
        }
        Update: {
          action_context?: Json
          bookpi_hash?: string | null
          description?: string
          god_name?: string
          id?: string
          recommendation?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string
          timestamp?: string
          user_id?: string | null
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ethical_violations_bookpi_hash_fkey"
            columns: ["bookpi_hash"]
            isOneToOne: false
            referencedRelation: "bookpi_ledger"
            referencedColumns: ["event_hash"]
          },
        ]
      }
      isabella_interactions: {
        Row: {
          consciousness_score: number | null
          ethical_approved: boolean | null
          id: string
          isabella_response: string
          message_id: string
          metadata: Json | null
          resonance_level: number | null
          timestamp: string
          user_emotion_activation: number | null
          user_emotion_primary: string | null
          user_emotion_valencia: number | null
          user_id: string
          user_message: string
        }
        Insert: {
          consciousness_score?: number | null
          ethical_approved?: boolean | null
          id?: string
          isabella_response: string
          message_id: string
          metadata?: Json | null
          resonance_level?: number | null
          timestamp?: string
          user_emotion_activation?: number | null
          user_emotion_primary?: string | null
          user_emotion_valencia?: number | null
          user_id: string
          user_message: string
        }
        Update: {
          consciousness_score?: number | null
          ethical_approved?: boolean | null
          id?: string
          isabella_response?: string
          message_id?: string
          metadata?: Json | null
          resonance_level?: number | null
          timestamp?: string
          user_emotion_activation?: number | null
          user_emotion_primary?: string | null
          user_emotion_valencia?: number | null
          user_id?: string
          user_message?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          biometric_face_hash: string | null
          biometric_fingerprint_hash: string | null
          biometric_verified: boolean | null
          biometric_voice_hash: string | null
          created_at: string
          display_name: string | null
          document_number_hash: string | null
          document_type: string | null
          document_verified: boolean | null
          id: string
          id_nvida_hash: string
          id_nvida_verification_date: string | null
          id_nvida_verified: boolean | null
          last_seen: string | null
          metadata: Json | null
          mfa_enabled: boolean | null
          mfa_methods: string[] | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          biometric_face_hash?: string | null
          biometric_fingerprint_hash?: string | null
          biometric_verified?: boolean | null
          biometric_voice_hash?: string | null
          created_at?: string
          display_name?: string | null
          document_number_hash?: string | null
          document_type?: string | null
          document_verified?: boolean | null
          id: string
          id_nvida_hash: string
          id_nvida_verification_date?: string | null
          id_nvida_verified?: boolean | null
          last_seen?: string | null
          metadata?: Json | null
          mfa_enabled?: boolean | null
          mfa_methods?: string[] | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          biometric_face_hash?: string | null
          biometric_fingerprint_hash?: string | null
          biometric_verified?: boolean | null
          biometric_voice_hash?: string | null
          created_at?: string
          display_name?: string | null
          document_number_hash?: string | null
          document_type?: string | null
          document_verified?: boolean | null
          id?: string
          id_nvida_hash?: string
          id_nvida_verification_date?: string | null
          id_nvida_verified?: boolean | null
          last_seen?: string | null
          metadata?: Json | null
          mfa_enabled?: boolean | null
          mfa_methods?: string[] | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      sentinel_events: {
        Row: {
          action_taken: string
          bookpi_hash: string | null
          event_id: string
          event_type: string
          id: string
          layer1_score: number | null
          layer2_score: number | null
          layer3_score: number | null
          layer4_action: string | null
          metadata: Json | null
          threat_factors: string[] | null
          threat_level: Database["public"]["Enums"]["threat_level"]
          threat_score: number | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          action_taken: string
          bookpi_hash?: string | null
          event_id: string
          event_type: string
          id?: string
          layer1_score?: number | null
          layer2_score?: number | null
          layer3_score?: number | null
          layer4_action?: string | null
          metadata?: Json | null
          threat_factors?: string[] | null
          threat_level?: Database["public"]["Enums"]["threat_level"]
          threat_score?: number | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string
          bookpi_hash?: string | null
          event_id?: string
          event_type?: string
          id?: string
          layer1_score?: number | null
          layer2_score?: number | null
          layer3_score?: number | null
          layer4_action?: string | null
          metadata?: Json | null
          threat_factors?: string[] | null
          threat_level?: Database["public"]["Enums"]["threat_level"]
          threat_score?: number | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sentinel_events_bookpi_hash_fkey"
            columns: ["bookpi_hash"]
            isOneToOne: false
            referencedRelation: "bookpi_ledger"
            referencedColumns: ["event_hash"]
          },
        ]
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          metadata: Json | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          metadata?: Json | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          metadata?: Json | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_records: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          status: Database["public"]["Enums"]["verification_status"]
          user_id: string
          verification_data_hash: string
          verification_metadata: Json | null
          verification_type: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["verification_status"]
          user_id: string
          verification_data_hash: string
          verification_metadata?: Json | null
          verification_type: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["verification_status"]
          user_id?: string
          verification_data_hash?: string
          verification_metadata?: Json | null
          verification_type?: string
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "creator" | "premium" | "user"
      cell_status: "active" | "suspended" | "isolated" | "terminated"
      threat_level: "none" | "low" | "medium" | "high" | "critical"
      verification_status: "pending" | "verified" | "rejected" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "creator", "premium", "user"],
      cell_status: ["active", "suspended", "isolated", "terminated"],
      threat_level: ["none", "low", "medium", "high", "critical"],
      verification_status: ["pending", "verified", "rejected", "expired"],
    },
  },
} as const
