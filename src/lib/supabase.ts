
import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Show warning messages for missing configuration
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('Missing VITE_SUPABASE_URL environment variable. Authentication features will not work.');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing VITE_SUPABASE_ANON_KEY environment variable. Authentication features will not work.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};
