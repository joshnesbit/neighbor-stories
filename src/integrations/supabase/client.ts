import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uuzbqkiobqhkmpmkvmbo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1emJxa2lvYnFoa21wbWt2bWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTcwMjAsImV4cCI6MjA3MTY3MzAyMH0.j1bCo0COQfS5iCxlEK6eoaqVzj4TK1h_2jF4BU-xwvw'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)