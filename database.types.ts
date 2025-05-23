export type Database = {
  public: {
    Tables: {
      Categories: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Listing: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          google_place_id: string
          id: number
          imageUrl: string | null
          lat: number | null
          lng: number | null
          location: unknown | null
          locationID: number | null
          name: string | null
          phone: string | null
          rating: number | null
          status: boolean | null
          userID: number | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          google_place_id?: string
          id?: number
          imageUrl?: string | null
          lat?: number | null
          lng?: number | null
          location?: unknown | null
          locationID?: number | null
          name?: string | null
          phone?: string | null
          rating?: number | null
          status?: boolean | null
          userID?: number | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          google_place_id?: string
          id?: number
          imageUrl?: string | null
          lat?: number | null
          lng?: number | null
          location?: unknown | null
          locationID?: number | null
          name?: string | null
          phone?: string | null
          rating?: number | null
          status?: boolean | null
          userID?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Listing_locationID_fkey"
            columns: ["locationID"]
            isOneToOne: false
            referencedRelation: "Locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Listing_userID_fkey"
            columns: ["userID"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      listingcategories: {
        Row: {
          categoryid: number
          listid: number
        }
        Insert: {
          categoryid: number
          listid: number
        }
        Update: {
          categoryid?: number
          listid?: number
        }
        Relationships: [
          {
            foreignKeyName: "listingcategories_categoryid_fkey"
            columns: ["categoryid"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listingcategories_listid_fkey"
            columns: ["listid"]
            isOneToOne: false
            referencedRelation: "Listing"
            referencedColumns: ["id"]
          },
        ]
      }
      listingsubcategories: {
        Row: {
          listid: number
          subcategoryid: number
        }
        Insert: {
          listid: number
          subcategoryid: number
        }
        Update: {
          listid?: number
          subcategoryid?: number
        }
        Relationships: [
          {
            foreignKeyName: "listingsubcategories_listid_fkey"
            columns: ["listid"]
            isOneToOne: false
            referencedRelation: "Listing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listingsubcategories_subcategoryid_fkey"
            columns: ["subcategoryid"]
            isOneToOne: false
            referencedRelation: "Subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      Locations: {
        Row: {
          created_at: string
          id: number
          locationName: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          locationName?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          locationName?: string | null
        }
        Relationships: []
      }
      Roles: {
        Row: {
          created_at: string
          id: number
          roleName: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          roleName?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          roleName?: string | null
        }
        Relationships: []
      }
      Subcategories: {
        Row: {
          categoryID: number | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          categoryID?: number | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          categoryID?: number | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Subcategories_categoryID_fkey"
            columns: ["categoryID"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string
          id: number
          passwordHash: string
          roleID: number | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          passwordHash?: string
          roleID?: number | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          passwordHash?: string
          roleID?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Users_roleID_fkey"
            columns: ["roleID"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      nearby_restaurants: {
        Args: {
          lat: number
          long: number
        }
        Returns: {
          id: number
          name: string
          lat: number
          long: number
          dist_meters: number
        }[]
      }
      nearby_restaurants1: {
        Args: {
          lat: number
          long: number
          subcategoryid: number
        }
        Returns: {
          id: number
          name: string
          lat: number
          long: number
          dist_meters: number
        }[]
      }
      nearby_restaurants4: {
        Args: {
          lat: number
          long: number
          subcategoryid: number
        }
        Returns: {
          id: number
          name: string
          lat: number
          long: number
          dist_meters: number
        }[]
      }
      test5: {
        Args: {
          subcategoryid: number
        }
        Returns: {
          id: number
          name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
