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
      career_paths: {
        Row: {
          average_duration_years: number | null
          created_at: string | null
          description: string | null
          id: string
          job_prospects: string | null
          name: string
          personality_types: Database["public"]["Enums"]["personality_type"][]
          qualification_required: Database["public"]["Enums"]["qualification_level"]
          salary_range: string | null
          skills_required: string[] | null
        }
        Insert: {
          average_duration_years?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          job_prospects?: string | null
          name: string
          personality_types: Database["public"]["Enums"]["personality_type"][]
          qualification_required: Database["public"]["Enums"]["qualification_level"]
          salary_range?: string | null
          skills_required?: string[] | null
        }
        Update: {
          average_duration_years?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          job_prospects?: string | null
          name?: string
          personality_types?: Database["public"]["Enums"]["personality_type"][]
          qualification_required?: Database["public"]["Enums"]["qualification_level"]
          salary_range?: string | null
          skills_required?: string[] | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          career_path_id: string
          course_url: string
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          level: string | null
          platform: string
          stage_in_roadmap: number | null
          title: string
        }
        Insert: {
          career_path_id: string
          course_url: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          level?: string | null
          platform: string
          stage_in_roadmap?: number | null
          title: string
        }
        Update: {
          career_path_id?: string
          course_url?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          level?: string | null
          platform?: string
          stage_in_roadmap?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          qualification_level:
            | Database["public"]["Enums"]["qualification_level"]
            | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          qualification_level?:
            | Database["public"]["Enums"]["qualification_level"]
            | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          qualification_level?:
            | Database["public"]["Enums"]["qualification_level"]
            | null
          updated_at?: string | null
        }
        Relationships: []
      }
      success_criteria: {
        Row: {
          created_at: string | null
          financial_growth: number | null
          freedom_autonomy: number | null
          id: string
          recognition: number | null
          social_impact: number | null
          user_id: string
          work_life_balance: number | null
        }
        Insert: {
          created_at?: string | null
          financial_growth?: number | null
          freedom_autonomy?: number | null
          id?: string
          recognition?: number | null
          social_impact?: number | null
          user_id: string
          work_life_balance?: number | null
        }
        Update: {
          created_at?: string | null
          financial_growth?: number | null
          freedom_autonomy?: number | null
          id?: string
          recognition?: number | null
          social_impact?: number | null
          user_id?: string
          work_life_balance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "success_criteria_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      test_results: {
        Row: {
          aptitude_scores: Json | null
          completed_at: string | null
          id: string
          personality_type:
            | Database["public"]["Enums"]["personality_type"]
            | null
          test_responses: Json | null
          user_id: string
        }
        Insert: {
          aptitude_scores?: Json | null
          completed_at?: string | null
          id?: string
          personality_type?:
            | Database["public"]["Enums"]["personality_type"]
            | null
          test_responses?: Json | null
          user_id: string
        }
        Update: {
          aptitude_scores?: Json | null
          completed_at?: string | null
          id?: string
          personality_type?:
            | Database["public"]["Enums"]["personality_type"]
            | null
          test_responses?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roadmaps: {
        Row: {
          career_path_id: string
          created_at: string | null
          id: string
          roadmap_data: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          career_path_id: string
          created_at?: string | null
          id?: string
          roadmap_data: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          career_path_id?: string
          created_at?: string | null
          id?: string
          roadmap_data?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roadmaps_career_path_id_fkey"
            columns: ["career_path_id"]
            isOneToOne: false
            referencedRelation: "career_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roadmaps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      app_role: "admin" | "user"
      personality_type:
        | "INTJ"
        | "INTP"
        | "ENTJ"
        | "ENTP"
        | "INFJ"
        | "INFP"
        | "ENFJ"
        | "ENFP"
        | "ISTJ"
        | "ISFJ"
        | "ESTJ"
        | "ESFJ"
        | "ISTP"
        | "ISFP"
        | "ESTP"
        | "ESFP"
      qualification_level: "10th" | "12th"
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
      app_role: ["admin", "user"],
      personality_type: [
        "INTJ",
        "INTP",
        "ENTJ",
        "ENTP",
        "INFJ",
        "INFP",
        "ENFJ",
        "ENFP",
        "ISTJ",
        "ISFJ",
        "ESTJ",
        "ESFJ",
        "ISTP",
        "ISFP",
        "ESTP",
        "ESFP",
      ],
      qualification_level: ["10th", "12th"],
    },
  },
} as const
