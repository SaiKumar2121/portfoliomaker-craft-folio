
import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables and provide helpful error messages
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Create Supabase client with provided URL and key, or fallback to empty strings
// This prevents runtime crashes but will require proper setup for functionality
export const supabase = createClient(
  supabaseUrl || 'https://your-project-url.supabase.co',
  supabaseKey || 'your-anon-key'
);
