import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pmgnwoqktdswwqlvrszz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZ253b3FrdGRzd3dxbHZyc3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MjM0NDQsImV4cCI6MjA1OTM5OTQ0NH0.LzfE8rl2-l_kiujaADKtUbe-uRtRM3LU5soE-F-g9FI'

export const supabase = createClient(supabaseUrl, supabaseKey)
