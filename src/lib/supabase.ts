
import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables with fallbacks that allow basic functionality
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYnZraWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MTQ2OTczODIsImV4cCI6MTkzMDI3MzM4Mn0.OQEbAaTfgDdLCCht_NBrO6_q3Oj5EI_SjC2_GEBKEn4';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};

// Helper function to check if we are using demo/fallback values
export const isUsingFallbackValues = () => {
  return !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;
};

// Log warning if using fallback values
if (isUsingFallbackValues()) {
  console.warn('Using fallback Supabase credentials. Auth is in demo mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for production use.');
}
