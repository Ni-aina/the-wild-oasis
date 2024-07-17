
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://bjtetbjqsklpfrsymrjd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqdGV0Ympxc2tscGZyc3ltcmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MjMwNTIsImV4cCI6MjAzNjE5OTA1Mn0.PWTpF046gyQ3Jom41T5F2HWz7hqa2JbSApgnrxzEy0c"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;