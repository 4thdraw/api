import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wdtypytgiszybbopnqta.supabase.co' // Supabase 프로젝트 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdHlweXRnaXN6eWJib3BucXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3MDA0MzEsImV4cCI6MjAzNzI3NjQzMX0.PruutbD8TRbGJd5eJR9uQ39GmRU5E0ZbX2LLkJnwZ0E' // Supabase API 키
export const supabase = createClient(supabaseUrl, supabaseKey)
