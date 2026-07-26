import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qfbstxtessikpgucsvsy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYnN0eHRlc3Npa3BndWNzdnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MDYyNTUsImV4cCI6MjEwMDI4MjI1NX0.hAJUi4gh3ZMsetgXr4ggk-BUapuBOSfFBv_cCpBRFGE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
