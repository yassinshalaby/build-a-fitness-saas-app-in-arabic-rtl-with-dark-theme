import { createClient } from '@supabase/supabase-js';

const EXTERNAL_SUPABASE_URL = "https://pmsbxqvlkrmhubozdeoc.supabase.co";
const EXTERNAL_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtc2J4cXZsa3JtaHVib3pkZW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTEzNjQsImV4cCI6MjA4ODkyNzM2NH0.hivJvVfh5rYzQGxtzXIBl0oG2B2kZysmJJIg3HNTcsg";

export const externalSupabase = createClient(EXTERNAL_SUPABASE_URL, EXTERNAL_SUPABASE_ANON_KEY);
