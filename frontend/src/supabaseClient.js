import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kaxyuytndashwiwjjyqq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtheHl1eXRuZGFzaHdpd2pqeXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODEzNDYsImV4cCI6MjA2ODk1NzM0Nn0.3rGCFrqe6aexWxiNW5U36nhzwE4NmNawqjGy90L5yHw'; // Mets ici ta clé anon publique Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);