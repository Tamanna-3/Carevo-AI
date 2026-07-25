import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pqblaaxfwtxqknoragyn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYmxhYXhmd3R4cWtub3JhZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDkwNjcsImV4cCI6MjA5OTg4NTA2N30._uATG6ODETA2v39HbnPq3-x5sGY3oqI0Y93L56yvF50";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);