// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// These values come from your Supabase project → Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single Supabase client for use throughout your app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);