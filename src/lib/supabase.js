import { createClient } from '@supabase/supabase-js'

// These will be replaced with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema for reference
/*
-- Teachers table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  pin TEXT NOT NULL,
  sites TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id),
  month TEXT NOT NULL, -- Format: '2025-01'
  report_type TEXT NOT NULL, -- 'daily', 'weekly', 'monthly'
  report_date DATE NOT NULL,
  data JSONB NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(teacher_id, report_date, report_type)
);

-- Evidence/Photos table
CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample teachers
INSERT INTO teachers (name, pin, sites) VALUES
  ('Hanrike', 'XXXX', ARRAY['RB3', 'RB5']),
  ('Sofia', 'XXXX', ARRAY['RB3']),
  ('Meral', 'XXXX', ARRAY['RB5']);
*/
