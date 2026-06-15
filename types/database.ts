export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      farms: {
        Row: {
          id: string
          slug: string
          name: string
          tagline: string | null
          location: string | null
          phone: string | null
          whatsapp: string | null
          theme_config: Json
          logo_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['farms']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['farms']['Insert']>
      }
      goats: {
        Row: {
          id: string
          farm_slug: string
          name: string
          breed: string
          teeth: string
          weight_kg: number
          price: number
          care_fee: number
          tag: string | null
          reserved: boolean
          video_url: string | null
          video_dur: string | null
          photo_urls: string[]
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['goats']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['goats']['Insert']>
      }
      delivery_videos: {
        Row: {
          id: string
          farm_slug: string
          title: string
          breed: string
          video_url: string | null
          dur: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['delivery_videos']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['delivery_videos']['Insert']>
      }
      admin_users: {
        Row: {
          id: string
          farm_slug: string
          email: string
          password_hash: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>
      }
    }
  }
}

export type Goat = Database['public']['Tables']['goats']['Row']
export type Farm = Database['public']['Tables']['farms']['Row']
export type DeliveryVideo = Database['public']['Tables']['delivery_videos']['Row']
export type AdminUser = Database['public']['Tables']['admin_users']['Row']
